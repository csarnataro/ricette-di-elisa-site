import maybe from 'mjn'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useRouteMatch } from 'react-router-dom'
import Card from '../Card'
import Layout from '../Layout'
import TabButton from '../TabButton'
import fetchFromApi from '../../utils/fetch-from-api'

// import getPageNumberAndCategory from '../utils/get-page-number-and-category';

const emptyRecipesSection = [
  { id: '-1' },
  { id: '-2' },
  { id: '-3' },
  { id: '-4' },
  { id: '-5' },
  { id: '-6' }
]

const RecipesPage = () => {
  const pageNumber = 1

  const match = useRouteMatch('/:categoryName')
  const categoryName =
    (match && match.params.categoryName) || 'tutte-le-ricette'

  const [categories, setCategories] = useState(null)
  const [recipes, setRecipes] = useState(null)

  const updateRecipes = categoryName => {
    const queryByTag =
      categoryName === 'tutte-le-ricette'
        ? ''
        : `&filterByFormula=(FIND("${categoryName}",LOWER({Categoria}))>0)`

    const recipesUrl = `https://ricette-di-elisa-api.netlify.app/.netlify/functions/recipes/?sort[0][field]=Name&sort[0][direction]=asc${queryByTag}`
    fetchFromApi(
      recipesUrl,
      records => {
        const retrievedRecipes = records
          .filter(recipe => recipe.fields.Name)
          .map(recipe => {
            const categoriesAsString = maybe(recipe, 'fields.ListaCategorie')
            const tags = categoriesAsString && categoriesAsString.split(',')
            return {
              id: recipe.id,
              title: maybe(recipe, 'fields.Name'),
              ingredients: maybe(recipe, 'fields.Ingredienti'),
              process: maybe(recipe, 'fields.Esecuzione'),
              suggestedBy: recipe && recipe.fields['Suggerita da'],
              categoryIds: maybe(recipe, 'fields.Categoria'),
              tags
            }
          })
        setRecipes(retrievedRecipes)
      },
      json => json.records
    )
  }

  const updateCategories = () => {
    const url =
      'https://ricette-di-elisa-api.netlify.app/.netlify/functions/categories/?sort[0][field]=Name&sort[0][direction]=asc'

    fetchFromApi(
      url,
      records => {
        const retrievedCategories = records
          .filter(category => category.fields.Name)
          .map(category => ({
            name: maybe(category, 'fields.Name'),
            id: category.id
          }))
        setCategories(retrievedCategories)
      },
      json => json.records
    )
  }

  useEffect(() => {
    updateCategories()
  }, [])

  useEffect(() => {
    updateRecipes(categoryName)
  }, [categoryName])

  return (
    <Layout>
      <div className='w-full justify-center flex-wrap my-2 lg:my-6 flex flex-row'>
        <span className='m-1'>
          <TabButton
            url='/'
            label='Tutti'
            isActive={categoryName === 'tutte-le-ricette'}
          />
        </span>
        {categories
          ? categories.map(category => (
              <span className='m-1' key={category.id}>
                <TabButton
                  url={`/${category.name.toLowerCase()}`}
                  label={category.name}
                  isActive={categoryName === category.name.toLowerCase()}
                />
              </span>
            ))
          : [1, 2, 3].map(i => (
              <span key={i} className='mx-1'>
                <Skeleton width={80} height={32} />
              </span>
            ))}
      </div>
      <div className='grid gap-6 grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3  py-3'>
        {recipes
          ? recipes.map(recipe => <Card recipe={recipe} key={recipe.id} />)
          : emptyRecipesSection.map(recipe => (
              <Card recipe={recipe} key={recipe.id} />
            ))}
      </div>
      <div className='text-center mt-6'>
        <span>Page #{pageNumber}</span>
        <span className='ml-3'>
          {categoryName && <span>Category {categoryName}</span>}
        </span>
      </div>
    </Layout>
  )
}

RecipesPage.propTypes = {
  //   index: PropTypes.string,
  categoryName: PropTypes.string
  //   uri: PropTypes.string.isRequired,
}

RecipesPage.defaultProps = {
  //   index: '1',
  categoryName: 'tutte-le-ricette'
}

export default RecipesPage
