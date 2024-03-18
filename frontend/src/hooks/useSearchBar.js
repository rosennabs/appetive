import { useState } from "react";

//Define state to manage search bar
export function useSearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return { showSearchBar, toggleSearchBar };

}


