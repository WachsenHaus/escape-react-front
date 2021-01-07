import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const EscapeReservationTitle = ({ props }) => {
  console.log();
  const [state, setState] = useState({
    date: new Date().toISOString().split("T")[0],
  });
  useEffect(() => {
    // setState(new Date().toISOString().split("T")[0]);
  }, []);
  return (
    <>
      <Container>
        <h1 className="text-center branch__tag">예약하기</h1>
        <div className="form-group row">
          <div className="col-4">
            <label htmlFor="">날짜선택</label>
            <input type="date" value={state.date} />
          </div>
          <div className="col-4">
            <label htmlFor="">지점선택</label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="">테마</label>
            <select name="" id=""></select>
          </div>
          <table className="table table-striped mt-3">
            <thead>
              <tr className="row">
                <th className="col-3 text-center">시간</th>
                <th className="col-6 text-center">테마</th>
                <th className="col-3 text-center">예약</th>
              </tr>
            </thead>
            <tbody>
              <tr className="row">
                <td className="col-3 text-center">시간</td>
                <td className="col-6 text-center">테마</td>
                <td className="col-3 text-center">매진</td>
              </tr>
            </tbody>
          </table>
          <Button variant="primary" style={{ "margin-left": "85%" }}>
            예약취소
          </Button>
        </div>
      </Container>
    </>
  );
};
export default EscapeReservationTitle;
