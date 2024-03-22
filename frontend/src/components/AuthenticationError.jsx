import React, { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthenticationError = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the login page after a delay
      navigate("/login");
    }, 2000);

    // Clean up the timeout when the effect re-runs
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center mt-10 border-2 border-red-400 rounded-xl px-6 py-2">
        <FaExclamationTriangle className="text-red-500 text-3xl mr-4" />
        <p className="text-red-500 text-lg">You must login or sign up first.</p>
      </div>
    </div>
  );
};

export default AuthenticationError;
