import React, { useContext, useState } from "react";
import SearchBar from "../SearchBar";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  Bars,
  NavBtnLink,
  ImgBtnLink,
  DropdownMenu,
  NavDropdown,
} from "./NavBarElements";
import {
  FaCaretDown,
  FaSearch,
  FaHome,
  FaUtensils,
  FaHeart,
} from "react-icons/fa";
import useAuthentication from "../../hooks/useAuthentication";
import { AppDataContext } from "../../contexts/AppDataContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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

          <NavDropdown>
            <div>
              <p className="inline-block mr-1">PROFILE</p>
              <FaCaretDown className="ml-1 inline-block" />
            </div>
            <DropdownMenu>
              <li>
                <Link to="/my-recipes">
                  {" "}
                  <FaUtensils className=" inline-block mr-1" /> My Recipes
                </Link>
              </li>
              <li>
                <Link to="/my-favs">
                  <FaHeart className="inline-block mr-1" />
                  My Favorites
                </Link>
              </li>
            </DropdownMenu>
          </NavDropdown>
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
            <FaSearch className="hover:text-darker-white" />
          </div>
        </NavBtn>
      </Nav>

      <div>
        <img
          src={require("../../Images/header.png")}
          alt="Header Image"
          className="h-auto max-w-full mt-16"
        />
        <ImgBtnLink to="/add-recipe" className="animate-pulse">
          MAKE YOUR RECIPE
        </ImgBtnLink>
      </div>

      <div>{showSearchBar && <SearchBar />}</div>
    </>
  );
}

export default NavBar;
