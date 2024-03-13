import NavBar from "./components/NavBar/NavBar";
import HomePage from "./routes/HomePage";
import { AppDataProvider } from "./contexts/AppDataContext";
import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Fragment>
        <Router>
          <NavBar />
          <AppDataProvider>
            <div className="items-center mt-10 text-black font-sans-serif">
              <HomePage />
            </div>
          </AppDataProvider>
        </Router>
      </Fragment>
    </>
  );
}

export default App;
