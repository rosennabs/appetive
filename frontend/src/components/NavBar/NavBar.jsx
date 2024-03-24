import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import {
  NavLink,
  NavMenu,
  NavBtn,
  Bars,
  NavBtnLink,
  ImgBtnLink,
  Nav,
} from "./NavBarElements";
import { FaCaretDown, FaSearch, FaHome } from "react-icons/fa";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";

function NavBar({ toggleSearchBar, showSearchBar, setSelected, username }) {
  const { isAuthenticated, setAuth, handleLogout } = useAuthentication();

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
      <div>{showSearchBar && <SearchBar />}</div>
      <ImgBtnLink to="/add-recipe" onClick={() => setSelected(null)}>
        MAKE YOUR RECIPE
      </ImgBtnLink>
    </>
  );
}

export default NavBar;
