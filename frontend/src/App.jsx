import NavBar from "./components/NavBar/NavBar";
import SearchForm from "./components/SearchForm";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import React, { Fragment, useContext } from "react";
import { useSelectedRecipe } from "./hooks/useSelectedRecipe";

import useShareLink from "./hooks/useShareLink";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "./components/Footer";
import FoodTrivia from "./components/FoodTrivia";
import TriviaResult from "./components/TriviaResult";
import { AppDataContext } from './contexts/AppDataContext';





function App() {
  const { selectedRecipe, setSelected } = useSelectedRecipe();
 const { showSearchBar } = useContext(AppDataContext);
  const { shareLink, generateShareLink, copySuccess, setCopySuccess } = useShareLink();
  
  
  

  return (
    <>
      <Fragment>
        <Router>
          <NavBar
          />
        
        <Routes>
            <Route path="/food-trivia" element={<FoodTrivia />} />
            <Route path="/trivia-result" element={<TriviaResult/>} />
            
        </Routes>
        </Router>
        
        {selectedRecipe ? (
          <RecipeDetails
            recipe={selectedRecipe}
            setSelected={setSelected}
            shareLink={shareLink}
            generateShareLink={generateShareLink}
            copySuccess={copySuccess}
            setCopySuccess={setCopySuccess}
          />
        ) : (
          <div>
            {!showSearchBar && <SearchForm />}
            <Recipes setSelected={setSelected} showSearchBar={showSearchBar} />
          </div>
        )}
        <Footer />
      </Fragment>
    </>
  );
}

export default App;
