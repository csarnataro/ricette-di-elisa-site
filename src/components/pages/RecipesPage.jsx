import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import CategoriesBar from '../CategoriesBar'
import { useRouteMatch } from 'react-router-dom'
import fetchFromApi from '../../utils/fetch-from-api'
import processAndUpdateRecipes from '../../utils/process-and-update-recipes'
import RecipesGrid from '../RecipesGrid'
import Layout from '../Layout'
import { SearchBox } from '../Search'

const RecipesPage = () => {
  const pageNumber = 1
  const [categories, setCategories] = useState(null)
  const [recipes, setRecipes] = useState(null)

  const [mustShowSearchBox, setShowSearchBox] = useState(false)

  const match = useRouteMatch('/:categoryName')
  const categoryName =
    (match && match.params.categoryName) || 'tutte-le-ricette'

  const onClickSearchIcon = () => {
    setShowSearchBox(!mustShowSearchBox)
  }

  const fetchRecipesByCategoryName = categoryName => {
    const queryByTag =
      categoryName === 'tutte-le-ricette'
        ? ''
        : `&filterByFormula=(FIND("${categoryName}",LOWER({Categoria}))>0)`

    const recipesUrl = `https://ricette-di-elisa-api.netlify.app/.netlify/functions/recipes/?sort[0][field]=Name&sort[0][direction]=asc${queryByTag}`
    fetchFromApi(
      recipesUrl,
      processAndUpdateRecipes(setRecipes),
      json => json.records
    )
  }

  const fetchRecipesByQuery = query => {
    const queryFormula = `&filterByFormula=(FIND("${query}",LOWER({Name}))>0)`

    const recipesUrl = `https://ricette-di-elisa-api.netlify.app/.netlify/functions/recipes/?sort[0][field]=Name&sort[0][direction]=asc${queryFormula}`
    fetchFromApi(
      recipesUrl,
      processAndUpdateRecipes(setRecipes),
      json => json.records
    )
  }

  const fetchCategories = () => {
    const url =
      'https://ricette-di-elisa-api.netlify.app/.netlify/functions/categories/?sort[0][field]=Name&sort[0][direction]=asc'

    fetchFromApi(
      url,
      records => {
        const retrievedCategories = records
          .filter(category => category.fields.Name)
          .map(category => ({
            name: category?.fields?.Name,
            id: category.id
          }))
        setCategories(retrievedCategories)
      },
      json => json.records
    )
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchRecipesByCategoryName(categoryName)
  }, [categoryName])

  return (
    <Layout>
      <CategoriesBar
        categories={categories}
        categoryName={categoryName}
        isSearchButtonActive={mustShowSearchBox}
        onClickSearchIcon={onClickSearchIcon}
      />
      <SearchBox
        show={mustShowSearchBox}
        submitSearch={value => {
          fetchRecipesByQuery(value)
          // console.log(`Should be searching ${value}`)
          setShowSearchBox(false)
        }}
        resetSearch={e => setShowSearchBox(false)}
      />
      <RecipesGrid recipes={recipes} />
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
