import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
const EscapeReservationDetail = ({ EscapeApi, Regex }) => {
  const historyState = useLocation().state;
  const history = useHistory();
  const DID_NOT_TYPING = "";

  const [state, setState] = useState(
    historyState && {
      date: historyState.date,
      time: historyState.time,
      thema: historyState.thema,
      branch: historyState.branch,
      // }
    }
  );
  const [inputState, setInputState] = useState({
    name: DID_NOT_TYPING,
    nameSucceed: DID_NOT_TYPING,
    phone: DID_NOT_TYPING,
    phoneSucceed: DID_NOT_TYPING,
    checkNumber: DID_NOT_TYPING,
    checkNumberSucceed: DID_NOT_TYPING,
  });
  const numberOfPeopleRef = useRef();
  const costRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {}, []);

  const uploadReservationState = () => {
    if (!(inputState.nameSucceed && inputState.phoneSucceed)) {
      alert("값이 올바르지 않습니다.");
      return;
    }

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
  const onChange = useCallback((event) => {
    let func;
    if (event.target.name === "name") {
      func = Regex.checkHangleName;
    } else if (event.target.name === "phone") {
      func = Regex.checkNonHipenPhoneNumber;
    } else if (event.target.name === "checkNumber") {
      func = Regex.checkDigitNumber;
    }
    if (event.target.value !== DID_NOT_TYPING) {
      func(event.target) === false
        ? setInputState((state) => {
            const updated = { ...state };
            updated[`${event.target.name}`] = event.target.value;
            updated[`${event.target.name}Succeed`] = false;
            return updated;
          })
        : setInputState((state) => {
            const updated = { ...state };
            updated[`${event.target.name}`] = event.target.value;
            updated[`${event.target.name}Succeed`] = true;
            return updated;
          });
    }
    if (event.target.value === DID_NOT_TYPING) {
      setInputState((state) => {
        const updated = { ...state };
        updated[`${event.target.name}`] = DID_NOT_TYPING;
        updated[`${event.target.name}Succeed`] = DID_NOT_TYPING;
        return updated;
      });
    }
  });

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
            {/* <input ref={nameRef} type="text" className="form-control" /> */}
            <Form.Group>
              <Form.Control
                name={"name"}
                ref={nameRef}
                onChange={onChange}
                placeholder="예약자 성함"
                aria-label="Username"
                isInvalid={
                  inputState.name !== DID_NOT_TYPING ? !!!inputState.nameSucceed : ""
                }
                isValid={
                  inputState.name !== DID_NOT_TYPING ? !!inputState.nameSucceed : ""
                }
              />
            </Form.Group>
          </div>
          <div className="col-6">
            <label htmlFor="">연락처</label>
            {/* <input
              ref={phoneRef}
              type="text"
              className="form-control"
              placholeder=" '-'없이 숫자만 입력해주세요."
            /> */}
            <Form.Group>
              <Form.Control
                ref={phoneRef}
                name={"phone"}
                onChange={onChange}
                placeholder="연락처"
                aria-label="UserPhone"
                isInvalid={
                  inputState.phone !== DID_NOT_TYPING ? !!!inputState.phoneSucceed : ""
                }
                isValid={
                  inputState.phone !== DID_NOT_TYPING ? !!inputState.phoneSucceed : ""
                }
              />
            </Form.Group>
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
