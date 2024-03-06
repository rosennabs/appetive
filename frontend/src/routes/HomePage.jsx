import React from 'react'
import MealCategoriesList from '../components/MealCategoriesList.jsx'

export default function HomePage(props) {
  return (
    <div>
      <h1>Nav will go here! </h1>

      <MealCategoriesList
        mealCategories={props.mealCategories}
      />
    </div>
  )
}
