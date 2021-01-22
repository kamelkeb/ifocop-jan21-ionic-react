import React, { useContext } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import { BasicForm } from "../components/BasicForm";
import { Context as UserContext } from "../features/currentUser";
import { logOutOutline } from "ionicons/icons";

const SignInUp: React.FC = () => {
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
      {currentUserData.isLogedin ? (
        <IonContent fullscreen>
          <IonTitle>
            {`${currentUserData.email} est bien connecté! L'id utilisateur est ${currentUserData.id}`}
          </IonTitle>
          <IonText>LUI AFFICHER DES INFOS DE PROFIL AU BESOIN</IonText>{" "}
        </IonContent>
      ) : (
        <IonContent fullscreen>
          <IonTitle>
            <h3>Veuillez vous connecter s'il vous plait</h3>
          </IonTitle>
          <BasicForm signInHandler={signInWithEmailAndPassword}></BasicForm>
        </IonContent>
      )}
    </IonPage>
  );
};

export default SignInUp;
