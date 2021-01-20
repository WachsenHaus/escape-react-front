import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import styles from "./reviewWrite.module.css";
import styles from "./content-styles.css";
import { Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

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

const EditorReview = (props) => {
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

  return (
    <>
      <link rel="stylesheet" href="./content-styles.css" type="text/css"></link>
      <Container>
        <div>
          <CKEditor
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
            data="<p>다른 사용자를 위해 테마 내용은 지양해주세요</p>"
          />
        </div>
        <Button>글쓰기</Button>
      </Container>
    </>
  );
};
export default EditorReview;
