import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Button, Table } from "react-bootstrap";
import styles from "./review.module.css";
import PaginationComponent from "../components/pagination/pagination.jsx";

const EscapeReview = ({ EscapeApi }) => {
  const [pageInfo, setPageInfo] = useState({
    pageNum: 1,
    startPageNum: 0,
    totalPageCount: 0,
    endPageNum: 0,
  });

  const getPage = useCallback(
    (pageNum = 1) => {
      console.log(pageNum);
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
        console.log(res.data);
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

  useEffect(() => {
    getPage();
  }, [getPage]);

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
              <button ref={submitButton}>검색</button>
            </form>
          </div>
          <div>
            <Button variant="outline-primary">글작성</Button>
          </div>
        </div>
        <div className="row mt-5">
          <Table>
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
              <td className={styles.w10}>1</td>
              <td className={styles.w50}>2</td>
              <td className={styles.w10}>3</td>
              <td className={styles.w10}>4</td>
              <td className={styles.w10}>5</td>
            </tbody>
          </Table>
        </div>

        <div className={`${styles.font} text-center row`}>
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
