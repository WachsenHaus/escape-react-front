/*global kakao*/
import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import styles from "./info.module.css";

const EscapeInfo = ({ branchData, kakaoConfig, state, setBranch }) => {
  const onClick = (event) => {
    setBranch(event.target.innerText);
  };

  const selectedBranch = branchData[`${state.branch}`];
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoConfig.apiKey}&libraries=services&autoload=false`;

    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps &&
        kakao.maps.load(() => {
          console.log(kakao.maps);
          const x = 37.553419;
          const y = 126.920605;
          let context = `<div style="padding:5px;">
              <button id="closeBtn" class="${styles.closeButton}" >
                x
              </button>
              <h1 class="mt-1">
                <span class="badge badge-info">ACORN 이스케이프 홍대점</span>
              </h1>
              <br/>
                <img class="avatar"  src="../resources/images/unnamed.png" />
              <br/>
              <h5 class="text-center" style="color:black;">
                지금 바로 탈출해 보세요!
              </h5> 
            </div>`;

          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(x, y),
            draggable: false,
            level: 3,
          };
          const map = new kakao.maps.Map(container, options);
          map.setDraggable(true);
          const zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
          const markerPosition = new kakao.maps.LatLng(x, y);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);

          const iwContent = context, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwPosition = new kakao.maps.LatLng(x, y); //인포윈도우 표시 위치입니다

          const infowindow = new kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwContent,
          });

          infowindow.open(map, marker);
          const closeBtn = document.querySelector("#closeBtn");
          closeBtn &&
            closeBtn.addEventListener("click", () => {
              infowindow.close();
            });
        });
    };
  }, []);
  return (
    <>
      <Container>
        <h1 className="text-center">오시는길</h1>
        <div className={`${styles.branch}`}>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            홍대점
          </p>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            대구점
          </p>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            인천구월점
          </p>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            전주점
          </p>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            잠실점
          </p>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            대전둔산점
          </p>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            천호점
          </p>
          <p onClick={onClick} className={`text-success ${styles.link}`}>
            수유점
          </p>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 col-md-6 col-xs-12 circle_padding my-5">
            <div
              id={"map"}
              style={{
                width: "100%",
                height: "500px",
              }}
            ></div>
          </div>
          <div className="col-sm-6 col-md-6 col-xs-12 my-5">
            <div>
              <h4>{state.branch}</h4>
              <Table responsive>
                <tbody>
                  <tr>
                    <td>주소</td>
                    <td>:</td>
                    <td>{selectedBranch.주소}</td>
                  </tr>
                  <tr>
                    <td>연락처</td>
                    <td>:</td>
                    <td>{selectedBranch.연락처}</td>
                  </tr>
                  <tr>
                    <td>영업시간</td>
                    <td>:</td>
                    <td>
                      {selectedBranch.영업시간[0] && selectedBranch.영업시간[0]}
                      {selectedBranch.영업시간[1] && (
                        <>
                          <br></br>
                          {selectedBranch.영업시간[1]}
                        </>
                      )}
                      {selectedBranch.영업시간[2] && (
                        <>
                          <br></br>
                          {selectedBranch.영업시간[2]}
                        </>
                      )}
                      {selectedBranch.영업시간[3] && (
                        <>
                          <br></br>
                          {selectedBranch.영업시간[3]}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h4>주변지하철</h4>
              <Table responsive>
                <tbody>
                  <tr>
                    {selectedBranch.지하철[0] && <>{selectedBranch.지하철[0]}</>}
                    {selectedBranch.지하철[1] && (
                      <>
                        <br></br>
                        {selectedBranch.지하철[1]}
                      </>
                    )}
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h4>버스정류장</h4>
              <Table responsive>
                <tbody>
                  {selectedBranch.버스 &&
                    selectedBranch.버스.map((item) => (
                      <>
                        <tr>
                          <td>
                            {item.정류장이름} : {item.정류장번호}
                          </td>
                          <td>
                            {Object.keys(item).includes("간선") ? (
                              <>
                                <span className="badge badge-info">간선</span>
                                {item["간선"].join(",")}
                              </>
                            ) : (
                              <></>
                            )}
                            {Object.keys(item).includes("지선") ? (
                              <>
                                <br></br>
                                <span className="badge badge-danger">지선</span>
                                {item["지선"].join(",")}
                              </>
                            ) : (
                              <></>
                            )}
                            {Object.keys(item).includes("급행") ? (
                              <>
                                <br></br>
                                <span className="badge badge-success">급행</span>
                                {item["급행"].join(",")}
                              </>
                            ) : (
                              <></>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default EscapeInfo;
