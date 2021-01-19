import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ getPage, pageInfo, setPageInfo }) => {
  const [pages, setPages] = useState([]);

  const onClickPage = (event) => {
    if (pageInfo.pageNum === parseInt(event.target.innerText)) {
      return;
    }
    getPage(event.target.innerText);
  };

  useEffect(() => {
    console.log(pageInfo);
    let active = pageInfo.pageNum;
    const mItem = [];
    for (let i = pageInfo.startPageNum; i <= pageInfo.endPageNum; i++) {
      mItem.push(
        <Pagination.Item key={i} active={i === active} onClick={onClickPage}>
          {i}
        </Pagination.Item>
      );
    }
    console.log(mItem);
    setPages([...mItem]);
  }, [pageInfo]);

  return (
    <>
      <Pagination>{pages}</Pagination>
    </>
  );
};
export default PaginationComponent;
