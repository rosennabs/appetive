import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  Bars,
  NavBtnLink,
  ImgBtnLink,
} from "./NavBarElements";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { FaCaretDown, FaSearch, FaHome } from "react-icons/fa";
import RecipeForm from "../RecipeForm";
import useAuthentication from "../../hooks/useAuthentication";
import AuthenticationError from "../AuthenticationError";
import axios from "axios";

function NavBar({ toggleSearchBar, showSearchBar, setSelected }) {
  const { isAuthenticated, setAuth, handleLogout } = useAuthentication();
  const [username, setUsername] = useState("");
  const token = localStorage.token;

  useEffect(() => {
    const getUsername = async (token) => {
      try {
        const response = await axios.post(`http://localhost:8080/api/user/`, {
          token,
        });
        console.log(response);
        setUsername(response.data);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    getUsername(token);
  }, []);

  return (
    <>
      <Bars />

      <Nav className="fixed top-0">
        <NavMenu>
          <NavLink to="/">
            <FaHome className="size-7" />
          </NavLink>
          <NavLink to="/about">ABOUT US</NavLink>
          <NavLink to="/browse-recipes" className="dropdown-menu">
            BROWSE RECIPES
            <FaCaretDown className="ml-1" />
          </NavLink>
          <NavLink to="/my-profile">
            MY PROFILE
            <FaCaretDown className="ml-1" />
          </NavLink>
        </NavMenu>

        <NavBtn>
          {!isAuthenticated ? (
            <>
              <NavBtnLink to="/login">LOGIN</NavBtnLink>
              <NavBtnLink to="/register">SIGN UP</NavBtnLink>
              <div
                className="ps-8 cursor-pointer"
                onClick={() => toggleSearchBar()}
              >
                <FaSearch />
              </div>
            </>
          ) : (
            <>
              <p>Welcome {username}!</p>
              <NavBtnLink to="/logout" onClick={(e) => handleLogout(e)}>
                LOGOUT
              </NavBtnLink>
            </>
          )}
        </NavBtn>
      </Nav>

      <div>
        <img
          src={require("../../Images/header.png")}
          alt="Header Image"
          className="h-auto max-w-full mt-16"
        />
        <ImgBtnLink to="/add-recipe">MAKE YOUR RECIPE</ImgBtnLink>
      </div>

           {/* Search bar */}
        
          <div>
            {showSearchBar && <SearchBar />}
          </div>
      
      <ImgBtnLink to="/add-recipe" onClick={() => setSelected(null)}>MAKE YOUR RECIPE</ImgBtnLink>

      <Routes>
        <Route path="/my-profile" element={<Profile username={username} />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/add-recipe"
          element={
            isAuthenticated ? (
              <RecipeForm setAuth={setAuth} />
            ) : (
              <AuthenticationError />
            )
          }
        />
      </Routes>
    </>
  );
}

export default NavBar;
