import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../Login";
import Register from "../Regsiter";

import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  Bars,
  NavBtnLink,
} from "./NavBarElements";

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
  };

  return (
    <>
      <Bars/>

      <Nav>
        <NavMenu>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT US</NavLink>
          <NavLink to="/browse-recipes">BROWSE RECIPES</NavLink>
          <NavLink to="/dashboard">DASHBOARD</NavLink>
        </NavMenu>

        <NavBtn>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">LOGIN</NavLink>

              <NavLink to="/register">REGISTER</NavLink>
            </>
          ) : (
            <>
              <p>Logged In</p>
              <NavBtn onClick={handleLogout}>LOGOUT</NavBtn>
            </>
          )}
        </NavBtn>
      </Nav>


      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
      </Routes>
    </>
  );
}

export default NavBar;
