import React, { useState, useContext } from 'react';
import { AppDataContext } from '../contexts/AppDataContext'; 
import { Formik, Form, Field } from 'formik';



export default function SearchQuestions() {
   //Access recipes from state
  const { state } = useContext(AppDataContext);
  const { recipes } = state;
  console.log(recipes);

  // recipes.map((recipe) => {
  //   if (recipe.information)
  // })
  

  const [question, setQuestion] = useState(1);

  const options = {

  cuisines: [
    { label: 'African', value: 'African', image: ''},
    { label: 'Asian', value: 'Asian', image: ''},
    { label: 'American', value: 'American', image: ''}
  ],

  mealTypes: [
    { label: 'main course', value: 'main course', image: '' },
    { label: 'side dish', value: 'side dish', image: '' },
    { label: 'dessert', value: 'dessert', image: '' }
  ],

  diets: [
    { label: 'Ketogenic', value: 'Ketogenic', image: '' },
    { label: 'Vegetarian', value: 'Vegetarian', image: '' },
    { label: 'Lacto-Vegetarian', value: 'Lacto-Vegetarian', image: '' }
  ],

  allergies: [
    { label: 'Dairy', value: 'Dairy', image: '' },
    { label: 'Peanut', value: 'Peanut', image: '' },
    { label: 'Seafood', value: 'Seafood', image: '' }
  ],

  calories: [
    { label: "< 300", value: "< 300" },
    { label: "300 - 499", value: "300 - 499" },
    { label: "500 - 699", value: "500 - 699" },
    { label: "700 - 1000", value: "700 - 1000" },
    { label: "> 1000", value: "> 1000" }
  ],

  // const excludeIngredients: [
  //   { label: 'Dairy', value: 'Dairy' },
  //   { label: 'Peanut', value: 'Peanut' },
  //   { label: 'Seafood', value: 'Seafood' }
  // ];
}

  const initialValues={
    cuisines: [],
    mealTypes: [],
    diets: [],
    allergies: [],
    calories: [],
    excludeIngredients: []
  }

  const handleNextQuestion = () => {
    setQuestion(question + 1);
  };

  const handlePrevQuestion = () => {
    setQuestion(question - 1);
  };

  const renderOptions = (fieldName, optionsArray, showBackButton, handleChange, values) => {
    return (
      <div>
        {optionsArray.map(option => (
          <div key={option.value}>
            <label>
              <Field
                type="checkbox"
                name={fieldName}
                value={option.value}
                checked={values[fieldName].includes(option.value)}
                onChange={handleChange}

              />
              {option.label}
            </label>
          </div>
        ))}
        {showBackButton && <button type="button" onClick={handlePrevQuestion}>Back</button>}
        {question < 5 && <button type="button" onClick={handleNextQuestion}>Next</button>}
      </div>
    ); 
  };

  
  return (
    
    <Formik
      
      initialValues={initialValues}

      onSubmit={(values, actions) => {
        //Handle form submission
        console.log(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form onSubmit={handleSubmit}>

          <p className='text-xs mb-4 uppercase font-serif text-gray-500 text-center'>Personalize your search</p>

          {question === 1 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">Which cuisines most interests you?</h1>
            {renderOptions("cuisines", options.cuisines, false, handleChange, values)}
            
            </>
          }

          {question === 2 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">Which meal type would you love to make?</h1>
            {renderOptions("mealTypes", options.mealTypes, true, handleChange, values)}
            </>
          }

          {question === 3 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">Do you have any dietiary preference?</h1>
            {renderOptions("diets", options.diets, true, handleChange, values)}
            </>
          }

          {question === 4 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">Do you have any food allergies?</h1>
            {renderOptions("allergies", options.allergies, true, handleChange, values)}
            </>
          }

          {question === 5 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">What calorie range would you prefer?</h1>
            {renderOptions("calories", options.calories, true, handleChange, values)}
            <button type="submit">Search</button>
            </>
          }
           
        </Form>
      )}

    </Formik>
    
  );
};

