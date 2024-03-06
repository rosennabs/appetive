import { React } from 'react';
import useAppData from './hooks/useAppData';
import HomePage from "./routes/HomePage";
import { AppDataProvider } from './contexts/AppDataContext';


function App() {


  return (
    <AppDataProvider>
      <div className="items-center mt-10 text-xl text-amber-700 uppercase font-bold font-sans-serif">
        <HomePage />
        </div>
    </AppDataProvider>
  );
}

export default App;
