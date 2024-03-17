import NavBar from "./components/NavBar/NavBar";
import SearchForm from "./components/SearchForm";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import React, { Fragment } from "react";
import { useSelectedRecipe } from "./hooks/useSelectedRecipe";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const { selectedRecipe, setSelected } = useSelectedRecipe();

  

  return (
    <>
      <Fragment>
        
        <Router>
          <NavBar />  
        </Router>

        
         {selectedRecipe ? (
          <RecipeDetails recipe={selectedRecipe} setSelected={setSelected} />
        ) : (
          <div>
            <SearchForm />
            <Recipes setSelected={setSelected} />
          </div>
        )}
        
      </Fragment>
    </>
  );
}

export default App;
