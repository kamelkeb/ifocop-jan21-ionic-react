import React, { useEffect } from "react";
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
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import "./Tab2.css";

const Tab2: React.FC = () => {
    const { takePhoto, photos } = usePhotoGallery();

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
                                <IonImg src={item.webviewPath} />
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
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
