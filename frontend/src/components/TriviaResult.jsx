import React from 'react'

export default function TriviaResult() {
  return (
    <div className="flex flex-col font-bold text-black text-center relative">
      <img
        src={require("../Images/simmering.jpg")}
        alt="culinary Image"
        className="w-full"
      />
      <div className="bg-amber-100 bg-opacity-80 py-16 absolute top-28 left-28 right-28 bottom-28 flex flex-col justify-center items-center p-16 pb-4">
        
         
            <h1 className="flex flex-row text-5xl mb-24">
              Congratulations!
            </h1>

        <div className="flex flex-row items-center justify-between text-5xl bg-green-700 p-8 mt-24 rounded-md text-white">
          <p>Score : 5/12</p>
              
            </div>

            <div className="mt-16 underline text-2xl text-amber-700 flex flex-row justify-end items-end w-full">
              <button
                type="button"
                
                
              >
                Close
              </button>
            </div>
       </div>
        
      
        </div>
  )
}
