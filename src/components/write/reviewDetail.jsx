import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import parse from "html-react-parser";
import styles from "./reviewDetail.module.css";

const EscapeBoardDetail = ({ EscapeApi }) => {
  const history = useHistory();
  const historyState = useLocation().state;
  const pwdRef = useRef();
  const [state, setState] = useState(
    historyState && {
      content: historyState.content,
      num: historyState.num,
      regdate: historyState.regdate,
      title: historyState.title,
      writer: historyState.writer,
      viewcount: historyState.viewcount || historyState.viewCount,
      destination: historyState.destination,
    }
  );

  const onChangeButton = (event) => {
    const response = EscapeApi.updateReviewContent(state.num, pwdRef.current.value);
    response.then((res) => {
      if (!!!res) {
        return;
      }
      if (res.status === 200) {
        history.push({
          pathname: "/reviewWrite",
          state: { ...res.data.list, set: "글수정", pwd: pwdRef.current.value },
        });
      }
    });
  };
  const onDeleteButton = (event) => {
    const response = EscapeApi.deleteReviewContent(state.num, pwdRef.current.value);
    response.then((res) => {
      if (!!!res) {
        return;
      }
      if (res.status === 200) {
        history.push({
          pathname: "/review",
        });
      }
    });
  };
  const onListButton = (event) => {
    if (state.destination === "notice") {
      history.push({
        pathname: "/notice",
      });
    } else if (state.destination === "review") {
      history.push({
        pathname: "/review",
      });
    }
  };

  return (
    <>
      <div>
        <form>
          <Container className={styles.border}>
            <div className="row my-2"></div>
            <h4 className="row my-5 px-4">{state.title}</h4>
            <div className="row px-4 d-flex justify-content-between align-items-center">
              <div>
                <div>
                  <label htmlFor="writer">작성자 : </label>
                  <span name="writer">{state.writer}</span>
                </div>
                <div>
                  <label htmlFor="regdate">작성일 : </label>
                  <span name="regdate">{state.regdate}</span>
                </div>
                <div>
                  <label htmlFor="viewcount">조회 : </label>
                  <span name="viewcount">{state.viewcount}</span>회
                </div>
              </div>
              <div>
                <Button onClick={onListButton}>목록보기</Button>
              </div>
            </div>
            <hr className="w-100 solid" />
            <div className="row px-4">
              <div
                className="contents"
                style={{
                  width: "100%",
                }}
              >
                {parse(state.content)}
              </div>
            </div>
            {state.destination === "review" ? (
              <>
                <div className="form-group">
                  <hr className={styles.solid} />
                  <input ref={pwdRef} type="password" placeholder="비밀번호" />
                  <hr className={styles.solid} />
                </div>
              </>
            ) : null}

            <div className={"pb-5"}>
              <Button variant="outline-warning" onClick={onChangeButton}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-pencil-square"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
                수정
              </Button>
              <Button variant="outline-danger" onClick={onDeleteButton}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-trash-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                  />
                </svg>
                삭제
              </Button>
            </div>
          </Container>
        </form>
      </div>
    </>
  );
};
export default EscapeBoardDetail;
