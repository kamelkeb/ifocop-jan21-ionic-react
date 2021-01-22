import React, { useEffect, useState } from "react";
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonActionSheet,
} from "@ionic/react";
import { camera, trash, close } from "ionicons/icons";
import { usePhotoGallery, Photo } from "../hooks/usePhotoGallery";
import "./Tab2.css";

const PhotoGalleryPage: React.FC = () => {
  const { takePhoto, photos, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          {photos.map((item, index) => (
            <IonRow key={index}>
              <IonCol size="0" sizeSm="1" sizeMd="3"></IonCol>
              <IonCol size="12" sizeSm="10" sizeMd="6">
                <IonImg
                  src={item.webviewPath}
                  onClick={() => setPhotoToDelete(item)}
                />
              </IonCol>
              <IonCol size="0" sizeSm="1" sizeMd="3"></IonCol>
            </IonRow>
          ))}
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={takePhoto}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PhotoGalleryPage;
