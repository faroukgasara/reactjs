import './App.css';
import Footer from './base/Footer';
import Header from './base/Header';
import Sidebar from './base/Sidebar';
import SignUp from './users/SignUp';
import SignIn from './users/SignIn';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import List from './users/List';
import React, { useEffect, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Alert, ChakraProvider } from "@chakra-ui/react";
import Templates from './QCM/Templates';
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  ListAlt,
  AddAlert,
  AddBox,
} from "@material-ui/icons";
import { ListItemIcon } from '@material-ui/core';
import Routing from './ProtectedRoutes/Routing';
import DragAndDrop from './QCM/DragAndDrop';





function App() {

  return (
    <div > 
      <Header />
      <Routing/>
      <Footer />
    </div>
  );
}

export default App;
