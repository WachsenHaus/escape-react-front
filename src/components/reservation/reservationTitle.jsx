import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./title.module.css";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const EscapeReservationTitle = ({
  state,
  setBranch,
  setDate,
  setOwnedThemes,
  EscapeApi,
  timezoneDate,
}) => {
  const history = useHistory();
  const selectedBranch = useRef();
  const selectedTheme = useRef();
  const selectedDate = useRef();
  const [maxDay, setMaxDay] = useState();
  const [minDay, setMinDay] = useState();
  const [themaList, setThemaList] = useState();
  //오늘로부터 2개월뒤까지만 달력에 표시함
  const calcMaxDay = () => {
    let today = new Date();
    let yyyy = today.getFullYear();
    let dd = today.getDate();
    let mm = today.getMonth() + 2; //January is 0!

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (mm > 12) {
      mm = mm % 12;
      yyyy += 1;
      if (mm < 10) {
        mm = "0" + mm;
      }
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const getOwnedBranchSchedule = useCallback(() => {
    const getData = EscapeApi.getReservation(
      state.branch,
      selectedTheme.current.value,
      state.date
    );
    getData.then((res) => {
      setThemaList(res.data.list);
    });
  }, [EscapeApi, state.branch, state.date]);

  useEffect(() => {
    if (!!!state.branch) {
      setOwnedThemes("홍대점");
    }
    getOwnedBranchSchedule();
  }, [EscapeApi, getOwnedBranchSchedule, setOwnedThemes, state.branch, state.date]);

  useEffect(() => {
    setMinDay(timezoneDate.toISOString().split("T")[0]);
    setMaxDay(calcMaxDay());
  }, []);

  const onChangeBranch = useCallback(() => {
    const DEFAULT = "total";
    selectedTheme.current.value = DEFAULT;
    setOwnedThemes(selectedBranch.current.value);
  }, []);
  const onChangeDate = () => {
    setDate(selectedDate.current.value);
  };
  return (
    <>
      <Container>
        <h1 className="text-center branch__tag">{state.branch} 예약하기</h1>
        <div className="form-group row">
          <div className="col-4">
            <label htmlFor="">날짜선택</label>
            <input
              ref={selectedDate}
              onChange={onChangeDate}
              className={`form-control ${styles.fontsize}`}
              type="date"
              value={state.date}
              min={minDay}
              max={maxDay}
            />
          </div>
          <div className="col-4">
            <label htmlFor="">지점선택</label>
            <select
              onChange={onChangeBranch}
              ref={selectedBranch}
              value={state.branch}
              name=""
              id=""
              className={`form-control ${styles.fontsize}`}
            >
              <option value="홍대점">홍대점</option>
              <option value="대구점">대구점</option>
              <option value="인천구월점">인천구월점</option>
              <option value="전주점">전주점</option>
              <option value="잠실점">잠실점</option>
              <option value="대전둔산점">대전둔산점</option>
              <option value="천호점">천호점</option>
              <option value="수유점">수유점</option>
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="">테마</label>
            <select
              name=""
              ref={selectedTheme}
              onChange={getOwnedBranchSchedule}
              className={`form-control ${styles.fontsize}`}
            >
              <option value={"total"}>전체테마</option>
              {state.ownedThemes.map((item, index) => (
                <option value={item.title} key={`thema_${index}`}>
                  {item.title} {item.level}
                </option>
              ))}
            </select>
          </div>
          <Table striped className={`${styles.borderless} mt-3`} borderless>
            <thead>
              <tr className="row">
                <th className="col-3 text-center">시간</th>
                <th className="col-6 text-center">테마</th>
                <th className="col-3 text-center">예약</th>
              </tr>
            </thead>
            <tbody>
              {themaList &&
                themaList.map((item, index) => {
                  return (
                    <tr className="row" key={`themaItem_${index}`}>
                      <td className="col-3 text-center">{item.time}</td>
                      <td className="col-6 text-center">{item.thema}</td>
                      {item.state === "매진" && (
                        <td className="col-3 text-center">
                          <span className="badge badge-danger">{item.state}</span>
                        </td>
                      )}
                      {item.state === "예약진행중" && (
                        <td className="col-3 text-center">
                          <span className="badge badge-warning">{item.state}</span>
                        </td>
                      )}
                      {item.state === "예약하기" && (
                        <td className="col-3 text-center">
                          <button
                            className="badge badge-info"
                            onClick={() => {
                              history.push({
                                pathname: "/reservation-detail",
                                state: {
                                  date: state.date,
                                  time: item.time,
                                  thema: item.thema,
                                  branch: state.branch,
                                },
                              });
                            }}
                          >
                            {item.state}
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <Button variant="primary" style={{ marginLeft: "85%" }}>
            예약취소
          </Button>
        </div>
      </Container>
    </>
  );
};
export default EscapeReservationTitle;
