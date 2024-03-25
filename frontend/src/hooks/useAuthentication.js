import React, { useState, useEffect } from "react";
import axios from "axios";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.token);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // Keep user login status and set 'setAuth' to 'true' upon page refresh
  const checkAuthentication = async () => {
    try {
      const token = localStorage.token;

      // Set isAuthenticated to false if token doesn't exist
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const headers = {
        token: token,
      };
      const response = await axios.get("http://localhost:8080/auth/is-verify", {
        headers,
      });
      response.data === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkAuthentication();
  });

  return {
    isAuthenticated,
    setAuth,
  };
};

export default useAuthentication;
