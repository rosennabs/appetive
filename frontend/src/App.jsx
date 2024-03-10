import { React } from 'react';
import HomePage from "./routes/HomePage";
import { AppDataProvider } from './contexts/AppDataContext';


function App() {


  return (
    <AppDataProvider>
      <div className="items-center mt-10 text-black font-sans-serif">
        <HomePage />
        </div>
    </AppDataProvider>
  );
}

export default App;
