import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Start from '../Quiz/Start';
import Steps from '../Quiz/Steps';
import QuizManager from '../Quiz/QuizManager';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';
import Categorie from '../QCM/Categorie';
import AddCategorie from '../QCM/AddCategorie';
import AddQuestion from '../QCM/AddQuestion';
import UpdateQuestion from '../QCM/UpdateQuestion';
import AddTemplate from '../QCM/AddTemplate';
import Question from '../QCM/Question';
import DragAndDrop from '../QCM/DragAndDrop';
import ListCondidat from '../users/ListCondidat';
import List from "../users/List";
import SignUp from "../users/SignUp";
import Templates from "../QCM/Templates";
import Sidebar from "../base/Sidebar";
import SignIn from "../users/SignIn";

const Routing = () => {

  return (
    <Router>
      <Switch>
        <Route path="/QuizManager/:id/:email" component={QuizManager} />
        <Route path="/" component={SignIn} />
        <Route path="/Start" component={Start} />
        <Route path="/Steps" component={Steps} />
        
      </Switch>
    </Router>
  );
};

export default Routing;