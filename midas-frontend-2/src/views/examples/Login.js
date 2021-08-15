import { Auth } from 'aws-amplify';
import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Redirect, useLocation } from "react-router-dom";
import {
  Button,
  Card, CardBody, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon,
  InputGroupText, Row
} from "reactstrap";
import { AccountContext } from "../../services/account";
import { CaseContext } from '../../services/case';

const Login = (props) => {
  const { validUser, setUserEmail, setValidUser, setUsername, setName, setUserId, setPersona } = useContext(AccountContext);
  const { selectedCase, setSelectedCase } = useContext(CaseContext);
  const [method, setMethod] = useState(null);
  const location = useLocation();
  const username = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    const path = location.pathname.replace('/auth/login', '');
    if (path.length > 0) {
      let elements = path.split('/');
      elements = elements.filter((x) => { return (x != null && x != '') })
      if (elements.length == 2) {
        setMethod(elements[0]);
        setSelectedCase(elements[1]);
      }
    }
  }, [location]);

  const assessLoggedInState = (email) => {
    Auth.currentAuthenticatedUser()
      .then(async (sess) => {
        await fetchUserId(email);
        setValidUser(true);
        setPersona('users');
      }).catch(() => {
        setValidUser(false);
        setUsername('');
        setUserEmail('');
        setPersona('');
      });
  }

  const signIn = async () => {
    try {
      const user = await Auth.signIn(username.current, password.current);
      setUserEmail(user['attributes']['email']);
      setUsername(username.current);
      setName(user['attributes']['name']);
      assessLoggedInState(user['attributes']['email']);
    } catch (error) {
      console.error('error signing in:', error);
    }
  }

  const signInToApi = async () => {
    const data = {
      "email": username.current,
      "access_code": password.current,
    }
    // setValidUser(true);
    const path = encodeURI(`https://8169f98443ef.ngrok.io/${method === 'upload' ? 'clients' : 'receivers'}/${username.current}`);
    console.log(path);
    method && await axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((request) => {
      console.log(request.data);
      if (request.status == 200) {
        setUserEmail(request.data.email);
        setValidUser(true);
        setUserId(request.data.id);
        setPersona(method === 'upload' ? 'clients' : 'receivers');
      }
    }).catch((error) => {
      console.error('Error validating request: ' + error);
    });
  }

  const fetchUserId = async (email) => {
    email && await axios.get(`https://8169f98443ef.ngrok.io/users/email/${email}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((request) => {
      console.log(request);
      setUserId(request?.data?.id);
    }).catch((error) => {
      console.error(error);
    });
  }

  const UserLogin = () => {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-muted text-center mt-1 mb-3">
                <small>Sign in</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onChange={(e) => {
                        username.current = e.target.value;
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e) => {
                        password.current = e.target.value;
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={signIn}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }

  const UploadersLogin = () => {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-muted text-center mt-1 mb-3">
                <small>Sign in with the provided access code to upload documents to the case</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onChange={(e) => {
                        username.current = e.target.value;
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Access Code"
                      type="text"
                      autoComplete="new-access-code"
                      onChange={(e) => {
                        password.current = e.target.value;
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="mt-4 mb-1" color="primary" type="button" onClick={signInToApi}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }

  const DownloadLogin = () => {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-muted text-center mt-1 mb-3">
                <small>Sign in with the provided access code to download the documents from the case</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onChange={(e) => {
                        username.current = e.target.value;
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Access Code"
                      type="text"
                      autoComplete="new-access-code"
                      onChange={(e) => {
                        password.current = e.target.value;
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="mt-4 mb-1" color="primary" type="button" onClick={signInToApi}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }

  const RenderLoginScreen = () => {
    if (selectedCase != null && method == 'upload') {
      return <UploadersLogin />;
    } else if (selectedCase != null && method == 'download') {
      return <DownloadLogin />;
    } else {
      return <UserLogin />
    }
  }

  const RedirectValidUsers = () => {
    if (selectedCase != null && method != null) {
      const path = `/claim/${method}`;
      return <Redirect to={path} />;
    } else {
      return <Redirect to="/home/cases" />
    }
  }

  if (validUser) {
    return (<RedirectValidUsers />);
  } else {
    return (<RenderLoginScreen />);
  }
};

export default Login;
