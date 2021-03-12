import React from "react";
import { Container } from "react-bootstrap";
import notice1 from "../../images/notice01.jpg";
import notice2 from "../../images/notice02.jpg";
import notice3 from "../../images/notice03.jpg";
import notice4 from "../../images/notice04.jpg";
import styles from "./caution.module.css";
const EscapeCaution = (props) => {
  return (
    <>
      <section className="bg-white">
        <Container className="pt-5">
          <h3 className="text-muted text-center">주의 사항</h3>
          <h5 className="text-muted text-center">
            안전한 문화생활을 위해 아래 준수사항을 꼭 지켜주시길 바랍니다.
          </h5>
          <div className={`row ${styles.column}`}>
            <div className="col-lg-3 col-md-6 col-6 my-5 d-flex flex-column justify-content-center align-items-center">
              <div className={styles.box}>
                <img src={notice1} alt="" />
                <p className={`${styles.title} text-muted mt-5`}>사진촬영금지</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6 my-5 d-flex flex-column justify-content-center align-items-center">
              <div className={styles.box}>
                <img src={notice2} alt="" />
                <p className={`${styles.title} text-muted mt-5`}>위험물질 반입금지</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6 my-5 d-flex flex-column justify-content-center align-items-center">
              <div className={styles.box}>
                <img src={notice3} alt="" />
                <p className={`${styles.title} text-muted mt-5`}>안전주의</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6 my-5 d-flex flex-column justify-content-center align-items-center">
              <div className={styles.box}>
                <img src={notice4} alt="" />
                <p className={`${styles.title} text-muted mt-5`}>물질파손주의</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default EscapeCaution;
