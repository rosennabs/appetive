import React, {useState, useContext} from "react";
import { PiArrowFatLinesDownFill } from "react-icons/pi";
import TriviaGame from "./TriviaGame";
import { AppDataContext } from '../contexts/AppDataContext';




export default function FoodTrivia() {
   const {  fetchRandomTrivia,  setFoodTrivia, setUnknownCount } = useContext(AppDataContext);
  
  const [startClicked, setStartClicked] = useState(false);

  const handleStartClick = () => {

    setFoodTrivia(null);
    setUnknownCount(0);
    setStartClicked(true);
    fetchRandomTrivia();
    
  };



  return (
    <>
      {!startClicked ? (
        
        <div className="flex flex-col items-center font-bold text-amber-700 text-center relative">
          <img
            src={require("../Images/simmering.jpg")}
            alt="culinary Image"
            className="w-full"
          />
          <div className="bg-amber-100 bg-opacity-80 py-16 absolute top-28 left-28 right-28 bottom-28">
            <h2 className="font-bold text-5xl my-16 uppercase  text-amber-700 text-center">
              Let's Play Food Trivia!
            </h2>

            <p className="text-3xl mb-16 text-black">
              Are you ready to challenge your culinary knowledge?
            </p>
            <p className="text-2xl mb-20 text-black">
              Start the fun and see how many trivia facts you know!
            </p>

            <div className="flex justify-center items-center">
              <svg className="text-6xl ml-56 animate-bounce text-green-700">
                <PiArrowFatLinesDownFill />
              </svg>
            </div>

            <button
              type="button"
              onClick={()=> handleStartClick()}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-5 px-16 -mt-8 rounded-md text-3xl"
            >
              START
            </button>
          </div>
        </div>
      ) : (
          <TriviaGame />
      )}
    </>
  );
}
