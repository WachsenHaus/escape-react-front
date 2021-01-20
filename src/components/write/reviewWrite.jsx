import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

const EditorReview = (props) => {
  return (
    <>
      <Container>
        <CKEditor
          style={{ color: "black" }}
          editor={ClassicEditor}
          config={{
            plugins: [Paragraph, Bold, Italic, Essentials],
            toolbar: ["bold", "italic"],
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </Container>
    </>
  );
};
export default EditorReview;
