import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./reservationSucceed.module.css";
import { useLocation } from "react-router-dom";
const EscapeReservationSucceed = (props) => {
  const historyState = useLocation().state;

  const [state, setState] = useState(
    historyState && {
      bname: historyState.bname,
      thema: historyState.thema,
      numberOfPeople: historyState.numberOfPeople,
      date: historyState.date,
      time: historyState.time,
      cost: historyState.cost,
      name: historyState.name,
      phone: historyState.phone,
      resNo: historyState.resNo,
    }
  );
  return (
    <>
      <Container>
        <h1>예약완료</h1>
        <hr style={{ border: "2px solid gray" }} />
        <div className="table1">
          <table className="table">
            <tr>
              <th>지점</th>
              <td>{state.bname}</td>
            </tr>
            <tr>
              <th>테마</th>
              <td>{state.thema}</td>
            </tr>
            <tr>
              <th>예약일시</th>
              <td>
                {state.date} {state.time}
              </td>
            </tr>
            <tr>
              <th>인원</th>
              <td>{state.numberOfPeople}</td>
            </tr>
            <tr>
              <th>참가요금</th>
              <td>{state.cost}</td>
            </tr>
          </table>
        </div>
        <div className="table2" style={{ "margin-top": "5%" }}>
          <table className="table">
            <tr>
              <th>예약자</th>
              <td>{state.name}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{state.phone}</td>
            </tr>
            <tr>
              <th>예약확인번호</th>
              <td>
                {state.resNo}
                <span style={{ "margin-left": "5%", "color": "red" }}>
                  (예약확인 및 취소 때 필요한 정보 입니다.)
                </span>
              </td>
            </tr>
          </table>
        </div>
      </Container>
    </>
  );
};
export default EscapeReservationSucceed;
