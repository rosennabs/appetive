import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import { AppDataContext } from '../contexts/AppDataContext';
import { FaSearch } from "react-icons/fa";


export default function SearchBar() {
  
  
  const { handleSearchSubmission, toggleSearchBar } = useContext(AppDataContext);
   

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
          
          <div className="flex justify-center items-center bg-red-900 border border-gray-300 px-8 mb-8  shadow-lg p-16">
          
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Search recipes"
            autoComplete='off'
            className="px-4 py-2 text-xl border border-gray-300 rounded-md focus:outline-none focus:border-amber-500"
            />

            <div className='ml-4 text-xl text-white cursor-pointer' onClick={() => handleSubmit()}>
            <FaSearch />
            </div>

            <div className='ml-4 text-xl text-white cursor-pointer underline underline-offset-2' onClick={() => toggleSearchBar()}>
            <p>Close</p>
            </div>
            
           </div>
          
            
          
        </Form>
      )}
      
    </Formik>
    
  )
}
