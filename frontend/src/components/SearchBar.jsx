import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { AppDataContext } from '../contexts/AppDataContext';
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {

  //Access recipes from state
  const { state, fetchRecipeInfo, setRecipes, handleSearchSubmission } = useContext(AppDataContext);
  const { recipes } = state;
   
    
    //window.location.reload();
    


  return (
    <Formik
      initialValues = {
        { title: '' } 
      }

      onSubmit={(values, actions) => {
        handleSearchSubmission(values);
        console.log("values: ", values);
        
        actions.setSubmitting(false);
      }}
      
    >
      {({ handleSubmit, handleChange, values}) => (
        <Form onSubmit={handleSubmit}>
          
          <div className="flex justify-center items-center bg-white border border-gray-300 rounded-md shadow-lg p-16">
          
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Search recipes"
            autoComplete='off'
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-500"
            />

            <div className='ml-4' onClick={() => handleSubmit()}>
            <FaSearch />
            </div>
            
           </div>
          
            
          
        </Form>
      )}
      
    </Formik>
    
  )
}
