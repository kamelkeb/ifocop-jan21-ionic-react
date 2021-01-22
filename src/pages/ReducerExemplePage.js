import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonActionSheet,
  IonToast,
} from "@ionic/react";

import { useSoldeFeature } from "../features/gestionSolde";
import { PosNumInput } from "../components/PosNumInput";
import classes from "./Tab1.module.css";

const ReducerExemplePage = () => {
  const { userData, déposerDesSous, retirerDesSous } = useSoldeFeature();
  const [montant, setMontant] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [isDepot, setIsDepot] = useState();

  const dépotHandler = () => {
    setIsDepot(true);
    setShowToast(true);
  };
  const retraitHandler = () => {
    setIsDepot(false);
    setShowToast(true);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reducer usage exemple</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>
          Bonjour {userData.nom}, votre solde est de {userData.solde}
        </IonText>
        <IonText>
          Depuis que vous êtes chez nous, vous êtes entré{" "}
          {userData.nombreEntréeAdécouvert} fois en découvert.
        </IonText>

        <PosNumInput
          value={montant}
          onChange={setMontant}
          title="Montant"
        ></PosNumInput>
        <IonButton onClick={dépotHandler}>Ajouter</IonButton>
        <IonButton onClick={retraitHandler}>Retirer</IonButton>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={`Votre nouveau solde sera de: ${
          userData.solde + (isDepot ? Number(montant) : -Number(montant))
        }, voulez vous procédez?`}
        position="middle"
        animated={true}
        cssClass={classes.toast}
        buttons={[
          {
            side: "start",
            role: "cancel",
            text: "Annuler",
            handler: () => {
              setShowToast(false);
              setMontant(0);
            },
          },
          {
            text: "Oui",

            handler: () => {
              setShowToast(false);
              isDepot ? déposerDesSous(montant) : retirerDesSous(montant);
              setMontant(0);
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default ReducerExemplePage;
