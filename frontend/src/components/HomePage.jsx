import RecipeDetails from "./RecipeDetails";
import SearchForm from "./SearchForm";
import Recipes from "./Recipes";

function HomePage({
  selectedRecipe,
  setSelected,
  showSearchBar,
  shareLink,
  generateShareLink,
  copySuccess,
  setCopySuccess,
}) {
  return (
    <>
      {selectedRecipe ? (
        <RecipeDetails
          recipe={selectedRecipe}
          setSelected={setSelected}
          shareLink={shareLink}
          generateShareLink={generateShareLink}
          copySuccess={copySuccess}
          setCopySuccess={setCopySuccess}
        />
      ) : (
        <div>
          {!showSearchBar && <SearchForm />}
          <Recipes setSelected={setSelected} showSearchBar={showSearchBar} />
        </div>
      )}
    </>
  );
}

export default HomePage;
