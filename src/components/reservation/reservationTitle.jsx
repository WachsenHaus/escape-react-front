import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";

const EscapeReservationTitle = ({
  state,
  setBranch,
  setDate,
  setOwnedThemes,
  EscapeApi,
}) => {
  const selectedBranch = useRef();
  const selectedTheme = useRef();
  const selectedDate = useRef();
  const [test, setTest] = useState();
  //오늘로부터 2개월뒤까지만 달력에 표시함
  const maxDay = () => {
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

  const ttt = () => {
    const a = EscapeApi.getReservation(
      state.branch,
      selectedTheme.current.value,
      state.date
    );
    console.log(a);
  };

  useEffect(() => {
    if (!!!state.branch) {
      setOwnedThemes("홍대점");
    }
  }, [EscapeApi, setOwnedThemes, state.branch, state.date]);

  useEffect(() => {
    setTest(maxDay());
  }, []);
  const onChangeBranch = () => {
    setOwnedThemes(selectedBranch.current.value);
  };
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
              className="form-control"
              type="date"
              value={state.date}
              min={new Date().toISOString().split("T")[0]}
              max={test}
            />
          </div>
          <div className="col-4">
            <label htmlFor="">지점선택</label>
            <select
              onChange={onChangeBranch}
              ref={selectedBranch}
              name=""
              id=""
              className="form-control"
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
            <select name="" ref={selectedTheme} onChange={ttt} className="form-control">
              {state.ownedThemes.map((item) => (
                <option value={item.title}>
                  {item.title} {item.level}
                </option>
              ))}
            </select>
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
