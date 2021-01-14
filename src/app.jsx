import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/darkly/bootstrap.css";
import React, { useEffect, useState } from "react";
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
import Escape from "./service/api";
import RegUtil from "./utils/regex";
import {
  daejeonThema,
  jeonjuThema,
  incheonThema,
  cheonhoThema,
  daeguThema,
  hongdaeThema,
  suyuThema,
  jamsilThema,
  themaes,
} from "./components/theme/themeData.js";
import EscapeReservationDetail from "./components/reservation/reservationDetail.jsx";
import EscapeReservationSucceed from "./pages/reservationSucceed.jsx";
import EscapeConfirm from "./pages/confirm.jsx";

function App() {
  const EscapeApi = new Escape();
  const Regex = new RegUtil();
  let timezoneOffset = new Date().getTimezoneOffset() * 60000;
  let timezoneDate = new Date(Date.now() - timezoneOffset);

  const [state, setState] = useState({
    branch: "홍대점",
    date: timezoneDate.toISOString().split("T")[0],
    ownedThemes: [],
  });
  useEffect(() => {
    setState((state) => {
      const dummy = { ...state };
      dummy.ownedThemes = [...hongdaeThema.map((index) => themaes[index])];
      console.log(dummy.ownedThemes);
      return dummy;
    });
  }, []);
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
  const setOwnedThemes = (branchName) => {
    setState((state) => {
      const selectedBranch = { ...state };
      selectedBranch.branch = branchName;
      switch (branchName) {
        case "홍대점":
          selectedBranch.ownedThemes = hongdaeThema.map((index) => themaes[index]);
          break;
        case "대구점":
          selectedBranch.ownedThemes = daeguThema.map((index) => themaes[index]);
          break;
        case "인천구월점":
          selectedBranch.ownedThemes = incheonThema.map((index) => themaes[index]);
          break;
        case "전주점":
          selectedBranch.ownedThemes = jeonjuThema.map((index) => themaes[index]);
          break;
        case "잠실점":
          selectedBranch.ownedThemes = jamsilThema.map((index) => themaes[index]);
          break;
        case "대전둔산점":
          selectedBranch.ownedThemes = daejeonThema.map((index) => themaes[index]);
          break;
        case "천호점":
          selectedBranch.ownedThemes = cheonhoThema.map((index) => themaes[index]);
          break;
        case "수유점":
          selectedBranch.ownedThemes = suyuThema.map((index) => themaes[index]);
          break;
        default:
          selectedBranch.ownedThemes = hongdaeThema.map((index) => themaes[index]);
          break;
      }
      return selectedBranch;
    });
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <EscapeNav />
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
            <EscapeTheme
              state={state}
              setBranch={setBranch}
              setOwnedThemes={setOwnedThemes}
            />
          </Route>
          <Route exact path="/reservation">
            <EscapeReservationTitle
              state={state}
              setBranch={setBranch}
              setDate={setDate}
              setOwnedThemes={setOwnedThemes}
              EscapeApi={EscapeApi}
              timezoneDate={timezoneDate}
            />
          </Route>
          <Route exact path="/confirm">
            <EscapeConfirm Regex={Regex} EscapeApi={EscapeApi} />
          </Route>
          <Route exact path="/notice">
            <EscapeConfirm />
          </Route>
          <Route exact path="/mapinfo">
            <EscapeInfo />
          </Route>
          <Route exact path="/review">
            <EscapeInfo />
          </Route>
          <Route exact path="/reservation-detail">
            <EscapeReservationDetail EscapeApi={EscapeApi} />
          </Route>
          <Route exact path="/reservation-succeed">
            <EscapeReservationSucceed EscapeApi={EscapeApi} />
          </Route>
        </Switch>
        <EscapeFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
