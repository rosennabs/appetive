import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../Login";
import Register from "../Regsiter";
import axios from "axios";

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

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setAuth(false);
  };

  // Keep user login status and set 'setAuth' to 'true' upon page refresh
  const isAuth = async() => {
    try {
      const headers = {
        token: localStorage.token
      }
      const response = await axios.get("http://localhost:3000/auth/is-verify", {headers})
      // console.log(response.data); //true

      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  }  

  useEffect(() => {
    isAuth();
  });

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
              <NavBtn onClick={e => handleLogout(e)}>LOGOUT</NavBtn>
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
