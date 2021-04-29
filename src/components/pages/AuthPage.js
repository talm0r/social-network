
import React from "react";
import { Link, Switch, Redirect, Route } from "react-router-dom";

import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";


export function AuthPage() {
   
  return (
    <>
     <Switch>
                <Redirect from="/" exact={true} to="/auth/login" />
              
                <Route path="/auth/login" component={Login} />
              </Switch>
      </>
  );
}
