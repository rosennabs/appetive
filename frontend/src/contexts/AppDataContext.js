import { createContext } from "react";

import useAppData from "../hooks/useAppData";
import { useFoodTrivia } from "../hooks/useFoodTrivia";
import { useSearchBar } from "../hooks/useSearchBar";

export const AppDataContext = createContext();

 
export const AppDataProvider = ({ children }) => {

  //Destructure the useApplicationData function
  const {
    state,
    handleSearchSubmission,
    fetchRecipeInfo,
    setRecipes,
    searchClicked,
  } = useAppData();

  const {
    fetchRandomTrivia,
    setFoodTrivia,
    foodTrivia,
    knownCount,
    unknownCount,
    setUnknownCount,
    setKnownCount,
  } = useFoodTrivia();

  const {
    showSearchBar,
    toggleSearchBar
  } = useSearchBar();
  

  return (
    <AppDataContext.Provider
      value={{
        state,
        handleSearchSubmission,
        fetchRecipeInfo,
        setRecipes,
        searchClicked,
        fetchRandomTrivia,
        setFoodTrivia,
        foodTrivia,
        knownCount,
        unknownCount,
        setUnknownCount,
        setKnownCount,
        showSearchBar,
        toggleSearchBar,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
