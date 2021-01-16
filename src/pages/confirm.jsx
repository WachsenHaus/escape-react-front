import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Spinner, Modal, Form, Table, Button } from "react-bootstrap";
import styles from "./confirm.module.css";

const EscapeConfirm = ({ EscapeApi, Regex }) => {
  const history = useHistory();
  const DID_NOT_TYPING = "";

  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState({
    name: DID_NOT_TYPING,
    nameSucceed: DID_NOT_TYPING,
    phone: DID_NOT_TYPING,
    phoneSucceed: DID_NOT_TYPING,
    checkNumber: DID_NOT_TYPING,
    checkNumberSucceed: DID_NOT_TYPING,
  });
  const onCheck = () => {
    if (
      !(
        inputState.checkNumberSucceed &&
        inputState.nameSucceed &&
        inputState.phoneSucceed
      )
    ) {
      alert("값이 올바르지 않습니다.");
      return;
    }
    setLoading(true);
    const getData = EscapeApi.getReservationStat(
      inputState.name,
      inputState.phone,
      inputState.checkNumber
    );
    if (getData === false) {
      alert("서버 에러");
      return;
    }
    getData.then((res) => {
      if (res.status !== 200) {
        alert(`예약 확인 에러${res.status}`);
        return;
      }
      //
      setLoading(false);
      const data = res.data.list[0];
      history.push({
        pathname: "/reservation-succeed",
        state: {
          bname: data.bname,
          thema: data.thema,
          numberOfPeople: data.personal,
          date: data.resdate,
          time: data.time,
          cost: data.cost,
          name: data.res_name,
          phone: data.phone,
          resNo: data.res_no,
        },
      });
    });
  };

  const onDelete = () => {
    if (
      !(
        inputState.checkNumberSucceed &&
        inputState.nameSucceed &&
        inputState.phoneSucceed
      )
    ) {
      alert("값이 올바르지 않습니다.");
      return;
    }
    setLoading(true);
    const getData = EscapeApi.deleteReservation(
      inputState.name,
      inputState.phone,
      inputState.checkNumber
    );
    if (getData === false) {
      alert("서버 에러");
      return;
    }
    getData.then((res) => {
      setLoading(false);
      if (res.status !== 200) {
        alert(`삭제 에러${res.status}`);
        return;
      }
      res.data.result === "true"
        ? alert("예약이 취소되었습니다.")
        : alert("해당 예약이 존재하지 않습니다.");
    });
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
      <Container>
        {loading && (
          <Modal
            centered={true}
            dialogClassName={`${styles.center} modal-90w`}
            contentClassName={styles.center}
            show={true}
          >
            <Spinner animation="border" />
          </Modal>
        )}
        <Form action="">
          <br />
          <br />
          <h3>예약 확인 / 취소</h3>
          <br />
          <br />
          <div className="row">
            <Table responsive hover className="text-center">
              <tbody>
                <tr>
                  <th className="text-center">예약자</th>
                  <td className="text-left">
                    <Form.Group>
                      <Form.Control
                        name={"name"}
                        onChange={onChange}
                        placeholder="예약자 성함"
                        aria-label="Username"
                        isInvalid={
                          inputState.name !== DID_NOT_TYPING
                            ? !!!inputState.nameSucceed
                            : ""
                        }
                        isValid={
                          inputState.name !== DID_NOT_TYPING
                            ? !!inputState.nameSucceed
                            : ""
                        }
                      />
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <th className="text-center">연락처</th>
                  <td className="text-left">
                    <Form.Group>
                      <Form.Control
                        name={"phone"}
                        onChange={onChange}
                        placeholder="연락처"
                        aria-label="UserPhone"
                        isInvalid={
                          inputState.phone !== DID_NOT_TYPING
                            ? !!!inputState.phoneSucceed
                            : ""
                        }
                        isValid={
                          inputState.phone !== DID_NOT_TYPING
                            ? !!inputState.phoneSucceed
                            : ""
                        }
                      />
                    </Form.Group>
                  </td>
                </tr>
                <tr>
                  <th className="text-center">예약확인번호</th>
                  <td className="text-left">
                    <Form.Group>
                      <Form.Control
                        name={"checkNumber"}
                        onChange={onChange}
                        placeholder="예약확인번호"
                        aria-label="UserNumber"
                        isInvalid={
                          inputState.checkNumber !== DID_NOT_TYPING
                            ? !!!inputState.checkNumberSucceed
                            : ""
                        }
                        isValid={
                          inputState.checkNumber !== DID_NOT_TYPING
                            ? !!inputState.checkNumberSucceed
                            : ""
                        }
                      />
                    </Form.Group>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-12 col-md-12 text-center">
              <Button className="mx-2" size="lg" variant="primary" onClick={onCheck}>
                예약 확인
              </Button>
              <Button className="mx-2" size="lg" variant="danger" onClick={onDelete}>
                예약 취소
              </Button>
            </div>
          </div>
        </Form>
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};
export default EscapeConfirm;
