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
    checkNumbereSucceed: DID_NOT_TYPING,
  });
  const nameRef = useRef();
  const phoneRef = useRef();
  const checkNumberRef = useRef();
  const onNameChange = useCallback(() => {
    if (nameRef.current.value !== DID_NOT_TYPING) {
      Regex.checkHangleName(nameRef.current) === false
        ? setInputState((state) => {
            const updated = { ...state };
            updated["name"] = SOMETHING_TYPING;
            updated["nameSucceed"] = false;
            return updated;
          })
        : setInputState((state) => {
            const updated = { ...state };
            updated["name"] = SOMETHING_TYPING;
            updated["nameSucceed"] = true;
            return updated;
          });
    }
    if (nameRef.current.value === DID_NOT_TYPING) {
      setInputState((state) => {
        const updated = { ...state };
        updated["name"] = DID_NOT_TYPING;
        updated["nameSucceed"] = DID_NOT_TYPING;
        console.log(updated);
        return updated;
      });
    }
  }, [Regex, SOMETHING_TYPING]);
  const onPhoneChange = useCallback(() => {
    if (phoneRef.current.value !== DID_NOT_TYPING) {
      Regex.checkNonHipenPhoneNumber(phoneRef.current) === false
        ? setInputState((state) => {
            const updated = { ...state };
            updated["phone"] = SOMETHING_TYPING;
            updated["phoneSucceed"] = false;
            return updated;
          })
        : setInputState((state) => {
            const updated = { ...state };
            updated["phone"] = SOMETHING_TYPING;
            updated["phoneSucceed"] = true;
            return updated;
          });
    }
    if (phoneRef.current.value === DID_NOT_TYPING) {
      setInputState((state) => {
        const updated = { ...state };
        updated["phone"] = DID_NOT_TYPING;
        updated["phoneSucceed"] = DID_NOT_TYPING;
        console.log(updated);
        return updated;
      });
    }
  }, []);
  const onCheckNumberChange = useCallback(() => {
    if (checkNumberRef.current.value !== DID_NOT_TYPING) {
      Regex.checkDigitNumber(checkNumberRef.current) === false
        ? setInputState((state) => {
            const updated = { ...state };
            updated["checkNumber"] = SOMETHING_TYPING;
            updated["checkNumbereSucceed"] = false;
            return updated;
          })
        : setInputState((state) => {
            const updated = { ...state };
            updated["checkNumber"] = SOMETHING_TYPING;
            updated["checkNumbereSucceed"] = true;
            return updated;
          });
    }
    if (checkNumberRef.current.value === DID_NOT_TYPING) {
      setInputState((state) => {
        const updated = { ...state };
        updated["checkNumber"] = DID_NOT_TYPING;
        updated["checkNumbereSucceed"] = DID_NOT_TYPING;
        console.log(updated);
        return updated;
      });
    }
  }, []);
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
                        ref={nameRef}
                        onChange={onNameChange}
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
                        ref={phoneRef}
                        onChange={onPhoneChange}
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
                        ref={checkNumberRef}
                        onChange={onCheckNumberChange}
                        placeholder="예약확인번호"
                        aria-label="UserNumber"
                        isInvalid={
                          inputState.checkNumber !== DID_NOT_TYPING
                            ? !!!inputState.checkNumbereSucceed
                            : ""
                        }
                        isValid={
                          inputState.checkNumber !== DID_NOT_TYPING
                            ? !!inputState.checkNumbereSucceed
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
