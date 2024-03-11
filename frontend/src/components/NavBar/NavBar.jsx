import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  Bars,
  NavBtnLink,
} from "./NavBarElements";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import { FaAngleDoubleDown } from "react-icons/fa";

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
  const isAuth = async () => {
    try {
      const token = localStorage.token;

      // Set isAuthenticated to false if token doesn't exist
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const headers = {
        token: token,
      };
      const response = await axios.get("http://localhost:3000/auth/is-verify", {
        headers,
      });
      // console.log(response.data); //true

      response.data === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    isAuth();
  });

  return (
    <>
      <Bars />

      <Nav>
        <NavMenu>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT US</NavLink>
          <NavLink to="/browse-recipes" className="dropdown-menu">
            BROWSE RECIPES
            <FaAngleDoubleDown className="ml-1" />
          </NavLink>
          <NavLink to="/my-profile">
            MY PROFLE
            <FaAngleDoubleDown className="ml-1" />
          </NavLink>
        </NavMenu>

        <NavBtn>
          {!isAuthenticated ? (
            <>
              <NavBtnLink to="/login">LOGIN</NavBtnLink>
              <NavBtnLink to="/register">SIGN UP</NavBtnLink>
            </>
          ) : (
            <>
              <p>Logged In</p>
              <NavBtnLink onClick={(e) => handleLogout(e)}>LOGOUT</NavBtnLink>
            </>
          )}
        </NavBtn>
      </Nav>

      <img
        src={require("../../Images/header-img.jpg")}
        alt="Header Image"
        className="w-full h-80 object-cover filter brightness-75"
      />

      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default NavBar;
