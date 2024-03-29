import './App.css';
import Footer from './base/Footer';
import Header from './base/Header';
import React from "react";
import Routing from './ProtectedRoutes/Routing';
import './base/GlobalVariables'

function App() {
  return (
    <div >
      <Header />
      <Routing />
      <Footer />
    </div>
  );
}

export default App;
