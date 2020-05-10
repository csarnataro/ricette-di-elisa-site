import React, { memo } from 'react'
import Card from './Card'

const emptyRecipesSection = [
  { id: '-1' },
  { id: '-2' },
  { id: '-3' },
  { id: '-4' },
  { id: '-5' },
  { id: '-6' }
]

const RecipesGrid = ({ recipes }) => {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 py-3'>
      {recipes
        ? recipes.map(recipe => <Card recipe={recipe} key={recipe.id} />)
        : emptyRecipesSection.map(recipe => (
            <Card recipe={recipe} key={recipe.id} />
          ))}
    </div>
  )
}

export default memo(RecipesGrid)
