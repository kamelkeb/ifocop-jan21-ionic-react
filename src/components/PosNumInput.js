import { IonItem, IonInput, IonLabel } from "@ionic/react";
import React from "react";
import classes from "./PosNumInput.module.css";

export const PosNumInput = ({ value, onChange, title }) => {
  return (
    <IonItem className={classes.box}>
      <IonLabel position="floating">{title}</IonLabel>
      <IonInput
        value={value}
        onIonChange={(e) => onChange(e.detail.value)}
        min={0}
        max={10000}
        step={100}
        inputmode="numeric"
        type="number"
      ></IonInput>
    </IonItem>
  );
};
