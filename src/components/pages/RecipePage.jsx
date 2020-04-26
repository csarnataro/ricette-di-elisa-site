import dayjs from 'dayjs'
import 'dayjs/locale/it'
import maybe from 'mjn'

import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import Layout from '../Layout'
import Tag from '../Tag'
import fetchFromApi from '../../utils/fetch-from-api'

// const fetchRecord = (url, callback) => {
//   fetch(url)
//     .then(response => {
//       if (response.status >= 200 && response.status <= 299) {
//         return response.json()
//       }
//       throw Error(response.statusText)
//     })
//     .then(callback)
//     .catch(error => {
//       // Handle the error
//       throw error
//     })
// }

const RecipePage = () => {
  const [recipe, setRecipe] = useState({})
  const match = useRouteMatch('/ricetta/:slug')
  const recipeTokens =
    match && match.params.slug && match.params.slug.split('-')
  const recipeId = recipeTokens[recipeTokens.length - 1]

  useEffect(() => {
    const url = `https://ricette-di-elisa-api.netlify.app/.netlify/functions/recipes/${recipeId}`
    fetchFromApi(url, record => {
      if (!record.fields) {
        return
      }
      const categoriesAsString = maybe(record, 'fields.ListaCategorie')
      const tags = categoriesAsString && categoriesAsString.split(',')

      const retrievedRecipe = {
        id: record.id,
        title: maybe(record, 'fields.Name'),
        ingredients: maybe(record, 'fields.Ingredienti'),
        process: maybe(record, 'fields.Esecuzione'),
        suggestedBy: record.fields['Suggerita da'],
        categoryIds: maybe(record, 'fields.Categoria'),
        created: record.createdTime,
        tags
      }
      setRecipe(retrievedRecipe)
    })
  }, [recipeId])

  const showSkeleton = !recipe.title

  return (
    <Layout>
      <div className='mt-2 pl-2'>
        <Link
          to='/tutte-le-ricette'
          className='hover:text-red-700 text-l hover:underline'
        >
          &lt; Torna alle ricette
        </Link>
      </div>
      <div>
        <h2 className='w-full pt-10 text-3xl lg:text-5xl'>
          {showSkeleton ? <Skeleton width={300} /> : recipe.title}
        </h2>
        <div>
          <span className='text-xs text-gray-800 capitalize'>
            {showSkeleton ? (
              <Skeleton width={80} />
            ) : (
              dayjs(recipe.created)
                .locale('it')
                .format('DD MMMM YYYY')
            )}
          </span>
          <span className='ml-8'>
            {showSkeleton ? (
              <Skeleton width={80} />
            ) : (
              recipe.tags &&
              recipe.tags.map(tag => <Tag key={tag}>{`#${tag}`}</Tag>)
            )}
          </span>
        </div>
        <h3 className='text-3xl mt-8'>Ingredienti</h3>
        <div className='text-gray-800'>
          {showSkeleton ? <Skeleton /> : recipe.ingredients}
        </div>
        <h3 className='text-3xl mt-8'>Esecuzione</h3>
        <div className='text-gray-800'>{recipe.process}</div>
        {showSkeleton ? (
          <Skeleton lines={2} />
        ) : (
          recipe.suggestedBy && (
            <div className='my-8'>
              <h3 className='text-3xl'>Suggerita da</h3>
              <div className='text-gray-800'>{recipe.suggestedBy}</div>
            </div>
          )
        )}
      </div>
    </Layout>
  )
}

export default RecipePage
