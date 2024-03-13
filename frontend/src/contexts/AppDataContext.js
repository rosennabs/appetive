import { createContext } from "react";

import useAppData from "../hooks/useAppData";

export const AppDataContext = createContext();

 
export const AppDataProvider = ({ children }) => {

  //Destructure the useApplicationData function
  const { state, handleSearchSubmission } = useAppData();
  

  return (
    <AppDataContext.Provider value={{ state, handleSearchSubmission }}>
      {children}
    </AppDataContext.Provider>
  );
};
