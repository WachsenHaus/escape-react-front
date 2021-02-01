import React, { useState, useEffect, useRef } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import styles_ckeditor from "./content-styles.css";
import styles from "./reviewWrite.module.css";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import Autosave from "@ckeditor/ckeditor5-autosave/src/autosave.js";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder.js";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js";
import ExportToPDF from "@ckeditor/ckeditor5-export-pdf/src/exportpdf.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily.js";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters.js";
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";

const EditorReview = ({ EscapeApi }) => {
  const historyState = useLocation().state;
  const [state, setState] = useState({
    data: "<p>다른 사용자를 위해 테마 내용은 지양해주세요</p>",
  });
  const writerRef = useRef();
  const pwdRef = useRef();
  const titleRef = useRef();
  const editorRef = useRef();
  const branchRef = useRef();
  const history = useHistory();
  const [mode, setMode] = useState(
    historyState && {
      content: historyState.content,
      num: historyState.num,
      regdate: historyState.regdate,
      title: historyState.title,
      view: historyState.view,
      writer: historyState.writer,
      set: historyState.set,
      pwd: historyState.pwd,
      mode: historyState.mode,
    }
  );
  useEffect(() => {
    if (!!mode.content) {
      setState({ data: mode.content });
    }
  }, []);

  const installedPlugins = [
    Alignment,
    Autoformat,
    Autosave,
    BlockQuote,
    Bold,
    CKFinder,
    CKFinderUploadAdapter,
    Essentials,
    ExportToPDF,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    HorizontalLine,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Strikethrough,
    Table,
    TableToolbar,
    TextTransformation,
    Underline,
  ];

  const onChangeEditor = (event, editor) => {
    setState((v) => {
      const updated = { ...v };
      updated["data"] = editor.getData();
      return updated;
    });
  };

  const onClickWriteButton = () => {
    if (mode.mode === "user") {
      const writer = writerRef.current.value;
      const pwd = pwdRef.current.value;
      const title = titleRef.current.value;
      const content = state.data;
      const response = EscapeApi.sendBoard(writer, pwd, title, content);

      response.then((res) => {
        if (!!!res) return;
        if (res.status === 200) {
          if (res.data.success === "isSuccess") {
            history.push({
              pathname: "/review",
            });
          }
        } else if (res.status !== 200) {
          alert("글작성에 실패하였습니다.");
        }
      });
    } else {
      const branch = branchRef.current.value;
      const writer = writerRef.current.value;
      const title = titleRef.current.value;
      const content = state.data;
      const response = EscapeApi.sendNotice(branch, writer, title, content);

      response.then((res) => {
        if (!!!res) return;
        if (res.status === 200) {
          history.push({
            pathname: "/notice",
          });
        } else if (res.status !== 200) {
          alert("글작성에 실패하였습니다.");
        }
      });
    }
  };
  const onReviseClick = () => {
    const num = mode.num;
    const writer = writerRef.current.value;
    const pwd = mode.pwd;
    const title = titleRef.current.value;
    const content = state.data;
    const response = EscapeApi.updateBoard(num, writer, pwd, title, content);

    response.then((res) => {
      if (!!!res) return;
      if (res.status === 200) {
        if (res.data.result === true) {
          history.push({
            pathname: "/review",
          });
        } else {
          alert("비밀번호가 틀립니다.");
        }
      } else if (res.status !== 200) {
        alert("글수정에 실패하였습니다.");
      }
    });
  };
  return (
    <>
      <Container>
        <div>
          <br></br>
          {mode.set === "글작성" ? (
            <>{mode.mode === "user" ? <h1>글쓰기</h1> : <h1>공지사항 작성</h1>}</>
          ) : (
            <h1>글수정</h1>
          )}
          <form>
            {mode.mode === "admin" ? (
              <>
                <div className="form-group">
                  <label className="mr-3">지점 선택</label>
                  <select ref={branchRef}>
                    <option value="천호점">천호점</option>
                    <option value="대구점">대구점</option>
                    <option value="대전두산점">대전두산점</option>
                    <option value="홍대점">홍대점</option>
                    <option value="인천구월점">인천구월점</option>
                    <option value="잠실점">잠실점</option>
                    <option value="전주점">전주점</option>
                    <option value="수유점">수유점</option>
                  </select>
                </div>
              </>
            ) : null}

            <div className="form-group">
              <label for="writer">이름</label>
              {mode.set === "글작성" ? (
                <>
                  {mode.mode === "user" ? (
                    <input
                      ref={writerRef}
                      className={"form-control"}
                      name="writer"
                    ></input>
                  ) : (
                    <input
                      ref={writerRef}
                      className={"form-control"}
                      name="writer"
                      value="admin"
                      readOnly={true}
                    ></input>
                  )}
                </>
              ) : (
                <input
                  ref={writerRef}
                  className={"form-control"}
                  name="writer"
                  readOnly={true}
                  value={mode.writer}
                ></input>
              )}
            </div>
            <div className="form-group">
              {mode.set === "글작성" ? (
                <>
                  {mode.mode === "user" ? (
                    <>
                      <label for="pwd">비밀번호</label>
                      <input
                        ref={pwdRef}
                        className={"form-control"}
                        type="password"
                        name="pwd"
                      ></input>
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
            <div className="form-group">
              <label for="title">제목</label>
              {mode.set === "글작성" ? (
                <input ref={titleRef} className={"form-control"} name="title"></input>
              ) : (
                <input
                  ref={titleRef}
                  className={"form-control"}
                  name="title"
                  defaultValue={mode.title}
                ></input>
              )}
            </div>
            <div className="form-group">
              <label for="content">내용</label>
            </div>

            <CKEditor
              name="content"
              ref={editorRef}
              editor={ClassicEditor}
              config={{
                plugins: [...installedPlugins],
                ckfinder: {
                  uploadUrl: "http://localhost:8888/escape/review/imgUpload.do",
                },
                toolbar: [
                  "fontFamily",
                  "fontSize",
                  "fontColor",
                  "alignment",
                  "|",
                  "bold",
                  "italic",
                  "strikethrough",
                  "underline",
                  "specialCharacters",
                  "horizontalLine",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "indent",
                  "outdent",
                  "|",
                  "link",
                  "blockQuote",
                  "imageUpload",
                  "mediaEmbed",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data={state.data}
              onChange={onChangeEditor}
            />
          </form>
        </div>
        <div className="d-flex justify-content-center my-5">
          {mode.set === "글작성" ? (
            <Button onClick={onClickWriteButton}>글쓰기</Button>
          ) : (
            <Button onClick={onReviseClick}>글수정</Button>
          )}
        </div>
      </Container>
    </>
  );
};
export default EditorReview;
