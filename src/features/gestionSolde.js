import React, { useReducer } from 'react';

const initialState = { nom: "Keb", prénom: "Martin", solde: 500, nombreEntréeAdécouvert: 0 };

export const soldeReducer = (currentState, action) => {
  switch (action.type) {
    case "retrait":
      const entréeEnDécouvert = currentState.solde >= 0 &&
        currentState.solde - action.payload < 0;
      const nouveauNombreEntréeAdécouvert = currentState.nombreEntréeAdécouvert +
        (entréeEnDécouvert ? 1 : 0);
      return {
        ...currentState,
        solde: currentState.solde - action.payload,
        nombreEntréeAdécouvert: nouveauNombreEntréeAdécouvert
      };
    case "dépot":
      return { ...currentState, solde: currentState.solde + action.payload };
    default:
      return currentState;
  }
};

export const useSoldeFeature = () => {
  const [userData, dispatch] = useReducer(soldeReducer, initialState);

  const déposerDesSous = (x) => {
    if (Number.isNaN(Number(x))) {
      throw new Error("Fais pas le malin!");
    }
    dispatch({ type: "dépot", payload: x });
  };
  const retirerDesSous = (x) => {
    if (Number.isNaN(Number(x))) {
      throw new Error("Fais pas le malin!");
    }
    dispatch({ type: "retrait", payload: x });
  };
  return { userData, déposerDesSous, retirerDesSous };
};
