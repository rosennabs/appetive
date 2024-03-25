import NavBar from "./components/NavBar/NavBar";
import SearchForm from "./components/SearchForm";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import React, { Fragment, useEffect, useState } from "react";
import { useSelectedRecipe } from "./hooks/useSelectedRecipe";
import { useSearchBar } from "./hooks/useSearchBar";
import useShareLink from "./hooks/useShareLink";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/NavBar/pages/Login";
import Register from "./components/NavBar/pages/Register";
import About from "./components/NavBar/pages/About";
import Profile from "./components/NavBar/pages/Profile";
import RecipeForm from "./components/RecipeForm";
import useAuthentication from "./hooks/useAuthentication";
import axios from "axios";
import HomePage from "./components/HomePage";
import FoodTrivia from "./components/FoodTrivia";
import TriviaResult from "./components/TriviaResult";
import UserFavs from "./components/NavBar/pages/UserFavs";
import UserRecipes from "./components/NavBar/pages/UserRecipes";

function App() {
  const { setAuth } = useAuthentication();
  const { selectedRecipe, setSelected } = useSelectedRecipe();
  const { showSearchBar, toggleSearchBar } = useSearchBar();
  const { shareLink, generateShareLink, copySuccess, setCopySuccess } =
    useShareLink();
  const [username, setUsername] = useState("");
  const token = localStorage.token;

  useEffect(() => {
    const getUsername = async (token) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/`, {
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
      <Fragment>
        <Router>
          <NavBar
            toggleSearchBar={toggleSearchBar}
            showSearchBar={showSearchBar}
            username={username}
            setSelected={setSelected}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  {...{
                    selectedRecipe,
                    showSearchBar,
                    setSelected,
                    shareLink,
                    generateShareLink,
                    copySuccess,
                    setCopySuccess,
                  }}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register setAuth={setAuth} />} />
            <Route
              path="/my-profile"
              element={<Profile username={username} />}
            />
            <Route path="/add-recipe" element={<RecipeForm />} />
            <Route path="/food-trivia" element={<FoodTrivia />} />
            <Route path="/trivia-result" element={<TriviaResult />} />
            <Route path="/my-favs" element={<UserFavs username={username} />} />
            <Route
              path="/my-recipes"
              element={<UserRecipes username={username} />}
            />
          </Routes>
          <Footer />
        </Router>
      </Fragment>
    </>
  );
}

export default App;
