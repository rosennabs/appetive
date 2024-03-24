import React, { useContext } from 'react';
import { AppDataContext } from '../contexts/AppDataContext';


export default function TriviaGame() {
  const { foodTrivia, fetchRandomTrivia, knownCount, unknownCount } = useContext(AppDataContext);

  
  return (
    <div className="flex flex-col items-center font-bold text-amber-700 text-center relative">
      <img
        src={require("../Images/simmering.jpg")}
        alt="culinary Image"
        className="w-full"
      />
      <div className="bg-gray-100 bg-opacity-70 py-16 absolute top-28 left-28 right-28 bottom-28">
         {foodTrivia ? (
          <>
        <p> {foodTrivia} </p> 

        <button
          type="button"
          onClick={() => fetchRandomTrivia(false)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-12 mr-16 rounded-md text-3xl"
        >
          Never heard that!
        </button>

        <button
          type="button"
          onClick={() => fetchRandomTrivia(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-12 rounded-md text-3xl"
        >
          Totally knew that!
        </button>

        <div>
          <p>Known Count: {knownCount}</p>
          <p>Unknown Count: {unknownCount}</p>
            </div>
            </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>

  );
}
