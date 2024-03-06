import { React } from 'react';
import useAppData from './hooks/useAppData';
import HomePage from "./routes/HomePage";


function App() {

  //Destructure the useApplicationData function
  const { state } = useAppData();


  return (
    <div className="items-center mt-10 text-xl text-amber-700 uppercase font-bold font-sans-serif">
      <HomePage
        mealCategories={state.mealCategories}
      />
    </div>
  );
}

export default App;
