import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuccessAlert = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to the home page after a delay
      navigate("/my-recipes");
    }, 2500);

    // Clean up the timeout when the effect re-runs
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed top-20 inset-x-20 flex items-center justify-center mb-5">
      <div className="flex items-center mt-10 bg-darker-white border-2 border-yellow rounded-xl px-6 py-2">
        <FaCheckCircle className="text-yellow text-3xl mr-4" />
        <p className="text-brown-light text-lg">Your recipe was added!</p>
      </div>
    </div>
  );
};

export default SuccessAlert;
