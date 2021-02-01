import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import styles from "./notice.module.css";
import { useHistory } from "react-router-dom";
import PaginationComponent from "../components/pagination/pagination";

const EscapeNotice = ({ EscapeApi, state, setBranch }) => {
  const [pageInfo, setPageInfo] = useState({});
  const [contents, setContents] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const history = useHistory();

  const submitButton = useRef();
  const searchinputRef = useRef();
  const searchSelectRef = useRef();

  const onClickBranch = (e) => {
    setBranch(e.target.innerText);
  };

  const getPage = useCallback(
    (pageNum = 1) => {
      console.log(state.branch, pageNum);
      const getData = EscapeApi.getNoticePageNumber(state.branch, pageNum);
      if (getData === false) {
        alert("서버 에러");
        return;
      }
      getData.then((res) => {
        if (res.status !== 200) {
          alert(`페이지 에러${res.status}`);
          return;
        }
        setPageInfo({
          pageNum: res.data.pageNum,
          startPageNum: res.data.startPageNum,
          totalPageCount: res.data.totalPageCount,
          endPageNum: res.data.endPageNum,
        });
      });
    },
    [EscapeApi]
  );

  const onContentClick = (event) => {
    const num = event.target.dataset.num;
    const response = EscapeApi.getNoticeBoardContent(num);
    response.then((res) => {
      if (!!!res) {
        return;
      }
      if (res.status === 200) {
        const data = res.data.list;
        history.push({
          pathname: "/reviewDetail",
          state: {
            num: num,
            writer: data.writer,
            title: data.title,
            content: data.content,
            regdate: data.regdate,
            viewcount: data.viewCount,
            destination: "notice",
          },
        });
      }
    });
  };
  const getPageContext = useCallback(
    (pageNum = 1) => {
      const getData = EscapeApi.getNoticeList(state.branch, pageNum);
      if (getData === false) {
        alert("서버 에러");
        return;
      }
      getData.then((res) => {
        if (res.status !== 200) {
          alert(`페이지 에러${res.status}`);
          return;
        }
        setContents([...res.data]);
      });
    },
    [EscapeApi]
  );
  useEffect(() => {
    getPage();
  }, [getPage]);

  // useEffect(() => {
  //   const result = EscapeApi.getNoticeList("홍대점", 1);
  //   result.then((res) => {
  //     if (res.status === 200) {
  //       setContents([...res.data]);
  //     }
  //   });
  // }, [EscapeApi]);
  useEffect(() => {
    //페이지번호를 기준으로 내용을 가져온다.
    getPageContext(pageInfo.pageNum);
  }, [pageInfo, getPageContext]);

  return (
    <>
      <Container>
        <div className="row mt-5">
          <h1>
            공지사항 - <h3>{state.branch}</h3>
          </h1>
        </div>
        <div className="row d-flex justify-content-between mt-5">
          <div>
            <span className="text-info">로그인</span>
          </div>
          <div className={styles.branch}>
            <span onClick={onClickBranch} className="text-success">
              홍대점
            </span>
            <span onClick={onClickBranch} className="text-success">
              대구점
            </span>
            <span onClick={onClickBranch} className="text-success">
              인천구월점
            </span>
            <span onClick={onClickBranch} className="text-success">
              전주점
            </span>
            <span onClick={onClickBranch} className="text-success">
              잠실점
            </span>
            <span onClick={onClickBranch} className="text-success">
              대전두산점
            </span>
            <span onClick={onClickBranch} className="text-success">
              천호점
            </span>
            <span onClick={onClickBranch} className="text-success">
              수유점
            </span>
          </div>
        </div>
        <div className="row d-flex justify-content-between align-items-center mb-2 mt-5">
          <div>
            <form>
              <label htmlFor="condition">검색조건</label>
              <select ref={searchSelectRef} name="condition" id="condition">
                <option value="title_content">제목+내용</option>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
              </select>
              <input
                ref={searchinputRef}
                name="keyword"
                type="text"
                placeholder="검색어..."
              />
              <button ref={submitButton}>검색</button>
            </form>
          </div>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => {
                history.push({
                  pathname: "/reviewWrite",
                  state: {
                    set: "글작성",
                    mode: "admin",
                  },
                });
              }}
            >
              글작성
            </Button>
          </div>
        </div>
        <div className="row mt-5">
          <Table borderless>
            <thead>
              <tr>
                <th className={styles.w10}>번호</th>
                <th className={styles.w50}>제목</th>
                <th className={styles.w10}>작성자</th>
                <th className={styles.w10}>날짜</th>
                <th className={styles.w10}>조회</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((item) => {
                if (state.branch === item.branch) {
                  return (
                    <>
                      <tr>
                        <td className={styles.w10}>{item.num}</td>
                        <td className={styles.w50}>
                          <span
                            data-num={item.num}
                            onClick={onContentClick}
                            className={"text-success"}
                          >
                            {item.title}
                          </span>
                        </td>
                        <td className={styles.w10}>{item.writer}</td>
                        <td className={styles.w10}>{item.regdate}</td>
                        <td className={styles.w10}>{item.viewCount}</td>
                      </tr>
                    </>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
        <div className={`${styles.font} row`}>
          <PaginationComponent
            setPageInfo={setPageInfo}
            pageInfo={pageInfo}
            getPage={getPage}
          ></PaginationComponent>
        </div>
      </Container>
    </>
  );
};

export default EscapeNotice;
