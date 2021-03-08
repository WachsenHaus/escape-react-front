import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./nav.module.css";

const EscapeNav = (props) => {
  const [isBrandClick, setIsBrandClick] = useState(false);

  const clickBrandButton = () => {
    setIsBrandClick(false);
  };
  return (
    <>
      <Navbar
        className="navbar-padding"
        // style={{ width: "100vw" }}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <LinkContainer className="ml-3 mr-3" to="/" onClick={clickBrandButton}>
            <Navbar.Brand className="navbar-brand">Choi Escape</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className={styles.toggle}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto ml-auto">
              <LinkContainer className="ml-3 mr-3" to="/info">
                <Nav.Link active={isBrandClick}>Escape</Nav.Link>
              </LinkContainer>
              <LinkContainer className="ml-3 mr-3" to="/theme">
                <Nav.Link active={isBrandClick}>테마</Nav.Link>
              </LinkContainer>
              <LinkContainer className="ml-3 mr-3" to="/reservation">
                <Nav.Link active={isBrandClick}>예약하기</Nav.Link>
              </LinkContainer>
              <LinkContainer className="ml-3 mr-3" to="/confirm">
                <Nav.Link active={isBrandClick}>예약확인/취소</Nav.Link>
              </LinkContainer>
              <LinkContainer className="ml-3 mr-3" to="/notice">
                <Nav.Link active={isBrandClick}>공지/이벤트</Nav.Link>
              </LinkContainer>
              <LinkContainer className="ml-3 mr-3" to="/mapinfo">
                <Nav.Link active={isBrandClick}>오시는길</Nav.Link>
              </LinkContainer>
              <LinkContainer className="ml-3 mr-3" to="/review">
                <Nav.Link active={isBrandClick}>후기게시판</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default EscapeNav;
