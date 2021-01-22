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
import { Context as PersonelInfosContext } from "../features/peronalInfos";
import { logOutOutline } from "ionicons/icons";

const SignInUp: React.FC = () => {
  const pi = {
    creationDate: new Date().toISOString(),
    colorPref: "bleu",
    name: "Marie",
    username: "mm73",
    visitedSpots: ["Paris"],
    addresses: {
      adressId: {
        postCode: 75000,
        street: "Bim",
        town: "Paris",
      },
    },
  };
  const { currentUserData, signInWithEmailAndPassword, signout } = useContext(
    UserContext
  );
  const {
    personalInfosData,
    addPersonalInfos,
    deletePersonalInfo,
  } = useContext(PersonelInfosContext);
  console.log(personalInfosData.allPersonalInfos);
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
          <IonText>LUI AFFICHER DES INFOS DE PROFIL AU BESOIN</IonText>
          <IonButton
            onClick={() => {
              addPersonalInfos(pi);
            }}
          >
            Créer{" "}
          </IonButton>
          <IonText>
            Ouaw ta couleur préférée est le{" "}
            {personalInfosData.personalInfo &&
              personalInfosData.personalInfo.colorPref}
            L'id du doc:{" "}
            {personalInfosData.personalInfo &&
              personalInfosData.personalInfo.personalInfoId}
          </IonText>
          <IonButton
            onClick={() => {
              deletePersonalInfo(
                personalInfosData.personalInfo &&
                  personalInfosData.personalInfo.personalInfoId
              );
            }}
          >
            Effacer mes données{" "}
          </IonButton>
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
