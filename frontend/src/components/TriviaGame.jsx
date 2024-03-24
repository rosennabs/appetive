import React from 'react'

export default function TriviaGame({ FoodTrivia, fetchRandomTrivia, knownCount, unknownCount }) {
 return (
       <div>
         <p> {FoodTrivia} </p>
     <button
       type="button"
       onClick={() => fetchRandomTrivia(false)}
       className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-12 mr-16 rounded-md text-3xl">
       Never heard that!
     </button>
     
     <button
       type="button"
       onClick={() => fetchRandomTrivia(true)}
       className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 px-12 rounded-md text-3xl">
       Totally knew that!
     </button>

     <div>
        <p>Known Count: {knownCount}</p>
        <p>Unknown Count: {unknownCount}</p>
     </div>
     
       </div>
     )
}
