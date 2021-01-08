import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/darkly/bootstrap.css";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import EscapeNav from "./components/nav/nav.jsx";
import styles from "./app.module.css";
import EscapeInfo from "./components/info/info";
import EscapeTheme from "./components/theme/theme.jsx";
import EscapeHeader from "./components/header/header.jsx";
import EscapeStoreIntro from "./components/intro/storeIntro.jsx";
import EscapeCaution from "./components/caution/caution.jsx";
import EscapeFooter from "./components/footer/footer.jsx";
import EscapeIntro from "./components/intro/intro.jsx";
import EscapeReservationTitle from "./components/reservation/reservationTitle.jsx";

function App() {
  const [state, setState] = useState({
    branch: "홍대점",
    date: new Date().toISOString().split("T")[0],
  });
  const setBranch = (branchName) => {
    setState((state) => {
      const mBranch = { ...state };
      mBranch.branch = branchName;
      console.log(mBranch);
      return mBranch;
    });
  };
  const setDate = (date) => {
    setState((state) => {
      const mDate = { ...state };
      mDate.date = date;
      return mDate;
    });
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Route path="/">
          <EscapeNav />
        </Route>
        <Switch>
          <Route exact path="/">
            <EscapeHeader />
            <EscapeStoreIntro setBranch={setBranch} />
            <EscapeCaution />
          </Route>
          <Route exact path="/info">
            <EscapeIntro />
          </Route>
          <Route exact path="/theme">
            <EscapeTheme />
          </Route>
          <Route exact path="/reservation">
            <EscapeReservationTitle
              state={state}
              setBranch={setBranch}
              setDate={setDate}
            />
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
        <Route path="/">
          <EscapeFooter />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
