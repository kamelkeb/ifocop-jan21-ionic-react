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
import { imagesOutline, square, analyticsOutline } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";


const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/reducer" component={Tab1} exact={true} />
                    <Route
                        path="/Photo-Gallery"
                        component={Tab2}
                        exact={true}
                    />
                    <Route path="/tab3" component={Tab3} />
                    <Route
                        path="/"
                        render={() => <Redirect to="/tab1" />}
                        exact={true}
                    />
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/reducer">
                        <IonIcon icon={analyticsOutline} />
                        <IonLabel>Reducer</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="Photo Gallery" href="/Photo-Gallery">
                        <IonIcon icon={imagesOutline} />
                        <IonLabel>Photo Gallery</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                        <IonIcon icon={square} />
                        <IonLabel>Tab 3</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;


