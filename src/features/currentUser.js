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
  SIGN_OUT: "signOut",
};

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        isLogedin: true,
      };
    case ACTION_TYPES.SIGN_OUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const Context = React.createContext();

export const useUserFeatures = () => {
  const [currentUserData, dispatch] = useReducer(
    currentUserReducer,
    initialState
  );

  const signInWithEmailAndPassword = async ({ email, password }) => {
    // Faire ce qu'il faut pour demander le sign in à auth
    // et récupérer l'id
    const credential = await auth.signInWithEmailAndPassword(email, password);

    console.log(credential);
    const id = credential.user.uid;
    dispatch({ type: ACTION_TYPES.SIGN_IN, payload: { email, id } });
  };

  const signout = async () => {
    const response = await auth.signOut();
    dispatch({ type: ACTION_TYPES.SIGN_OUT });
  };

  const Provider = (props) => {
    return (
      <Context.Provider
        value={{ currentUserData, signInWithEmailAndPassword, signout }}
        {...props}
      ></Context.Provider>
    );
  };

  return { Provider };
};
