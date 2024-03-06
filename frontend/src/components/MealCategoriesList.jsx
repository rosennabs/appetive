import React from 'react'

export default function MealCategoriesList(props) {
  return (
    <div>
      <h2 className="border-b-2 border-black text-center mb-4 pb-2">Categories</h2>
      <section className="flex flex-wrap mx-64">
        {props.mealCategories.map(category => (
          <div key={category.idCategory} className="w-1/3 p-4">

            <img src={category.strCategoryThumb} alt="Regular food image" className="mx-auto mb-2 rounded-full" style={{ maxWidth: '250px' }}/>
            <p className="text-center">{category.strCategory}</p>

          </div>
        ))}

      </section>
    </div>
  )
}
