import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {MainView} from "./views/MainView";
import {RegisterView} from "./views/RegisterView";

export default function App() {
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
