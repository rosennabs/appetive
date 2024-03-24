import React, { useState, useEffect } from "react";
import axios from "axios";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

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

  const getUsername = async () => {
    try {
      const token = localStorage.token;
      const response = await axios.post(`http://localhost:8080/api/user/`, {
        token,
      });
      setUsername(response.data);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAuthentication();
      if (isAuthenticated) {
        await getUsername();
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // useEffect(() => {
  //   checkAuthentication();
  // });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setAuth(false);
  };

  return {
    isAuthenticated,
    setAuth,
    handleLogout,
    username,
  };
};

export default useAuthentication;
