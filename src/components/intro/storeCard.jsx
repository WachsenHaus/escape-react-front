import React from "react";
import styles from "./storeCard.module.css";
import { Link } from "react-router-dom";
const EscapeStoreCard = ({ card, setBranch }) => {
  const { name } = card;
  const onBranchChange = () => {
    setBranch(name);
  };
  return (
    <>
      <div
        className={`col-lg-2 col-md-4 col-sm-5 ${styles.myBox} d-flex flex-column justify-content-center align-items-center  my-4 mx-2
        ${styles.branchStore}`}
      >
        <h5>{name}</h5>
        <hr className="w-50 solid" />
        <Link onClick={onBranchChange} to="reservation">
          예약하기
        </Link>
        <Link onClick={onBranchChange} to="theme">
          테마소개
        </Link>
        <Link onClick={onBranchChange} to="theme">
          오시는길
        </Link>
      </div>
    </>
  );
};
export default EscapeStoreCard;
