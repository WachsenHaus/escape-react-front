import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import EscapeThemeCard from "./themeCard";
import styles from "./themeCard.module.css";

const EscapeThemeCards = ({ ownedThemes, time }) => {
  return (
    <>
      <ul className="container">
        {ownedThemes.map((theme) => (
          <EscapeThemeCard key={Math.random()} time={time} theme={theme} />
        ))}
      </ul>
    </>
  );
};
export default EscapeThemeCards;
