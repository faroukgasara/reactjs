import "./sidebar.css";
import SignUp from '../users/SignUp';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import List from '../users/List';
import React, { useEffect, useState } from "react";
import Categorie from '../QCM/Categorie';
import AddCategorie from '../QCM/AddCategorie';
import AddQuestion from '../QCM/AddQuestion';
import AddTemplate from '../QCM/AddTemplate';
import Question from '../QCM/Question';
import TemplateManager from '../QCM/TemplateManager';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ChakraProvider } from "@chakra-ui/react";
import Templates from '../QCM/Templates';
import {ListAlt, AddBox } from "@material-ui/icons";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import SendQUIZ from "../Quiz/SendQuiz";
import resultats from "../Quiz/resultats";
import UpdateCondidat from "../users/UpdateCondidat";
import UpdateHR from "../users/UpdateHR";
import LandingPage from "./LandingPage";

function Sidebar() {

  const token = localStorage.getItem("token");
  const [isAuth, SetIsAuth] = useState(true);
  

  const submitHandler = () => {
    if (token && token !== "" && token !== undefined) {
      SetIsAuth(true)
    } else {
      SetIsAuth(false)
    }
  }

  useEffect(() => {
    submitHandler()
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <section className="contact-section pt-130" >
          <div className="c">
            <Router>
              <div className="sidebar">
                <div className="sidebarWrapper">
                  <div className="sidebarMenu">
                    <img className="sidebarTitle" src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" />
                    <ul className="sidebarList">
                      <li className="sidebarTitle">
                        Dashbord
                      </li>
                      <li className="sidebarListItem1">
                        Users
                      </li>
                      <li className="sidebarListItem">
                        <AddBox className="sidebarIcon" />
                        <Link to="/SignUp">Ajouter des utilisateurs</Link>
                      </li>
                      <li className="sidebarListItem">
                        <ListAlt className="sidebarIcon" />
                        <Link to="/List">List des utilisateurs</Link>
                      </li>
                      <li className="sidebarListItem">
                        <ListAlt className="sidebarIcon" />
                        <Link to="/reultats">Reultats</Link>
                      </li>
                      <li className="sidebarListItem1">
                        Templates
                      </li>
                      <li className="sidebarListItem">
                        <AddBox className="sidebarIcon" />
                        <Link to="/AddTemplate">Ajouter Template</Link>
                      </li>
                      <li className="sidebarListItem">
                        <ListAlt className="sidebarIcon" />
                        <Link to="/Templates">List des Templates</Link>
                      </li>
                      <li className="sidebarListItem1">
                        Categories
                      </li>
                      <li className="sidebarListItem">
                        <AddBox className="sidebarIcon" />
                        <Link to="/AddCategorie">Ajouter Categorie</Link>
                      </li>
                      <li className="sidebarListItem">
                        <ListAlt className="sidebarIcon" />
                        <Link to="/Categorie">List des Categories</Link>
                      </li>
                      <li className="sidebarListItem1">
                        Questions
                      </li>
                      <li className="sidebarListItem">
                        <AddBox className="sidebarIcon" />
                        <Link to="/AddQuestion">Ajouter Question</Link>
                      </li>
                      <li className="sidebarListItem">
                        <ListAlt className="sidebarIcon" />
                        <Link to="/Question">List des Questions</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <Switch>
                <ProtectedRoutes path="/SignUp" component={SignUp} isAuth={isAuth} />
                <ProtectedRoutes path="/List" component={List} isAuth={isAuth} />
                <ProtectedRoutes path="/Categorie" component={Categorie} isAuth={isAuth} />
                <ProtectedRoutes path="/AddCategorie" component={AddCategorie} isAuth={isAuth} />
                <ProtectedRoutes path="/AddQuestion" component={AddQuestion} isAuth={isAuth} />
                <ProtectedRoutes path="/Question" component={Question} isAuth={isAuth} />
                <ProtectedRoutes path="/Templates" component={Templates} isAuth={isAuth} />
                <ProtectedRoutes path="/reultats" component={resultats} isAuth={isAuth} />
                <ProtectedRoutes path="/AddTemplate" component={AddTemplate} isAuth={isAuth} />
                <Route path="/TemplateManager/:id" component={TemplateManager} />
                <Route path="/UpdateCondidat/:id" component={UpdateCondidat} />
                <Route path="/UpdateHR/:id" component={UpdateHR} />
                <Route path="/SendQuiz/:id/:prenom" component={SendQUIZ} isAuth={isAuth} />
                <Route path="*" component={LandingPage} />
              </Switch>
            </Router>
          </div>
        </section>
      </ChakraProvider>
    </DndProvider>
  );
}
export default Sidebar;