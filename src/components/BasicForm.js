import React, { useState } from "react";
import {
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle,
} from "@ionic/react";

export const BasicForm = ({ signInHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signInHandler({ email, password });
      }}
    >
      <IonGrid fixed>
        <IonRow style={{ width: "100%" }}>
          <IonCol size="12">
            <IonTitle>
              <h3>Pour vous connecter:</h3>
            </IonTitle>
          </IonCol>
        </IonRow>
        <IonRow style={{ width: "100%" }}>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">E-mail</IonLabel>
              <IonInput
                required
                value={email}
                onIonChange={(e) => setEmail(e.detail.value)}
                type="email"
              ></IonInput>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                required
                value={password}
                onIonChange={(e) => setPassword(e.detail.value)}
                type="password"
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow style={{ width: "100%" }}>
          <IonCol>
            <IonButton type="submit" size="small">
              Sign In
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <button type="submit"></button>
    </form>
  );
};
