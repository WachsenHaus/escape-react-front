import React, { useEffect, useRef, useState } from "react";
import styles from "./themeCard.module.css";
import { Link } from "react-router-dom";

const EscapeThemeCard = ({ theme }) => {
  const [state, setState] = useState(0);
  const card = useRef();
  useEffect(() => {
    setState(1);
  }, []);

  return (
    <>
      <li
        ref={card}
        className={`${styles.thema} col-md-4`}
        style={{ opacity: state, height: "100%" }}
      >
        <div className={styles.border}>
          <div className="thema__border__picture">
            <div>
              <div className={styles.wrap__box}>
                <img src={`${theme.img}`} alt={theme.alt} />
                <div className={`${styles.note}`}>
                  <span className={`${styles.span}`}>{theme.contentsText}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">{theme.level}</div>
          <div className="text-center title">{theme.title}</div>
          <div className="text-center">{theme.type}</div>
          <Link className="btn btn-warning text-center" to="reservation">
            온라인 예약하기
          </Link>
        </div>
      </li>
    </>
  );
};
export default EscapeThemeCard;
