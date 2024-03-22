import React from "react";
import {
  FaShareSquare,
  FaPrint,
  FaStar,
  FaRegWindowClose,
} from "react-icons/fa";
import { FaPlateWheat } from "react-icons/fa6";
import { ImSpoonKnife, ImClock } from "react-icons/im";
import { GiCook, GiCookingPot } from "react-icons/gi";
import ReviewForm from "./ReviewForm";
import CounterAttempt from "./CounterAttempt";
import FavButton from "./FavButton";


const renderInstructions = (instructions) => {
  const regex = /(<ol>|<\/ol>|<li>|<\/li>|\\n|Instructions|\d+\.|^\s+|\s+$)/g;
  const filteredInstructions = instructions.replace(regex, "");

  // Split instructions by dot and filter out empty strings
  const instructionsArray = filteredInstructions
    .split(/(?=[A-Z])/)
    .filter((instruction) => instruction.trim() !== "");

  return instructionsArray.map((instruction, index) => (
    <li key={index} className="mb-3">
      {instruction}
    </li>
  ));
};

const RecipeDetails = function ({ recipe, setSelected }) {
  console.log("Recipe:", recipe);

  return (
    <>
      {recipe && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center mt-16 w-5/6 bg-red-900  text-white">
            <div className="w-full flex-col justify-center p-8 items-center">
              <h2 className="text-4xl font-extrabold mb-10 mt-4">
                {recipe.title}
              </h2>



              <div className="flex flex-row">
                {recipe.nutrients.map((nutrient) => {
                  return (
                    <React.Fragment>
                      {nutrient.name === "Carbohydrates" && (
                        <section className="px-8 flex flex-col items-center">
                          <p className="text-4xl font-extrabold text-yellow">
                            {Math.round(nutrient.amount)}
                            {nutrient.unit}
                          </p>
                          <p className="text-lg">Carbs</p>
                        </section>
                      )}

                      {nutrient.name === "Protein" && (
                        <section className="border-x px-8 flex flex-col items-center">
                          <p className="text-4xl font-extrabold text-yellow">
                            {Math.round(nutrient.amount)}
                            {nutrient.unit}
                          </p>
                          <p className="text-lg">Protein</p>
                        </section>
                      )}

                      {nutrient.name === "Fat" && (
                        <section className="border-x px-8 flex flex-col items-center">
                          <p className="text-4xl font-extrabold text-yellow">
                            {Math.round(nutrient.amount)}
                            {nutrient.unit}
                          </p>
                          <p className="text-lg">Fats</p>
                        </section>
                      )}

                      {nutrient.name === "Calories" && (
                        <section className="pr-8 flex flex-col items-center">
                          <p className="text-4xl font-extrabold text-yellow">
                            {Math.round(nutrient.amount)}
                          </p>
                          <p className="text-lg">Calories</p>
                        </section>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="flex flex-col text-lg mt-8">
                {recipe.servings && (
                  <section className="flex flex-row items-center">
                    <ImSpoonKnife />
                    <span className=" pl-2 pr-2">Yield :</span>
                    <span className="text-lg">
                      {recipe.servings} serving(s)
                    </span>
                  </section>
                )}

                {recipe.readyInMinutes && (
                  <section className="flex flex-row items-center">
                    <ImClock />
                    <span className="pl-2 pr-2">Ready :</span>
                    <span className="text-lg">
                      {recipe.readyInMinutes} minutes
                    </span>
                  </section>
                )}

                {recipe.diets.length > 0 && (
                  <section className="flex flex-row items-center">
                    <GiCookingPot />
                    <span className="pl-2 pr-2">Diet(s) :</span>
                    <span className="text-lg flex-wrap">
                      {recipe.diets.join(", ")}
                    </span>
                  </section>
                )}

                {recipe.type.length > 0 && (
                  <section className="flex flex-row items-center">
                    <FaPlateWheat />
                    <span className="pl-2 pr-2">Type(s) :</span>
                    <span className="text-lg">
                      {recipe.type.slice(0, 6).join(", ")}
                      {recipe.type.length > 6 && ", ..."}
                    </span>
                  </section>
                )}

                {recipe.cuisines.length > 0 && (
                  <section className="flex flex-row items-center">
                    <GiCook />
                    <span className="pl-2 pr-3">Cuisine(s) :</span>
                    <span className="text-lg">
                      {recipe.cuisines.join(", ")}
                    </span>
                  </section>
                )}
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-5xl text-yellow pr-8 mt-4"
                >
                  {" "}
                  <FaRegWindowClose />
                </button>
              </div>

              <img
                className="mb-10 w-full h-80 mt-8 p-8"
                src={recipe.image}
                alt=""
              />
            </div>
          </div>
          <div className="bg-white p-8 w-5/6 border border-black">
            <CounterAttempt recipeId={recipe.id} counter_attempt={recipe.counter_attempt}/>
            
            <div className="flex flex-row justify-between">
              <section className="flex border border-black h-10 px-10 items-center">
                <p className="flex items-center">
                  <FaShareSquare />
                  <button className="ml-2">Share Recipe</button>
                </p>
              </section>
              <section className="flex border border-black h-10 px-10 items-center">
                <p className="flex items-center">
                  <FaPrint />
                  <button className="ml-2">Print Recipe</button>
                </p>
              </section>
              <FavButton recipe_id={recipe.id} />
              <section className="flex border border-black h-10 px-8 items-center">
                <p className="flex items-center">
                  <FaStar />
                  <button className="ml-2">Leave a Review</button>
                </p>
              </section>
            </div>

            <section>
              <p className="text-3xl font-extrabold mt-12 mb-8">Ingredients</p>

              <div className="text-lg">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </div>

              <p className="text-3xl font-extrabold mt-12 mb-8">Instructions</p>

              <div className="text-lg">
                <ol className="list-decimal px-4">
                  {recipe.instructions ? (
                    renderInstructions(recipe.instructions)
                  ) : (
                    <div>
                      <p className="text-lg">
                        Unfortunately, we are missing the instructions for this
                        recipe on our app.{" "}
                      </p>
                      <a
                        href={recipe.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline cursor-pointer"
                      >
                        Please visit the recipe owner's website for the complete
                        cooking steps.
                      </a>
                    </div>
                  )}
                </ol>
              </div>

              <p className="text-3xl font-extrabold mt-12 mb-8">
                Nutritional Facts
              </p>

              <div class="overflow-x-auto">
                <table class="min-w-full border-collapse border border-gray-200">
                  <thead class="bg-gray-100">
                    <tr>
                      <th class="px-4 py-2 text-left">Nutrient</th>
                      <th class="px-4 py-2 text-left">Amount per serving</th>
                      {recipe.nutrients[0].percentOfDailyNeeds && (
                        <th class="px-4 py-2 text-left">% Daily Value</th>
                      )}
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    {recipe.nutrients.map((nutrient) => (
                      <tr key={nutrient.name}>
                        <td class="px-4 py-2">{nutrient.name}</td>
                        <td class="px-4 py-2">
                          {nutrient.amount} {nutrient.unit}
                        </td>
                        {nutrient.percentOfDailyNeeds && (
                          <td class="px-4 py-2">
                            {nutrient.percentOfDailyNeeds.toFixed(2)}%
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="self-start w-4/5 ml-40 my-32 border border-yellow rounded-md px-5 py-5 flex gap-144">
            <div className="w-1/3">
              <p className="text-3xl font-extrabold mt-12 mb-4">
                Leave A Review
              </p>
              <p className="text-xl mb-8">
                Made this recipe? Please leave a review
              </p>
              <ReviewForm />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold mt-12 mb-4">Reviews</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";

// const renderInstructions = (instructions) => {
//   const regex = /(<ol>|<\/ol>|<li>|<\/li>|\\n|Instructions)/g;
//   const filteredInstructions = instructions.replace(regex, "");
//   console.log(filteredInstructions.split("."));
//   return filteredInstructions
//     .split(".")
//     .map((instruction) => <li className="mb-3">{instruction}</li>);
// };

// const RecipeDetails = function () {
//   const { id } = useParams();
//   const [recipeDetails, setRecipeDetails] = useState(null);
//   const [recipeReviews, setRecipeReviews] = useState([]);

//   useEffect(() => {
//     const fetchRecipeAndReviews = async function () {
//       try {
//         // Fetch recipe details
//         const recipeResponse = await axios.get(
//           `http://localhost:8080/api/recipes/${id}`
//         );
//         console.log(recipeResponse);
//         const recipeData = recipeResponse.data;
//         console.log(recipeData);

//         // Check if response is ok
//         if (recipeResponse.status === 200) {
//           setRecipeDetails(recipeData);
//         } else {
//           console.error("Error fetching recipe:", recipeData);
//         }

//         // Fetch recipe reviews
//         const reviewsResponse = await axios.get(
//           `http://localhost:8080/api/recipes/${id}/reviews`
//         );
//         console.log(reviewsResponse);
//         const reviewsData = reviewsResponse.data;
//         console.log(reviewsData);

//         // Check if response is ok
//         if (reviewsResponse.status === 200) {
//           setRecipeReviews(reviewsData);
//         } else {
//           console.error("Error fetching recipe reviews:", recipeData);
//         }
//       } catch (error) {
//         console.error("Error", error.message);
//       }
//     };

//     fetchRecipeAndReviews();
//   }, [id]);

//   return (
//     <>
//       {recipeDetails && (
//         <div>
//           <h2 className="text-4xl font-extrabold dark:text-white mb-10">
//             {recipeDetails.title}
//           </h2>
//           <img className="mb-10" src={recipeDetails.image} alt="" />
//           <div className="w-[800px] max-w-[800px]">
//             <p className="text-2xl font-extrabold dark:text-white mb-5">
//               Instructions:
//             </p>
//             <ol className="list-decimal">
//               {renderInstructions(recipeDetails.instructions)}
//             </ol>
//           </div>
//           <p className="mt-10 text-xl">
//             No. of servings: {recipeDetails.number_of_servings}
//           </p>
//           <p className="mt-3 text-xl">
//             Preparation time: {recipeDetails.prep_time} minutes
//           </p>
//           <p className="mt-3 text-xl">Proteins: {recipeDetails.proteins}</p>
//           <p className="mt-3 text-xl">Carbs: {recipeDetails.carbs}</p>
//           <p className="mt-3 text-xl">Fats: {recipeDetails.fats}</p>
//         </div>
//       )}

//       <h3 className="text-3xl mt-20 font-extrabold">Reviews</h3>
//       {recipeReviews.length !== 0 ? (
//         recipeReviews.map((review) => (
//           <div key={review.id} className="mb-5">
//             <p>Rating: {review.rating}</p>
//             <p>Comment: {review.review}</p>
//           </div>
//         ))
//       ) : (
//         <p>There are no reviews yet</p>
//       )}
//     </>
//   );
// };

// export default RecipeDetails;
