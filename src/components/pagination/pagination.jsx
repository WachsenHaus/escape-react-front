import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import styles from "./pagination.module.css";

const PaginationComponent = ({ getPage, pageInfo, setPageInfo }) => {
  const [pages, setPages] = useState([]);

  const onClickPage = (event) => {
    if (pageInfo.pageNum === parseInt(event.target.innerText)) {
      return;
    }
    getPage(event.target.innerText);
  };
  const onNextPage = () => {
    getPage(pageInfo.endPageNum + 1);
  };
  const onPrevPage = () => {
    getPage(pageInfo.startPageNum - 1);
  };

  useEffect(() => {
    let active = pageInfo.pageNum;
    const mItem = [];
    for (let i = pageInfo.startPageNum; i <= pageInfo.endPageNum; i++) {
      mItem.push(
        <Pagination.Item
          className={styles.list}
          key={i}
          active={i === active}
          onClick={onClickPage}
        >
          {i}
        </Pagination.Item>
      );
    }
    setPages([...mItem]);
  }, [pageInfo]);

  return (
    <>
      <Pagination>
        {pageInfo.startPageNum !== 1 ? (
          <Pagination.Prev className={styles.list} onClick={onPrevPage} />
        ) : null}
        {pages}
        {pageInfo.endPageNum < pageInfo.totalPageCount ? (
          <Pagination.Next className={styles.list} onClick={onNextPage} />
        ) : null}
      </Pagination>
    </>
  );
};
export default PaginationComponent;
