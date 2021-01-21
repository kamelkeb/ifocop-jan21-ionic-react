import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { BasicForm } from '../components/BasicForm';
import { useUserFeatures } from "../features/currentUser";

const Tab3: React.FC = () => {
  const { signInWithEmailAndPassword, currentUserData } = useUserFeatures();



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign in or sign up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle>{currentUserData.isLogedin ? `${currentUserData.email} est bien connecté!` : 'Pas encore connecté!'}</IonTitle>
        <BasicForm signInHandler={signInWithEmailAndPassword}></BasicForm>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
