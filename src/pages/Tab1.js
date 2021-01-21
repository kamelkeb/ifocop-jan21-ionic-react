import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonActionSheet,
} from "@ionic/react";

import "./Tab1.css";
import { useSoldeFeature } from "../features/gestionSolde";
import { TextInput } from "../components/TextInput";

const Tab1 = () => {
  const { userData, déposerDesSous, retirerDesSous } = useSoldeFeature();
  const [montant, setMontant] = useState(0);

  const dépotHandler = () => déposerDesSous(montant);
  const retraitHandler = () => retirerDesSous(montant);
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

        <TextInput
          value={montant}
          onChange={setMontant}
          title="Montant"
        ></TextInput>
        <IonButton onClick={dépotHandler}>Ajouter</IonButton>
        <IonButton onClick={retraitHandler}>Retirer</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
