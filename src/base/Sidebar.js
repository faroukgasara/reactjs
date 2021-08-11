import "./sidebar.css";
import SignUp from '../users/SignUp';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import List from '../users/List';
import React, { useEffect, useState } from "react";
import Categorie from '../QCM/Categorie';
import AddCategorie from '../QCM/AddCategorie';
import AddQuestion from '../QCM/AddQuestion';
import UpdateQuestion from '../QCM/UpdateQuestion';
import AddTemplate from '../QCM/AddTemplate';
import Question from '../QCM/Question';
import DragAndDrop from '../QCM/DragAndDrop';
import ListCondidat from '../users/ListCondidat';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {  ChakraProvider } from "@chakra-ui/react";
import Templates from '../QCM/Templates';

import {
  Timeline,
  TrendingUp,
  ListAlt,
  AddBox,
} from "@material-ui/icons";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import SendQUIZ from "../Quiz/SendQuiz";
import resultats from "../Quiz/resultats";
import UpdateCondidat from "../users/UpdateCondidat";
import UpdateHR from "../users/UpdateHR";

function Sidebar() {

  const token = localStorage.getItem("token")
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
                  <h3 className="sidebarTitle">Dashboard</h3>
                  <ul className="sidebarList">
                    <li className="sidebarListItem active">
                      List
                    </li>
                    <li className="sidebarListItem">
                      <Timeline className="sidebarIcon" />
                      Analytics
                    </li>
                    <li className="sidebarListItem">
                      <TrendingUp className="sidebarIcon" />
                      Sales
                    </li>
                  </ul>
                </div>
                <div className="sidebarMenu">
                  <h3 className="sidebarTitle">Quick Menu</h3>
                  <ul className="sidebarList">

                    <li className="sidebarListItem1">
                      Users
                    </li>

                    <li className="sidebarListItem">
                    <AddBox className="sidebarIcon" />
                      <Link className="" to="/SignUp">Ajouter des utilisateurs</Link>
                    </li>

                    <li className="sidebarListItem">
                    <ListAlt className="sidebarIcon" />
                      <Link className="" to="/List">List des RH</Link>
                    </li>
                    <li className="sidebarListItem">
                    <ListAlt className="sidebarIcon" />
                      <Link className="" to="/ListCondidat">List des Candidats</Link>
                    </li>

                    <li className="sidebarListItem">
                    <ListAlt className="sidebarIcon" />
                      <Link className="" to="/reultats">Reultats</Link>
                    </li>

                    <li className="sidebarListItem1">
                      Templates
                    </li> 
                    <li className="sidebarListItem">
                      <AddBox className="sidebarIcon" />
                      <Link className="" to="/AddTemplate">Ajouter Template</Link>
                    </li>
                    <li className="sidebarListItem">
                    <ListAlt className="sidebarIcon" />
                      <Link className="" to="/Templates">List des Templates</Link>
                    </li>

                    <li className="sidebarListItem1">
                      Categories
                    </li> 
                    <li className="sidebarListItem">
                      <AddBox className="sidebarIcon" />
                      <Link className="" to="/AddCategorie">Ajouter Categorie</Link>
                    </li>
                    <li className="sidebarListItem">
                    <ListAlt className="sidebarIcon" />
                      <Link className="" to="/Categorie">List des Categories</Link>
                    </li>

                    <li className="sidebarListItem1">
                      Questions
                    </li> 
                    <li className="sidebarListItem">
                      <AddBox className="sidebarIcon" />
                      <Link className="" to="/AddQuestion">Ajouter Question</Link>
                    </li>
                    <li className="sidebarListItem">
                    <ListAlt className="sidebarIcon" />
                      <Link className="" to="/Question">List des Questions</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Switch>
              <ProtectedRoutes path="/SignUp" component={SignUp} isAuth={isAuth}/>
              <ProtectedRoutes path="/List" component={List} isAuth={isAuth}/>
              <ProtectedRoutes path="/ListCondidat" component={ListCondidat} isAuth={isAuth}/>
              <ProtectedRoutes path="/Categorie" component={Categorie} isAuth={isAuth}/>
              <ProtectedRoutes path="/AddCategorie" component={AddCategorie} isAuth={isAuth}/>
              <ProtectedRoutes path="/AddQuestion" component={AddQuestion} isAuth={isAuth}/>
              <ProtectedRoutes path="/Question" component={Question} isAuth={isAuth}/>
              <Route path="/UpdateQuestion/:id" component={UpdateQuestion} isAuth={isAuth}/>
              <Route path="/SendQuiz/:id/:prenom" component={SendQUIZ} isAuth={isAuth}/>
              <ProtectedRoutes path="/AddTemplate" component={AddTemplate} isAuth={isAuth}/>
              <Route path="/DragAndDrop/:id" component={DragAndDrop} />
              <Route path="/UpdateCondidat/:id" component={UpdateCondidat} />
              <Route path="/UpdateHR/:id" component={UpdateHR} />
              <ProtectedRoutes path="/Templates" component={Templates} isAuth={isAuth}/>
              <ProtectedRoutes path="/reultats" component={resultats} isAuth={isAuth}/>
            </Switch>
          </Router>
          </div>
          </section>
        </ChakraProvider>
      </DndProvider>
    );
}
export default Sidebar;