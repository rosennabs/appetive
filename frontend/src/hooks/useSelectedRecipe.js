import { useState } from "react";

export function useSelectedRecipe() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const setSelected = (recipe) => {
    setSelectedRecipe(recipe);
  };
  return { selectedRecipe, setSelected };
}