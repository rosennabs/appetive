import NavBar from "./components/NavBar/NavBar";
import SearchForm from "./components/SearchForm";
import RecipesList from "./components/RecipesList";
import { AppDataProvider } from "./contexts/AppDataContext";
import React, { Fragment } from "react";
import RecipeDetails from "./components/RecipeDetails";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Fragment>
        
        <Router>
          <NavBar />
          
          <AppDataProvider>
            <div className="items-center mt-10 text-black font-sans-serif">
              <SearchForm />
              <RecipesList />
            </div>
          </AppDataProvider>
          
          {/* <Routes>
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          </Routes> */}
            
        </Router>
      </Fragment>
    </>
  );
}

export default App;
