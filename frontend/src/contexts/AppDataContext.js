import { createContext } from "react";

import useAppData from "../hooks/useAppData";

export const AppDataContext = createContext();

 
export const AppDataProvider = ({ children }) => {

  //Destructure the useApplicationData function
  const { state } = useAppData();
  

  return (
    <AppDataContext.Provider value={{ state }}>
      {children}
    </AppDataContext.Provider>
  );
};
