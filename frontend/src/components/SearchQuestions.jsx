import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';


const cuisines = ['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean','Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

const allergies = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];

const diets = ['Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'];

const dishTypes = ['main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];

const calories = ["< 300", "300 - 499", "500 - 699", "700 - 1000", "> 1000"]


export default function SearchQuestions() {
  const [question, setQuestion] = useState(1);

  const initialValues={
    cuisines: [],
    dishTypes: [],
    diets: [],
    allergies: [],
    calories: []
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
          <div key={option}>
            <label>
              <Field
                type="checkbox"
                name={fieldName}
                value={option}
                checked={values[fieldName].includes(option)}
                onChange={handleChange}

              />
              {option}
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
            {renderOptions("cuisines", cuisines, false, handleChange, values)}
            
            </>
          }

          {question === 2 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">Which meal type would you love to make?</h1>
            {renderOptions("dishTypes", dishTypes, true, handleChange, values)}
            </>
          }

          {question === 3 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">Do you have any dietiary preference?</h1>
            {renderOptions("diets", diets, true, handleChange, values)}
            </>
          }

          {question === 4 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">Do you have any food allergies?</h1>
            {renderOptions("allergies", allergies, true, handleChange, values)}
            </>
          }

          {question === 5 &&
            <>
            <h1 className="font-bold text-3xl mb-4  text-amber-700 text-center">What calorie range would you prefer?</h1>
            {renderOptions("calories", calories, true, handleChange, values)}
            <button type="submit">Search</button>
            </>
          }
           
        </Form>
      )}

    </Formik>
    
  );
};

