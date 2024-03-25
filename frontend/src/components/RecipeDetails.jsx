import React, { useRef } from "react";
import {
  FaShareSquare,
  FaPrint,
  FaStar,
  FaRegWindowClose,
} from "react-icons/fa";
import { FaPlateWheat } from "react-icons/fa6";
import { ImSpoonKnife, ImClock } from "react-icons/im";
import { GiCook, GiCookingPot } from "react-icons/gi";
import { useEffect } from "react";
import CounterAttempt from "./CounterAttempt";
import FavButton from "./FavButton";
import ReviewList from "./ReviewList";

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

const RecipeDetails = function ({
  recipe,
  setSelected,
  generateShareLink,
  copySuccess,
  setCopySuccess,
}) {
  // Reset the link copied to clipboard message when component unmounts
  useEffect(() => {
    return () => {
      setCopySuccess(false);
    };
  }, []);

  const printRecipe = () => {
    window.print();
  };

  const reviewRef = useRef(null);

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
                      {recipe.diets.slice(0, 5).join(", ")}
                      {recipe.diets.length > 5 && ", ..."}
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
            <div className="flex flex-col">
              
              <CounterAttempt
                recipeId={recipe.id}
                counter_attempt={recipe.counter_attempt}
              />

              {copySuccess && (
                <span className="text-amber-700">
                  Link copied to clipboard!
                </span>
              )}
            </div>

            <div className="flex flex-row justify-between">
              <section className="flex border border-black h-10 px-10 items-center">
                <div className="flex items-center">
                  <FaShareSquare />
                  <button
                    className="ml-2"
                    onClick={() => generateShareLink(recipe.id)}
                  >
                    Share Recipe
                  </button>
                </div>
              </section>

              <section className="flex border border-black h-10 px-10 items-center">
                <p className="flex items-center">
                  <FaPrint />
                  <button className="ml-2" onClick={() => printRecipe()}>
                    Print Recipe
                  </button>
                </p>
              </section>
              <FavButton recipe_id={recipe.id} />
              <section className="flex border border-black h-10 px-8 items-center">
                <p className="flex items-center">
                  <FaStar />
                  <button
                    className="ml-2"
                    onClick={() => {
                      reviewRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Leave a Review
                  </button>
                </p>
              </section>
            </div>

            <section>
              <p className="text-3xl font-extrabold mt-12 mb-8">Ingredients</p>

              <div className="text-lg">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.id.length > 1
                      ? ingredient.original
                      : `${ingredient.name}, ${ingredient.amount}${ingredient.unit}`}
                  </li>
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

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Nutrient</th>
                      <th className="px-4 py-2 text-left">
                        Amount per serving
                      </th>
                      {recipe.nutrients[0].percentOfDailyNeeds && (
                        <th className="px-4 py-2 text-left">% Daily Value</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recipe.nutrients.map((nutrient) => (
                      <tr key={nutrient.name}>
                        <td className="px-4 py-2">{nutrient.name}</td>
                        <td className="px-4 py-2">
                          {nutrient.amount} {nutrient.unit}
                        </td>
                        {nutrient.percentOfDailyNeeds && (
                          <td className="px-4 py-2">
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

          <div
            ref={reviewRef}
            className="flex flex-col justify-center items-center"
          >
            <ReviewList recipeId={recipe.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
