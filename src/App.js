import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/darkly/bootstrap.css";
import {
  Button,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Navbar className="navbar-padding" color="dark" dark expand="lg">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="navbar navbar-expand-lg navbar-dark bg-dark navbar-padding"
            navbar
          >
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-padding">
        <div className="container">
          <a className="navbar-brand" href="/home.do">
            Acorn Escape
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav ml-auto mr-auto">
              <li className="nav-item ml-3 mr-3">
                <a className="nav-link" href="/intro.do">
                  Escape
                </a>
              </li>
              <li className="nav-item ml-3 mr-3">
                <a className="nav-link" href="/thema/thema.do">
                  테마
                </a>
              </li>
              <li className="nav-item ml-3 mr-3">
                <a className="nav-link" href="/reservation/reservation.do">
                  예약하기
                </a>
              </li>
              <li className="nav-item ml-3 mr-3">
                <a className="nav-link" href="/confirm/list.do">
                  예약확인/취소
                </a>
              </li>
              <li className="nav-item ml-3 mr-3">
                <a className="nav-link" href="/notice/hongdae/list.do">
                  공지/이벤트
                </a>
              </li>
              <li className="nav-item ml-3 mr-3">
                <a className="nav-link" id="mapInfo" href="/mapinfo/mapinfo.do">
                  오시는길
                </a>
              </li>
              <li className="nav-item ml-3 mr-3">
                <a className="nav-link" href="/review/list.do">
                  후기게시판
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
