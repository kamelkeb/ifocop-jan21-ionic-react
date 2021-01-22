import React, { useContext } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import { BasicForm } from "../components/BasicForm";
import { Context as UserContext } from "../features/currentUser";
import { logOutOutline } from "ionicons/icons";

const Tab3: React.FC = () => {
  const { currentUserData, signInWithEmailAndPassword, signout } = useContext(
    UserContext
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in or sign up</IonTitle>
          <IonButton fill="clear" color="dark" slot="end" onClick={signout}>
            <IonIcon icon={logOutOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle>
          {currentUserData.isLogedin
            ? `${currentUserData.email} est bien connecté! L'id utilisateur est ${currentUserData.id}`
            : "Pas encore connecté!"}
        </IonTitle>
        <BasicForm signInHandler={signInWithEmailAndPassword}></BasicForm>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
