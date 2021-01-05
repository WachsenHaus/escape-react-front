import React from "react";

const EscapeFooter = (props) => {
  return (
    <>
      <footer className="bg-secondary">
        <div className="container py-5 ">
          <div className="row">
            <div className="col-md-5">
              <h4>CUBE ESCPAE</h4>
              <p className="m-0 mt-4 text-muted">상호 : 주식회사 00이스케이프 000</p>
              <p className="m-0 text-muted">주소 : 서울시 마포구 00동 000-00 00빌딩4층</p>
              <p className="m-0 text-muted">전화 : 02-000-0000,0000</p>
              <p className="m-0 text-muted">이메일 : naver@naver.com</p>
              <p className="m-0 text-muted">사업자 : 000-00-00000</p>
            </div>
            <div className="col-md-5">
              <h4>CUSTOMER</h4>
              <h2 className="text-warning">02-9999-8888</h2>
              <p className="m-0 mt-4 text-muted">일~목:10:00부터 ~ 23:45까지</p>
              <p className="m-0 text-muted">
                금/토/공휴일전날 10:00부터 ~ 익일 02:25까지
              </p>
            </div>
            <div className="col-md-2">
              <h4>SNS</h4>
              <a href="#" className="mr-2">
                <img src="/escape/resources/img/sns01.jpg" alt="" />
              </a>
              <a href="#">
                <img src="/escape/resources/img/sns02.jpg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default EscapeFooter;
