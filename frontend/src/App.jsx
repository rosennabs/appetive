import NavBar from "./components/NavBar/NavBar";
import SearchForm from "./components/SearchForm";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import React, { Fragment } from "react";
import { useSelectedRecipe } from "./hooks/useSelectedRecipe";
import { useSearchBar } from "./hooks/useSearchBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const { selectedRecipe, setSelected } = useSelectedRecipe();
  const { showSearchBar, toggleSearchBar } = useSearchBar();
  

  return (
    <>
      <Fragment>
        
        <Router>
          <NavBar
            toggleSearchBar={toggleSearchBar}
            showSearchBar={showSearchBar} />  
        </Router>

        
         {selectedRecipe ? (
          <RecipeDetails
            recipe={selectedRecipe}
            setSelected={setSelected} />
        ) : (
          <div>
            {!showSearchBar && <SearchForm />}
            <Recipes setSelected={setSelected} />
          </div>
        )}
        
      </Fragment>
    </>
  );
}

export default App;
