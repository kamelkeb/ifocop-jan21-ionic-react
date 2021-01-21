import { IonItem, IonInput, IonLabel } from "@ionic/react";
import React from "react";
import classes from "./TextInput.module.css";

export const TextInput = ({ value, onChange, title }) => {
  return (
    <IonItem className={classes.box}>
      <IonLabel position="floating">{title}</IonLabel>
      <IonInput
        value={value}
        onIonChange={(e) => onChange(e.detail.value)}
      ></IonInput>
    </IonItem>
  );
};
