import React, { useReducer } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';
import { useSoldeFeature } from '../features/gestionSolde';





const Tab1 = () => {
  const { userData, déposerDesSous, retirerDesSous } = useSoldeFeature();

  const dépotHandler = () => déposerDesSous("delete all");
  const retraitHandler = () => retirerDesSous(100);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reducer usage exemple</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>Bonjour {userData.nom}, votre solde est de {userData.solde}</IonText>
        <IonText>Depuis que vous êtes chez nous, vous êtes entré {userData.nombreEntréeAdécouvert} fois en découvert.</IonText>
        <IonButton onClick={dépotHandler}>Ajouter 100</IonButton>
        <IonButton onClick={retraitHandler}>Retirer 100</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
