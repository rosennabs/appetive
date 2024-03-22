import { createContext } from "react";

import useAppData from "../hooks/useAppData";

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
  

  return (
    <AppDataContext.Provider
      value={{
        state,
        handleSearchSubmission,
        fetchRecipeInfo,
        setRecipes,
        searchClicked,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
