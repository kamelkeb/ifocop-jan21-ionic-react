import { useCamera } from "@ionic/react-hooks/camera";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import { useStorage } from "@ionic/react-hooks/storage";
import {
  CameraPhoto,
  CameraResultType,
  Capacitor,
  CameraSource,
  FilesystemDirectory,
} from "@capacitor/core";
import React, { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

const PHOTO_STORAGE = "photos";

export const usePhotoGallery = () => {
  const { getPhoto } = useCamera();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { writeFile, deleteFile, readFile, getUri } = useFilesystem();
  const { get, set } = useStorage();
  /*  Forme générale d'usage de useEffect lorsque l'on veut faire des traitements async
        useEffect(() => {
           const fct =  async () => {
               // Ici mettre les appels qui renvoient des Promises

            };
            fct();
        }, [])
    */
  useEffect(() => {
    const truc = async () => {
      // Ici mettre les appels qui renvoient des Promises
      const photosString = await get(PHOTO_STORAGE);
      const localPhotos = photosString ? JSON.parse(photosString) : [];
      if (!isPlatform("hybrid")) {
        for (let photo of localPhotos) {
          const file = await readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data,
          });
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(localPhotos);
    };
    truc();
  }, [get, readFile]);

  const savePicture = async (photo: CameraPhoto, fileName: string) => {
    let base64Data: string;
    if (isPlatform("hybrid")) {
      const file = await readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }

    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data,
    });
    if (isPlatform("hybrid")) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  const takePhoto = async () => {
    const fileName = new Date().getTime() + ".jpeg";

    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const savedFileImage = await savePicture(cameraPhoto, fileName);

    const newPhoto = {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
    };

    setPhotos((photos) => [...photos, newPhoto]);
    set(PHOTO_STORAGE, JSON.stringify([...photos, newPhoto]));
  };

  const deletePhoto = async (photo: Photo) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf("/") + 1);
    await deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data,
    });
    setPhotos(newPhotos);
  };

  return {
    takePhoto,
    photos,
    deletePhoto,
  };
};
