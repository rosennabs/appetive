import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import NavBar from "./components/NavBar";

function App() {

  return (
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
    </Fragment>
  );
}

export default App;
