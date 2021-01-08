import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./themeCard.module.css";

const EscapeThemeCard = ({ theme }) => {
  const [state, setState] = useState(0);
  const card = useRef();
  useEffect(() => {
    setState(1);
  }, []);
  return (
    <>
      <li ref={card} className={`${styles.thema} col-md-4`} style={{ opacity: state }}>
        <div className={styles.border}>
          <div className="thema__border__picture">
            <div>
              <div className={styles.wrap__box}>
                <img src={`${theme.img}`} alt={theme.alt} />
                <div className={`${styles.note}`}>
                  <span>{theme.contentsText}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">{theme.level}</div>
          <div className="text-center title">{theme.title}</div>
          <div className="text-center">{theme.type}</div>
          <Button variant="warning" className="text-center">
            온라인예약하기
          </Button>
        </div>
      </li>
    </>
  );
};
export default EscapeThemeCard;
