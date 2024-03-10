import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
  };

  return (
    <Fragment>
      <Router>
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-3xl text-amber-700 uppercase font-bold font-sans-serif">
            {" "}
            Welcome to Appetive!{" "}
          </h1>
        </div>

        {!isAuthenticated ? (
          <div>
            <Link to="/login">
              <button className="border-black border-2 rounded-2xl py-2 px-4" type="button">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="border-black border-2 rounded-2xl py-2 px-4" type="button">
                Register
              </button>
          </Link>
        </div>
        ) : (
          <div>
          <p>Logged In</p>
          <button className="border-black border-2 rounded-2xl py-2 px-4" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        )}
      
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth}/>} />
          <Route path="/register" element={<Register setAuth={setAuth}/>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
