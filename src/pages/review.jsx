import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Button, Table } from "react-bootstrap";
import styles from "./review.module.css";
import PaginationComponent from "../components/pagination/pagination.jsx";
import { useHistory } from "react-router-dom";

const EscapeReview = ({ EscapeApi }) => {
  const [pageInfo, setPageInfo] = useState({});
  const [contents, setContents] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const history = useHistory();

  const getPage = useCallback(
    (pageNum = 1) => {
      const getData = EscapeApi.getReviewPageNumber(pageNum);
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
  const getPageSearch = useCallback(() => {
    const getData = EscapeApi.getReviewPageCondition(
      searchSelectRef.current.value,
      searchinputRef.current.value
    );
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
  }, [EscapeApi]);

  const getPageContext = useCallback(
    (pageNum = 1) => {
      const getData = EscapeApi.getReviewPageList(pageNum);
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
  const getPageContextCondition = useCallback(
    (pageNum = 1, condition, keyword) => {
      const getData = EscapeApi.getReviewSearchPageList(pageNum, condition, keyword);
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

  const onContentClick = (event) => {
    const num = event.target.dataset.num;
    const response = EscapeApi.getReviewBoardContent(num);
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
            viewcount: data.viewcount,
            destination: "review",
          },
        });
      }
    });
  };

  const onSearch = useCallback(
    (event) => {
      event.preventDefault();
      searchinputRef.current.value === "" ? setSearchFlag(false) : setSearchFlag(true);
      const getData = EscapeApi.getReviewSearchPageList(
        pageInfo.pageNum,
        searchSelectRef.current.value,
        searchinputRef.current.value
      );
      if (getData === false) {
        alert("서버 에러");
        return;
      }
      getData.then((res) => {
        // 페이지정보를 가져옴
        getPageSearch();
        if (res.status !== 200) {
          alert(`페이지 에러${res.status}`);
          return;
        }
        //받은 목록들을 set함.
        setContents([...res.data]);
      });
    },
    [EscapeApi]
  );

  useEffect(() => {
    getPage();
  }, [getPage]);

  useEffect(() => {
    //페이지번호를 기준으로 내용을 가져온다.
    searchFlag === true
      ? getPageContextCondition(
          pageInfo.pageNum,
          searchSelectRef.current.value,
          searchinputRef.current.value
        )
      : getPageContext(pageInfo.pageNum);
  }, [pageInfo, getPageContext]);

  const submitButton = useRef();
  const searchinputRef = useRef();
  const searchSelectRef = useRef();

  return (
    <>
      <Container>
        <div className="row mt-5">
          <h1>이용후기</h1>
        </div>
        <div className="row d-flex justify-content-between align-items-center mb-2">
          <div>
            <form>
              <label for="condition">검색조건</label>
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
              <button ref={submitButton} onClick={onSearch}>
                검색
              </button>
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
                    mode: "user",
                  },
                });
              }}
            >
              글작성
              {/* <Link to="reviewWrite">글작성</Link> */}
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
              {contents.map((item) => (
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
                    <td className={styles.w10}>{item.viewcount}</td>
                  </tr>
                </>
              ))}
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

export default EscapeReview;
