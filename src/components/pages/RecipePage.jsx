import { gql } from 'apollo-boost'
import dayjs from 'dayjs'
import 'dayjs/locale/it'
import React from 'react'
import { useQuery } from 'react-apollo'
import { Link, useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import Loader from '../Loader'
import Tag from '../Tag'

const RECIPE_QUERY = gql`
  query Recipe($id: String!) {
    recipe(id: $id) {
      id
      title
      tags
      ingredients
      process
      suggestedBy
    }
  }
`
const RecipePage = () => {
  // const [recipe, setRecipe] = useState({})
  const match = useRouteMatch('/ricetta/:slug')
  const recipeTokens =
    match && match.params.slug && match.params.slug.split('-')
  const recipeId = recipeTokens[recipeTokens.length - 1]

  const { data, loading, error } = useQuery(RECIPE_QUERY, {
    variables: { id: recipeId }
  })

  if (loading || !data) return <Loader />
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const { recipe } = data
  return (
    <Layout>
      <div className='mt-2 pl-2'>
        <Link to='/' className='hover:text-red-700 text-l hover:underline'>
          &lt; Torna alle ricette
        </Link>
      </div>
      <div>
        <h2 className='w-full pt-10 text-3xl lg:text-5xl'>{recipe.title}</h2>
        <div>
          <span className='text-xs text-gray-800 capitalize'>
            {dayjs(recipe.created)
              .locale('it')
              .format('DD MMMM YYYY')}
          </span>
          <span className='ml-8'>
            {recipe.tags &&
              recipe.tags
                .split(',')
                .map(tag => <Tag key={tag}>{`#${tag}`}</Tag>)}
          </span>
        </div>
        <h3 className='text-3xl mt-8'>Ingredienti</h3>
        <div className='text-gray-800'>{recipe.ingredients}</div>
        <h3 className='text-3xl mt-8'>Esecuzione</h3>
        <div className='text-gray-800'>{recipe.process}</div>
        {recipe.suggestedBy && (
          <div className='my-8'>
            <h3 className='text-3xl'>Suggerita da</h3>
            <div className='text-gray-800'>{recipe.suggestedBy}</div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default RecipePage
