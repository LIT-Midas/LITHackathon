import { Link } from "react-router-dom";
// reactstrap components
import {
  Button, Col, Container, Navbar, NavbarBrand, Row
} from "reactstrap";
import React, { useContext } from "react";
import { AccountContext } from "../../services/account";
import './AuthNavbar.css';
import { useHistory } from "react-router-dom";

const ClaimsNavBar = (props) => {
  const history = useHistory();
  const { logout } = useContext(AccountContext)

  const logoutFn = () => {
    logout();
    history.push('/');
  }

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4 mx-auto justify-content-center">
          <Row className={'mx-auto w-100 pb-4 mb-4'}>
            <Col xs lg={2}>
              <NavbarBrand to="/" tag={Link}>
                <img
                  alt="..."
                  className={'brandLogo'}
                  src={
                    require("../../assets/img/brand/Midas-logos_white.png").default
                  }
                />
              </NavbarBrand>
            </Col>
            <Col xs lg={8}>
              <div className="header-body text-center mt-1">
                <Row className="justify-content-center">
                  <Col lg="7" md="8">
                    <h1 className="text-white">{props.header}</h1>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs lg={2}>
              <Button className={"mt-2"} onClick={logoutFn}>
                Logout
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default ClaimsNavBar;
