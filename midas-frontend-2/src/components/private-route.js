import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Redirect, Route } from "react-router-dom";
import { AccountContext } from "../services/account";
import SideNavBar from "./Sidebar/Sidebar";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { validUser } = useContext(AccountContext);
  return (
    <Route
      {...rest}
      // render the function passed into render based on condition
      render={(routeProps) =>
        !!validUser ? (
          <div className="flex-column">
            <Row className="m-0">
              <Col sm="4" md="3" xl="2" className="side-nav-bar p-0">
                <SideNavBar />
              </Col>
              <Col sm="8" md="9" xl="10" className="p-0">
                <RouteComponent {...routeProps} />
              </Col>
            </Row>
          </div>
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
