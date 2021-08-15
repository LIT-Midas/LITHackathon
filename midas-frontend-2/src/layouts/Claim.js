import React, { useContext } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
// reactstrap components
import { Col, Container, Row } from "reactstrap";
// core components
import AuthNavbar from "../components/Navbars/AuthNavbar.js";
import ClaimsNavBar from "../components/Navbars/ClaimsNavBar.js";
import routes from "../routes";
import { AccountContext } from "../services/account.js";


const Claim = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-gradient-info");
    return () => {
      document.body.classList.remove("bg-gradient-info");
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/claim") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <ClaimsNavBar header={'Document Explorer'} />
        <div className="header bg-gradient-info pt-4 pb-2">
          {/* Page content */}
          <Container className="py-5">
            <Row className="justify-content-center">
              <Switch>
                {getRoutes(routes)}
                <Redirect from="*" to="/auth/login" />
              </Switch>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Claim;
