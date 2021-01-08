import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import EscapeThemeCard from "./themeCard";
import styles from "./themeCard.module.css";

const EscapeThemeCards = ({ state }) => {
  return (
    <>
      <ul className="container">
        {state.ownedThemes.map((theme) => (
          <EscapeThemeCard key={Math.random()} theme={theme} />
        ))}
      </ul>
    </>
  );
};
export default EscapeThemeCards;
