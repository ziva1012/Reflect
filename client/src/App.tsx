import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {MainView} from "./views/MainView";
import {RegisterView} from "./views/RegisterView";
import {useEffect} from "react";
import firebase from "firebase";

export default function App() {

    useEffect(() => {
        const config = {
            apiKey: "AIzaSyDluP0Wp9nYFNse_SdUDDBX-QHGKfDWbh0",
            authDomain: "reflect-59598.firebaseapp.com",
            databaseURL: "https://reflect-59598.firebaseio.com/",
            projectId: "reflect-59598",
            storageBucket: "reflect-59598.appspot.com",
            messagingSenderId: "124301744749",
            appId: "1:124301744749:web:a09d2d95c7bfb7de813d64",
            measurementId: "G-BH2DWFHXES"
        };
        firebase.initializeApp(config);
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/main" component={MainView} />
                <Route exact path="/" component={RegisterView} />
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}
