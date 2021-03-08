import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./theme.module.css";
import EscapeThemeCards from "./themeCards";

const EscapeTheme = ({ state, setOwnedThemes }) => {
  return (
    <>
      <Container>
        <div className="text-center">
          <h1 className="head-text">당신의 상상력,판단력,추리 능력은?</h1>
          <p className="head-text">
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
              setOwnedThemes("홍대점");
            }}
            className={`${styles.margin} ${
              state.branch === "홍대점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            홍대점
          </Button>
          <Button
            onClick={() => {
              setOwnedThemes("대구점");
            }}
            className={`${styles.margin} ${
              state.branch === "대구점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            대구점
          </Button>
          <Button
            onClick={() => {
              setOwnedThemes("인천구월점");
            }}
            className={`${styles.margin} ${
              state.branch === "인천구월점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            인천구월점
          </Button>
          <Button
            onClick={() => {
              setOwnedThemes("전주점");
            }}
            className={`${styles.margin} ${
              state.branch === "전주점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            전주점
          </Button>
          <Button
            onClick={() => {
              setOwnedThemes("잠실점");
            }}
            className={`${styles.margin} ${
              state.branch === "잠실점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            잠실점
          </Button>
          <Button
            onClick={() => {
              setOwnedThemes("대전둔산점");
            }}
            className={`${styles.margin} ${
              state.branch === "대전둔산점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            대전둔산점
          </Button>
          <Button
            onClick={() => {
              setOwnedThemes("천호점");
            }}
            className={`${styles.margin} ${
              state.branch === "천호점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            천호점
          </Button>
          <Button
            onClick={() => {
              setOwnedThemes("수유점");
            }}
            className={`${styles.margin} ${
              state.branch === "수유점" ? " active focus" : ""
            }`}
            variant="warning"
          >
            수유점
          </Button>
          <EscapeThemeCards state={state} />
        </div>
      </Container>
    </>
  );
};
export default EscapeTheme;
