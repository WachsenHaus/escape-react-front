import React from "react";
import { Container } from "react-bootstrap";
import EscapeStoreCard from "./storeCard";
import styles from "./storeIntro.module.css";

const EscapeStoreIntro = ({ setBranch }) => {
  const cards = [
    {
      id: 1,
      type: "card",
      name: "홍대점",
    },
    {
      id: 2,
      type: "card",
      name: "대구점",
    },
    {
      id: 3,
      type: "card",
      name: "인천구월점",
    },
    {
      id: 4,
      type: "card",
      name: "전주점",
    },
  ];
  const cards2 = [
    {
      id: 7,
      type: "card",
      name: "잠실점",
    },
    {
      id: 8,
      type: "card",
      name: "대전둔산점",
    },
    {
      id: 9,
      type: "card",
      name: "천호점",
    },
    {
      id: 10,
      type: "card",
      name: "수유점",
    },
  ];
  return (
    <>
      <div className={`${styles.img} bg-dark p-5`}>
        <Container>
          <h3 className="text-center mt-5">지점별 예약/테마소개</h3>
          <h5 className="text-center mt-4 mb-5">
            원하시는 지점에서 예약 가능한 일자 확인 또는 예약을 하시려면, 예약하기 버튼을
            눌러 주세요.
          </h5>
          <div className="row d-flex flex-wrap justify-content-center align-items-center">
            {cards.map((card, index) => (
              <EscapeStoreCard setBranch={setBranch} key={card.id} card={card} />
            ))}
          </div>
          <div className="row d-flex flex-wrap justify-content-center align-items-center">
            {cards2.map((card, index) => (
              <EscapeStoreCard setBranch={setBranch} key={card.id} card={card} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};
export default EscapeStoreIntro;
