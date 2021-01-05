import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import main_img01 from "../../images/main_img01.jpg";
import main_img02 from "../../images/main_img02.jpg";
import main_img03 from "../../images/main_img03.jpg";
import styles from "./header.module.css";
import css from "./header.css";
const EscapeHeader = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <main>
        <Carousel className={`${styles.height}`}>
          <Carousel.Item className="h-100">
            <img
              className={`${styles.w_100} ${styles.h_100}`}
              src={main_img01}
              alt="1 slide"
            />
            <Carousel.Caption className={styles.caption}>
              <h1>주어진 시간은 단 60분!</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-100">
            <img
              className={`${styles.w_100} ${styles.h_100}`}
              src={main_img02}
              alt="2 slide"
            />
            <Carousel.Caption className={styles.caption}>
              <h1>전국 최대 100평 규모의 미스터리 방탈출 카페</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-100">
            <img
              className={`${styles.w_100} ${styles.h_100}`}
              src={main_img03}
              alt="3 slide"
            />
            <Carousel.Caption className={styles.caption}>
              <h1>방안에 모든것이 단서다! 지금 이 순간! 큐브에 도전하세요!</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </main>
    </>
  );
};
export default EscapeHeader;
