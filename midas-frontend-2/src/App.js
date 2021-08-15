import "@fortawesome/fontawesome-free/css/all.min.css";
import Amplify from 'aws-amplify';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";
import awsconfig from './aws-exports';
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import Claim from "./layouts/Claim";
import Home from "./layouts/Home";
import { Account } from "./services/account";
import { Case } from "./services/case";

Amplify.configure(awsconfig);

function App() {
  return (
    <Account>
      <Case>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Route path="/home" render={(props) => <Home {...props} />} />
            <Route path="/claim" render={(props) => <Claim {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </BrowserRouter>
      </Case>
    </Account>
  );
}

export default App;
