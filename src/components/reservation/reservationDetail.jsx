import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
const EscapeReservationDetail = ({ EscapeApi }) => {
  const historyState = useLocation().state;
  const history = useHistory();

  const [state, setState] = useState(
    historyState && {
      date: historyState.date,
      time: historyState.time,
      thema: historyState.thema,
      branch: historyState.branch,
      // }
    }
  );

  const numberOfPeopleRef = useRef();
  const costRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {}, []);

  const uploadReservationState = () => {
    const data = {
      name: nameRef.current.value,
      date: state.date,
      time: state.time,
      bname: state.branch,
      thema: state.thema,
      phone: phoneRef.current.value,
      cost: costRef.current.value,
      numberOfPeople: numberOfPeopleRef.current.value,
    };
    const setData = EscapeApi.setReservation(
      data.name,
      data.date,
      data.time,
      data.bname,
      data.thema,
      data.phone,
      data.cost,
      data.numberOfPeople
    );

    setData
      .then((res) => {
        if (!!!res) return;
      })
      .then(() => {
        const goReservation = EscapeApi.getResNumber(
          data.bname,
          data.thema,
          data.date,
          data.time
        );
        goReservation.then((res) => {
          if (!!!res) return;
          if (res.status === 200) {
            alert("예약되었습니다.");
            history.push({
              pathname: "/reservation-succeed",
              state: {
                bname: data.bname,
                thema: data.thema,
                date: data.date,
                time: data.time,
                numberOfPeople: data.numberOfPeople,
                cost: data.cost,
                name: data.name,
                phone: data.phone,
                resNo: res.data.number,
              },
            });
          } else if (res.status !== 200) {
            alert("예약은 성공하였으나 조회에 실패하였습니다.");
          }
        });
      });
  };
  const costChange = () => {
    if (numberOfPeopleRef.current) {
      const count = numberOfPeopleRef.current.value;
      switch (count) {
        case "2p":
          costRef.current.value = "45,000원";
          break;
        case "3p":
          costRef.current.value = "60,000원";
          break;
        case "4p":
          costRef.current.value = "76,000원";
          break;
        case "5p":
          costRef.current.value = "90,000원";
          break;
        case "6p":
          costRef.current.value = "102,000원";
          break;
        default:
          break;
      }
    }
  };

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
              value={`${state.date} ${state.time}`}
              readOnly
            />
          </div>
          <div className="col-6">
            <label htmlFor="branch">지점</label>
            <input type="text" className="form-control" value={state.branch} readOnly />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="">테마</label>
            <input type="text" className="form-control" value={state.thema} readOnly />
          </div>
          <div className="col-6">
            <label htmlFor="people">인원선택</label>
            <select
              className="form-control"
              onChange={costChange}
              ref={numberOfPeopleRef}
              name=""
              id=""
            >
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
            <input
              ref={costRef}
              type="text"
              className="form-control"
              value="45,000원"
              readOnly
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="resname">예약자 성함</label>
            <input ref={nameRef} type="text" className="form-control" />
          </div>
          <div className="col-6">
            <label htmlFor="">연락처</label>
            <input
              ref={phoneRef}
              type="text"
              className="form-control"
              placholeder=" '-'없이 숫자만 입력해주세요."
            />
          </div>
        </div>

        <button
          style={{ marginLeft: "45%" }}
          className="btn btn-outline-info"
          onClick={uploadReservationState}
        >
          온라인 예약하기
        </button>
      </Container>
    </>
  );
};
export default EscapeReservationDetail;
