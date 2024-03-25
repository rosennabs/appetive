import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../SearchBar";
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
import UserFavs from "./pages/UserFavs";
import UserRecipes from "./pages/UserRecipes";
import { FaCaretDown, FaSearch, FaHome } from "react-icons/fa";
import RecipeForm from "../RecipeForm";
import useAuthentication from "../../hooks/useAuthentication";
import AuthenticationError from "../AuthenticationError";
import axios from "axios";
import { AppDataContext } from '../../contexts/AppDataContext';
import { useNavigate } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";




  function NavBar({ username }) {
  const { toggleSearchBar, showSearchBar } = useContext(AppDataContext);
  const { isAuthenticated, setAuth } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setAuth(false);
    navigate("/");
  };

  return (
    <>
      <Bars />

      <Nav className="fixed top-0">
        <NavMenu>
          <NavLink to="/">
            <FaHome className="size-7" />
          </NavLink>
          <NavLink to="/about">ABOUT US</NavLink>
          <NavLink to="/food-trivia">FOOD TRIVIA</NavLink>
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
              
            </>
          ) : (
            <>
              <p>Welcome {username}!</p>
              <NavBtnLink to="/logout" onClick={(e) => handleLogout(e)}>
                LOGOUT
              </NavBtnLink>
            </>
          )}
          <div
                className="ps-8 cursor-pointer"
                onClick={() => toggleSearchBar()}
              >
                <FaSearch />
              </div>
        </NavBtn>
      </Nav>

      <div>
        <img
          src={require("../../Images/header.png")}
          alt="Header Image"
          className="h-auto max-w-full mt-16"
        />
       <ImgBtnLink to="/add-recipe" className="animate-pulse">MAKE YOUR RECIPE</ImgBtnLink>
      </div>

        <div >
          {showSearchBar && <SearchBar />}
        </div>

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
        <Route path="/my-favs" element={<UserFavs username={username} />} />
        <Route path="/my-recipes" element={<UserRecipes username={username} />} />
      </Routes>
    </>
  );
}

export default NavBar;
