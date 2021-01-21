import { auth } from "../firebase";

import React, { useReducer } from "react";

const REQUEST_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  ERROR: "error",
  SUCCESS: "success",
};
const initialState = {
  id: null,
  email: null,
  isLogedin: false,
  signInStatus: REQUEST_STATUS.IDLE,
  signInErrorMessage: null,
};

const ACTION_TYPES = {
  SIGN_IN: "signIn",
};

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN:
      return { ...state, email: action.payload.email, id: action.payload.id };
    default:
      return state;
  }
};

export const useUserFeatures = () => {
  const [currentUserData, dispatch] = useReducer(
    currentUserReducer,
    initialState
  );

  const signInWithEmailAndPassword = ({ email, password }) => {
    // Faire ce qu'il faut pour demander le sign in à auth
    // et récupérer l'id
    const id = password;

    dispatch({ type: ACTION_TYPES.SIGN_IN, payload: { email, id } });
  };

  return { currentUserData, signInWithEmailAndPassword };
};
