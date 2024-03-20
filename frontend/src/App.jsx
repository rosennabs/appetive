import NavBar from "./components/NavBar/NavBar";
import SearchForm from "./components/SearchForm";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import React, { Fragment } from "react";
import { useSelectedRecipe } from "./hooks/useSelectedRecipe";
import { useSearchBar } from "./hooks/useSearchBar";
import useShareLink from "./hooks/useShareLink";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const { selectedRecipe, setSelected } = useSelectedRecipe();
  const { showSearchBar, toggleSearchBar } = useSearchBar();
  const { shareLink, generateShareLink, copySuccess, setCopySuccess } = useShareLink();
  

  return (
    <>
      <Fragment>
        
        <Router>
          <NavBar
            toggleSearchBar={toggleSearchBar}
            showSearchBar={showSearchBar}
            setSelected={setSelected}/>  
        </Router>

        
         {selectedRecipe ? (
          <RecipeDetails
            recipe={selectedRecipe}
            setSelected={setSelected}
            shareLink={shareLink}
            generateShareLink={generateShareLink}
            copySuccess={copySuccess}
            setCopySuccess={setCopySuccess}/>
        ) : (
          <div>
            {!showSearchBar && <SearchForm />}
              <Recipes
                setSelected={setSelected}
                showSearchBar={showSearchBar} />
          </div>
        )}
        <Footer />
        
      </Fragment>
    </>
  );
}

export default App;
