import React, { useCallback, useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./theme.module.css";
import EscapeThemeCard from "./themeCard";
import {
  allThema,
  daejeonThema,
  jeonjuThema,
  incheonThema,
  cheonhoThema,
  daeguThema,
  hongdaeThema,
  suyuThema,
  jamsilThema,
  themaes,
} from "./themeData.js";
const EscapeTheme = (props) => {
  const [branch, setBranch] = useState("all");
  const [ownedThemes, setOwnedThemes] = useState([...themaes]);

  const getBtnBranch = useCallback((branch = "all") => {
    let selectedBranch;
    switch (branch) {
      case "hongdae":
        selectedBranch = hongdaeThema.map((index) => themaes[index]);
        break;
      case "daugu":
        selectedBranch = daeguThema.map((index) => themaes[index]);
        break;
      case "incheon":
        selectedBranch = incheonThema.map((index) => themaes[index]);
        break;
      case "jeonju":
        selectedBranch = jeonjuThema.map((index) => themaes[index]);
        break;
      case "jamsil":
        selectedBranch = jamsilThema.map((index) => themaes[index]);
        break;
      case "daejeon":
        selectedBranch = daejeonThema.map((index) => themaes[index]);
        break;
      case "cheonho":
        selectedBranch = cheonhoThema.map((index) => themaes[index]);
        break;
      case "suyu":
        selectedBranch = suyuThema.map((index) => themaes[index]);
        break;
      case "all":
        console.log("all!!");
        selectedBranch = allThema.map((index) => themaes[index]);
        break;
      default:
        console.log("디폴트!");
        selectedBranch = allThema.map((index) => themaes[index]);
        break;
    }
    setOwnedThemes([...selectedBranch]);
    setBranch(branch);
  }, []);
  return (
    <>
      <Container>
        <div class="text-center">
          <h1 class="head-text">당신의 상상력,판단력,추리 능력은?</h1>
          <p class="head-text">
            CUBE Escape Game은 참가자가 실제 상황을 방불케 하는 특별한 테마 룸에 갇힌 채
            60분 이내에
            <br />
            주어진 미션을 해결하여 탈출해야하는 신개념 문화/여가 시설입니다.
            <br />
            테마 룸 입장 후 주어진 시나리오에 따라 출입구는 봉쇄하며, 여러분의 명석한
            두뇌로 주어진 퀴즈를 해결해 탈출하세요.
            <br />
          </p>
        </div>
        <div className="text-center branch__box">
          <h5>원하시는 지점을 눌러주세요.</h5>
          <Button
            onClick={() => {
              getBtnBranch("all");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            모든 테마
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("hongdae");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            홍대점
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("suyu");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            대구점
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("incheon");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            인천구월점
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("jeonju");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            전주점
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("jamsil");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            잠실점
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("daejeon");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            대전둔산점
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("cheonho");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            천호점
          </Button>
          <Button
            onClick={() => {
              getBtnBranch("suyu");
            }}
            className={`${styles.margin}`}
            variant="warning"
          >
            수유점
          </Button>
          <ul className="container">
            {ownedThemes.map((theme) => (
              <EscapeThemeCard branch={branch} theme={theme} />
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
};
export default EscapeTheme;
