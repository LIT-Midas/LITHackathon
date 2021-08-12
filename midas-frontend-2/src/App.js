import "@fortawesome/fontawesome-free/css/all.min.css";
import Amplify, { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Login from "./views/examples/Login";
import { BrowserRouter, Redirect, Route, Router, Switch } from "react-router-dom";
import './App.css';
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";
import awsconfig from './aws-exports';
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

Amplify.configure(awsconfig);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then(sess => {
        console.log('logged in');
        setLoggedIn(true);
      }).catch(() => {
        console.log('not logged in');
        setLoggedIn(false);
      });
  }

  useEffect(() => {
    assessLoggedInState();
  }, [])

  return (
    // TODO: Fix Login Logic
    // <Router>
    //   <Route exact path="/">
    //     <Login onSignIn={assessLoggedInState} />
    //   </Route>
    // </Router>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        {loggedIn ? <Redirect from="/" to="/admin/index" /> : <Redirect from="/" to="/auth/login" />}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
