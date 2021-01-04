import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

const EscapeNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="navbar-padding" color="dark" dark expand="lg">
        <Container>
          <NavbarBrand tag={Link} to="/">
            Choi Escape
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto mr-auto" navbar>
              <NavItem className="ml-3 mr-3">
                <NavLink tag={Link} to="/info">
                  Escape
                </NavLink>
              </NavItem>
              <NavItem className="ml-3 mr-3">
                <NavLink tag={Link} to="/theme">
                  테마
                </NavLink>
              </NavItem>
              <NavItem className="ml-3 mr-3">
                <NavLink tag={Link} to="/reservation">
                  예약하기
                </NavLink>
              </NavItem>
              <NavItem className="ml-3 mr-3">
                <NavLink tag={Link} to="/confirm">
                  예약확인/취소
                </NavLink>
              </NavItem>
              <NavItem className="ml-3 mr-3">
                <NavLink tag={Link} to="/notice">
                  공지/이벤트
                </NavLink>
              </NavItem>
              <NavItem className="ml-3 mr-3">
                <NavLink tag={Link} to="/mapinfo">
                  오시는길
                </NavLink>
              </NavItem>
              <NavItem className="ml-3 mr-3">
                <NavLink tag={Link} to="/review">
                  후기게시판
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default EscapeNav;
