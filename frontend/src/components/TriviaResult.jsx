import React, {useContext} from "react";
import { AppDataContext } from "../contexts/AppDataContext";

export default function TriviaResult() {
const { knownCount, unknownCount } = useContext(AppDataContext);
  
  return (
    <div className="flex flex-col font-bold text-black text-center relative">
      <img
        src={require("../Images/simmering.jpg")}
        alt="culinary Image"
        className="w-full"
      />
      <div className="bg-amber-100 bg-opacity-80 py-16 absolute top-28 left-28 right-28 bottom-28 flex flex-col justify-center items-center p-16 pb-4">
        {knownCount > 0 ? (
          <div>
            <h1 className="flex flex-col text-5xl">
              <p className="mb-16">Congratulations!!!</p>
              <p>Keep exploring and learning</p>
            </h1>

            <div className="text-5xl bg-green-700 p-8 mt-24 mx-32 rounded-md text-white">
              <p>Score : {`${knownCount}/${knownCount + unknownCount}`}</p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="flex flex-col text-5xl">
              <p className="mb-16">You didn't know any?</p>
              <p>No problem, keep learning!</p>
            </h1>

            <div className="text-5xl bg-red-600 p-8 mt-24 mx-32 rounded-md text-white">
              <p>Score : {`${knownCount}/${knownCount + unknownCount}`}</p>
            </div>
          </div>
        )}

        <div className="mt-16 underline underline-offset-8 text-2xl text-amber-700 flex flex-row justify-between items-end w-full">
          <button type="button">Restart</button>
          <button type="button">Close</button>
        </div>
      </div>
    </div>
  );
}
