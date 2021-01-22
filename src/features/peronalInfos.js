import React, { useReducer, useEffect } from "react";
import { firestore } from "../firebase";

const REQUEST_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  ERROR: "error",
  SUCCESS: "success",
};
const initialState = {
  personalInfo: null,
  allPersonalInfos: null,
};

const ACTION_TYPES = {
  ADD: "ADD",
  GET_ALL: "GET_ALL",
};

const personalInfosReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD:
      return { ...state, personalInfo: action.payload };
    case ACTION_TYPES.GET_ALL:
      return { ...state, allPersonalInfos: action.payload };
    default:
      return state;
  }
};

export const Context = React.createContext();
export const usePersonalInfosFeatures = () => {
  const [personalInfosData, dispatch] = useReducer(
    personalInfosReducer,
    initialState
  );

  useEffect(() => {
    const personalInfosRef = firestore.collection("personalinfos");
    const unsubscribe = personalInfosRef
      .orderBy("creationDate", "desc")
      .limit(100)
      .onSnapshot(({ docs }) => {
        dispatch({
          type: ACTION_TYPES.GET_ALL,
          payload: docs.map((doc) => {
            return {
              personalInfoId: doc.id,
              ...doc.data(),
            };
          }),
        });
      });

    return unsubscribe;
  }, []);

  // Définitions de fonctions à exporter à procurer via provider
  // chacune pourra à loisir utiliser dispatch, et être ou pas async

  const addPersonalInfos = async (data) => {
    const personalInfosRef = firestore.collection("personalinfos");
    const personalDocumentRef = await personalInfosRef.add(data);
    const personalDocumentSnapshot = await personalDocumentRef.get();

    dispatch({
      type: ACTION_TYPES.ADD,
      payload: {
        personalInfoId: personalDocumentRef.id,
        ...personalDocumentSnapshot.data(),
      },
    });
  };

  const updatePersonalInfo = async (newData, personalInfoId) => {
    const personalInfosRef = firestore.collection("personalinfos");
    personalInfosRef.doc(personalInfoId).collection().doc.update(newData);
  };

  const deletePersonalInfo = async (personalInfoId) => {
    const personalInfosRef = firestore.collection("personalinfos");
    personalInfosRef.doc(personalInfoId).delete();
  };

  const Provider = (props) => {
    return (
      <Context.Provider
        value={{
          personalInfosData,
          addPersonalInfos,
          updatePersonalInfo,
          deletePersonalInfo,
        }}
        {...props}
      ></Context.Provider>
    );
  };

  return { Provider };
};
