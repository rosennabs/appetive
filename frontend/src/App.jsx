import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./routes/HomePage";
import { AppDataProvider } from './contexts/AppDataContext';  
import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
    <Fragment>
      
      <Router>
        <NavBar />

        <div className="flex justify-center items-center mt-10">
          <h1 className="text-3xl text-amber-700 uppercase font-bold font-sans-serif">
            {" "}
            Welcome to Appetive!{" "}
          </h1>
        </div>
      </Router>
   

      <AppDataProvider>
      <div className="items-center mt-10 text-black font-sans-serif">
        <HomePage />
        </div>
      </AppDataProvider>
      
    </Fragment>
     </>
  );
}

export default App;
