import React, { useRef, useCallback, useState } from "react";
import { Container, Form, Table, Button } from "react-bootstrap";

const EscapeConfirm = ({ Regex }) => {
  const DID_NOT_TYPING = "";
  const SOMETHING_TYPING = true;

  const [inputState, setInputState] = useState({
    name: DID_NOT_TYPING,
    nameSucceed: DID_NOT_TYPING,
    phone: DID_NOT_TYPING,
    phoneSucceed: DID_NOT_TYPING,
    checkNumber: DID_NOT_TYPING,
    checkNumberSucceed: DID_NOT_TYPING,
  });
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
            updated[`${event.target.name}`] = SOMETHING_TYPING;
            updated[`${event.target.name}Succeed`] = false;
            return updated;
          })
        : setInputState((state) => {
            const updated = { ...state };
            updated[`${event.target.name}`] = SOMETHING_TYPING;
            updated[`${event.target.name}Succeed`] = true;
            console.log(updated);
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
              <Button className="mx-2" size="lg" variant="primary">
                예약 확인
              </Button>
              <Button className="mx-2" size="lg" variant="danger">
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
