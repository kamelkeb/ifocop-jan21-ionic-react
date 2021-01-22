import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { imagesOutline, person, analyticsOutline } from "ionicons/icons";
import ReducerExemplePage from "./pages/ReducerExemplePage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import SignInUp from "./pages/SignInUp";
import { useUserFeatures } from "./features/currentUser";
import { usePersonalInfosFeatures } from "./features/peronalInfos";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App: React.FC = () => {
  const { Provider: CurrentUserProvider } = useUserFeatures();
  const { Provider: PersonalInfosProvider } = usePersonalInfosFeatures();
  return (
    <IonApp>
      <CurrentUserProvider>
        <PersonalInfosProvider>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <ProtectedRoute
                  path="/reducer"
                  component={ReducerExemplePage}
                  exact={true}
                />
                <ProtectedRoute
                  path="/Photo-Gallery"
                  component={PhotoGalleryPage}
                  exact={true}
                />
                <Route path="/signinup" component={SignInUp} />
                <Route
                  path="/"
                  render={() => <Redirect to="/signinup" />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="reducer" href="/reducer">
                  <IonIcon icon={analyticsOutline} />
                  <IonLabel>Reducer</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Photo Gallery" href="/Photo-Gallery">
                  <IonIcon icon={imagesOutline} />
                  <IonLabel>Photo Gallery</IonLabel>
                </IonTabButton>
                <IonTabButton tab="signinup" href="/signinup">
                  <IonIcon icon={person} />
                  <IonLabel>Sign in or sign up</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </PersonalInfosProvider>
      </CurrentUserProvider>
    </IonApp>
  );
};

export default App;
