import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const EscapeReservationDetail = (props) => {
  const [state, setState] = useState();
  console.log("왜안나와");
  console.log({ ...props });
  useEffect(() => {
    console.log("왜안나와2");
    console.log(props);
  }, []);
  return (
    <>
      <Container className="mb-5 mt-5">
        <h1 className="text-center">정보입력</h1>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="date">날짜</label>
            <input
              type="text"
              className="form-control"
              value={`${props.location.state.date} ${props.location.state.time}`}
              readOnly
            />
          </div>
          <div className="col-6">
            <label htmlFor="branch">지점</label>
            <input
              type="text"
              className="form-control"
              value={props.location.state.branch}
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="">테마</label>
            <input
              type="text"
              className="form-control"
              value={props.location.state.thema}
              readOnly
            />
          </div>
          <div className="col-6">
            <label htmlFor="people">인원선택</label>
            <select className="form-control" name="" id="">
              <option value="2p">2명</option>
              <option value="3p">3명</option>
              <option value="4p">4명</option>
              <option value="5p">5명</option>
              <option value="6p">6명</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="cost">금액</label>
            <input type="text" className="form-control" value="45,000원" readOnly />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="resname">예약자 성함</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-6">
            <label htmlFor="">연락처</label>
            <input
              type="text"
              className="form-control"
              placholeder=" '-'없이 숫자만 입력해주세요."
            />
          </div>
        </div>

        <button style={{ "margin-left": "45%" }} className="btn btn-outline-info">
          온라인 예약하기
        </button>
      </Container>
    </>
  );
};
export default EscapeReservationDetail;
