import { auth } from "../firebase";
import React, { useEffect, useReducer } from "react";

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
  LOCAL_SIGN_IN: "localSignIn",
  LOCAL_SIGN_OUT: "localSignOut",
  SIGN_IN_ERROR: "signInError",
};

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGN_IN:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        isLogedin: true,
        signInStatus: REQUEST_STATUS.SUCCESS,
        signInErrorMessage: null,
      };
    case ACTION_TYPES.SIGN_OUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.LOCAL_SIGN_IN:
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
        isLogedin: true,
      };
    case ACTION_TYPES.LOCAL_SIGN_OUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.SIGN_IN_ERROR:
      return {
        ...initialState,
        signInErrorMessage: action.payload,
        signInStatus: REQUEST_STATUS.ERROR,
      };
    default:
      return state;
  }
};

export const Context = React.createContext();

const signInWithEmailAndPassword = (dispatch) => async ({
  email,
  password,
}) => {
  try {
    // Faire ce qu'il faut pour demander le sign in à auth
    // et récupérer l'id
    const credential = await auth.signInWithEmailAndPassword(email, password);
    const id = credential.user.uid;
    dispatch({ type: ACTION_TYPES.SIGN_IN, payload: { email, id } });
  } catch (error) {
    dispatch({ type: ACTION_TYPES.SIGN_IN_ERROR, payload: error.message });
  }
};

const signout = (dispatch) => async () => {
  const response = await auth.signOut();

  dispatch({ type: ACTION_TYPES.SIGN_OUT });
};

const sendResetPasswordEmail = (dispatch) => (email) => {
  auth.sendPasswordResetEmail(email);
};

export const useUserFeatures = () => {
  const [currentUserData, dispatch] = useReducer(
    currentUserReducer,
    initialState
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (Boolean(user)) {
        // Cas déjà authentifié et authentification toujours valable
        dispatch({
          type: ACTION_TYPES.LOCAL_SIGN_IN,
          payload: { email: user.email, id: user.uid },
        });
      } else {
        // Cas pas authentifié
        dispatch({ type: ACTION_TYPES.LOCAL_SIGN_OUT });
      }
    });

    return unsubscribe;
  }, []);

  const Provider = (props) => {
    return (
      <Context.Provider
        value={{
          currentUserData,
          signInWithEmailAndPassword: signInWithEmailAndPassword(dispatch),
          signout: signout(dispatch),
          sendResetPasswordEmail: sendResetPasswordEmail(dispatch),
        }}
        {...props}
      ></Context.Provider>
    );
  };

  return { Provider };
};
