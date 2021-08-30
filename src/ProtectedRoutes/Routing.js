import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Start from '../Quiz/Start';
import Steps from '../Quiz/Steps';
import QuizManager from '../Quiz/QuizManager';
import SignIn from "../users/SignIn";

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/QuizManager/:id/:email" component={QuizManager} />
        <Route path="/Start" component={Start} />
        <Route path="/Steps" component={Steps} />
        <Route path="/" component={SignIn} />
        
      </Switch>
    </Router>
  );
};
export default Routing;