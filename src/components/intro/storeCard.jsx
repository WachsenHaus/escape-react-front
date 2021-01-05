import React from "react";
import styles from "./storeCard.module.css";

const EscapeStoreCard = ({ card }) => {
  const { name } = card;

  return (
    <>
      <div
        className={`col-lg-2 col-md-4 col-sm-5 ${styles.myBox} d-flex flex-column justify-content-center align-items-center  my-4 mx-2
        ${styles.branchStore}`}
      >
        <h5>{name}</h5>
        <hr className="w-50 solid" />
        <a className={`${styles.branch_reserve}`} href="">
          예약하기
        </a>
        <a className="branch_thema" href="">
          테마소개
        </a>
        <a href="">오시는길</a>
      </div>
    </>
  );
};
export default EscapeStoreCard;
