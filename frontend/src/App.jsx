import NavBar from "./components/NavBar/NavBar";
import SearchForm from "./components/SearchForm";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import { AppDataProvider } from "./contexts/AppDataContext";
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

        <SearchForm />
        {selectedRecipe ? <RecipeDetails recipe={selectedRecipe} /> : <Recipes setSelected={setSelected} />}
      
        
      </Fragment>
    </>
  );
}

export default App;
