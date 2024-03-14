import React from 'react';
import { Formik, Form, Field } from 'formik';
import { AppDataContext } from '../contexts/AppDataContext';

export default function SearchBar() {

  

  return (
    <Formik
      initialValues={{query: ""}}
      onSubmit={(values, actions) => {
        // Handle form submission

         console.log(values);
        
        actions.setSubmitting(false);
      }}
      
    >
      {({ handleSubmit, handleChange, values}) => (
        <Form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center bg-white border border-gray-300 rounded-md shadow-lg p-16">
          
          <input
            type="text"
            name="query"
            value={values.query}
            onChange={handleChange}
            placeholder="Search recipes"
            autoComplete='off'
            aria-autocomplete='list'
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-amber-500"
            />
            </div>
            
          
        </Form>
      )}

      

      
    </Formik>
    
  )
}
