import { Route, Redirect } from "react-router";
import React, { useContext } from "react";
import { Context as UserContext } from "../features/currentUser";

export const ProtectedRoute = (props) => {
  const { currentUserData } = useContext(UserContext);

  if (currentUserData.isLogedin) {
    return <Route {...props}></Route>;
  } else {
    return <Redirect to="/signinup" />;
  }
};
