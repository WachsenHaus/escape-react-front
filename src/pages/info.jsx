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
          let x = 37.553419;
          let y = 126.920605;
          switch (state.branch) {
            case "홍대점":
              x = 37.553419;
              y = 126.920605;
              break;
            case "대구점":
              x = 37.553419;
              y = 126.920605;
              break;
            case "인천구월점":
              x = 37.444135;
              y = 126.702761;
              break;
            case "전주점":
              x = 35.8156;
              y = 127.110433;
              break;
            case "잠실점":
              x = 37.51077;
              y = 127.079955;
              break;
            case "대전둔산점":
              x = 36.35069;
              y = 127.374909;
              break;
            case "천호점":
              x = 37.53862;
              y = 127.127454;
              break;
            case "수유점":
              x = 37.638344;
              y = 127.02485;
              break;
            default:
              break;
          }
          let context = `<div style="padding:5px;">
              <button id="closeBtn" class="${styles.closeButton}" >
                x
              </button>
              <h3 class="mt-3">
                <span class="badge badge-info">ACORN 이스케이프 ${state.branch}</span>
              </h3>
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
  }, [state]);
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
              <h4 style={{ color: "red" }}>{state.branch}</h4>

              <Table responsive className={`${styles.borderless}`} borderless={true}>
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
              <h4>주변 지하철</h4>
              <Table responsive className={`${styles.borderless}`} borderless={true}>
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
              {selectedBranch.버스 && <h4>버스 정류장</h4>}
              <Table responsive className={`${styles.borderless}`} borderless={true}>
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
                            {Object.keys(item).includes("일반") ? (
                              <>
                                <br></br>
                                <span className="badge badge-success">급행</span>
                                {item["일반"].join(",")}
                              </>
                            ) : (
                              <></>
                            )}
                            {Object.keys(item).includes("공항") ? (
                              <>
                                <br></br>
                                <span className="badge badge-info">공항</span>
                                {item["공항"].join(",")}
                              </>
                            ) : (
                              <></>
                            )}
                            {Object.keys(item).includes("광역") ? (
                              <>
                                <br></br>
                                <span className="badge badge-warning">광역</span>
                                {item["광역"].join(",")}
                              </>
                            ) : (
                              <></>
                            )}
                            {Object.keys(item).includes("좌석") ? (
                              <>
                                <br></br>
                                <span className="badge badge-info">좌석</span>
                                {item["좌석"].join(",")}
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
