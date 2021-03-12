import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./login.module.css";
const Login = ({ EscapeApi }) => {
  const idRef = useRef();
  const pwdRef = useRef();
  const history = useHistory();
  const onLoginClick = (event) => {
    const id = idRef.current.value;
    const pwd = pwdRef.current.value;

    const getData = EscapeApi.tryLogin(id, pwd);
    if (getData === false) {
      alert("서버 에러");
      return;
    }
    getData.then((res) => {
      if (res.data.success !== "isFail") {
        sessionStorage.setItem("id", res.data.success);

        history.push({
          pathname: "/notice",
        });
      } else {
        alert("입력하신 정보가 다릅니다.");
      }
    });
  };
  return (
    <>
      <main>
        <div className="container text-center">
          <div className="login_form">
            <h1>Admin Login page</h1>
            <form action="">
              <div className="form-group text-cn">
                <label htmlFor="aid">아이디</label>
                <input
                  ref={idRef}
                  type="text"
                  className="from-control mx-auto col-3"
                  name="id"
                ></input>
              </div>
              <div className="form-group text-cn">
                <label htmlFor="apwd">비밀번호</label>
                <input
                  ref={pwdRef}
                  type="password"
                  className="from-control mx-auto col-3"
                  name="apwd"
                ></input>
              </div>
              <Button onClick={onLoginClick}>로그인</Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
