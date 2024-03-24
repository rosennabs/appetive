import React, { useContext, useState } from "react";
import { AppDataContext } from "../contexts/AppDataContext";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import TriviaResult from "./TriviaResult";
import { useNavigate } from 'react-router-dom';

export default function TriviaGame() {
  const { foodTrivia, fetchRandomTrivia, knownCount, unknownCount } =
    useContext(AppDataContext);

  const navigate = useNavigate();
  
  const [endGameClicked, setEndGameClicked] = useState(false);

  const handleEndGameClick = () => {
    setEndGameClicked(true);
    navigate('/trivia-result');
  };

  return (
    <>
      {!endGameClicked ? (
        <div className="flex flex-col font-bold text-black text-center relative">
          <img
            src={require("../Images/simmering.jpg")}
            alt="culinary Image"
            className="w-full"
          />
          <div className="bg-amber-100 bg-opacity-80 py-16 absolute top-28 left-28 right-28 bottom-28 flex flex-col justify-center items-center p-16 pb-4">
            {foodTrivia ? (
              <>
                <p className="flex flex-row text-4xl mb-24">
                  <FaQuoteLeft className="h-4" />
                  {foodTrivia}
                  <FaQuoteRight className="h-4" />
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() => fetchRandomTrivia(false)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-12 mr-16 rounded-md text-3xl"
                  >
                    Never heard that!
                  </button>

                  <button
                    type="button"
                    onClick={() => fetchRandomTrivia(true)}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-5 px-12 rounded-md text-3xl"
                  >
                    Totally knew that!
                  </button>
                </div>

                <div className="flex flex-row items-center justify-between text-5xl mt-32">
                  <p className=" text-red-600 mr-64">{unknownCount} </p>
                  <p className=" text-green-700 ml-32">{knownCount}</p>
                </div>

                <div className="mt-16 underline text-2xl text-amber-700 flex flex-row justify-end items-end w-full">
                  <button type="button" onClick={() => handleEndGameClick()}>
                    End Game
                  </button>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      ) : (
          <TriviaResult
            unknownCount={unknownCount}
            knownCount={knownCount} />
      )}
    </>
  );
}
