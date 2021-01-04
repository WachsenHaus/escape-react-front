import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/darkly/bootstrap.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import EscapeNav from "./components/nav/nav.jsx";
import styles from "./app.module.css";
import EscapeInfo from "./components/info/info";
import EscapeTheme from "./components/theme/theme.jsx";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Route path="/">
          <EscapeNav />
        </Route>
        <Switch>
          <Route exact path="/info">
            <EscapeInfo />
          </Route>
          <Route exact path="/theme">
            <EscapeTheme />
          </Route>
          <Route exact path="/reservation">
            <EscapeInfo />
          </Route>
          <Route exact path="/confirm">
            <EscapeInfo />
          </Route>
          <Route exact path="/notice">
            <EscapeInfo />
          </Route>
          <Route exact path="/mapinfo">
            <EscapeInfo />
          </Route>
          <Route exact path="/review">
            <EscapeInfo />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
