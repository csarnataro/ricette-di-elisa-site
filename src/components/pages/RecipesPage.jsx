import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import CategoriesBar from '../CategoriesBar'
import Loader from '../Loader'
import Layout from '../Layout'
import RecipesGrid from '../RecipesGrid'
import Pagination from '../Pagination'

const FEED_QUERY = gql`
  query Recipes(
    $categoryName: String
    $first: Int = 100
    $skip: Int = 0
    $query: String
  ) {
    recipes(
      first: $first
      skip: $skip
      categoryName: $categoryName
      query: $query
    ) {
      totalCount
      records {
        id
        title
        tags
        ingredients
        process
        suggestedBy
      }
    }
    categories {
      id
      name
    }
  }
`

const RecipesPage = () => {
  const DISPLAY_ITEM_NUMBER = 18
  const [currentCategory, setCurrentCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [getData, { loading, error, data }] = useLazyQuery(FEED_QUERY)
  const initialParams = {
    variables: {
      first: DISPLAY_ITEM_NUMBER,
      skip: 0
    }
  }
  const searchRecipes = query => {
    setCurrentCategory(`ricerca '${query}'`)
    getData({ variables: { query } })
  }

  useEffect(() => {
    getData(initialParams)
  }, [])

  if (loading || !data) return <Loader />
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const {
    categories,
    recipes: { records, totalCount }
  } = data

  return (
    <Layout doSearch={searchRecipes}>
      <CategoriesBar
        onClickCategory={categoryName => {
          setCurrentCategory(categoryName)
          categoryName
            ? getData({ variables: { categoryName } })
            : getData(initialParams)
        }}
        categories={categories}
        categoryName={currentCategory}
      />
      <RecipesGrid recipes={records} />
      {currentCategory === null && (
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          getData={getData}
          pageSize={DISPLAY_ITEM_NUMBER}
          setCurrentPage={setCurrentPage}
        />
      )}
      <div className='m-3 text-center '>
        <span>{`${records.length} ricette in questa pagina `}</span>
        {currentCategory && <span>: {currentCategory}</span>}
      </div>
    </Layout>
  )
}

export default RecipesPage
