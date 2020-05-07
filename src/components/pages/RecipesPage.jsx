import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import CategoriesBar from '../CategoriesBar'
import { Link } from 'react-router-dom'
import fetchFromApi from '../../utils/fetch-from-api'
import processAndUpdateRecipes from '../../utils/process-and-update-recipes'
import RecipesGrid from '../RecipesGrid'
import Layout from '../Layout'
import { SearchBox } from '../Search'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH_TO_NEXT_PAGE':
      return {
        ...state,
        currentPage: state.currentPage + 1,
        showPrevPageLink: state.currentPage >= 0,
        showNextPageLink: state.currentPage < state.recipes.length
      }
    case 'SWITCH_TO_PREV_PAGE':
      return {
        ...state,
        currentPage: state.currentPage - 1,
        showPrevPageLink: state.currentPage > 1,
        showNextPageLink: state.currentPage < state.recipes.length
      }
    case 'LOADING_STARTED':
      return state
    case 'CATEGORIES_FETCHED':
      return { ...state, categories: action.payload }
    // Object.assign({}, state, { categories: action.payload })
    case 'RECIPES_FETCHED':
      const pageNumber = state.currentPage
      const fetchedPage = action.payload
      const recipesPage = {
        recipes: fetchedPage.records,
        offset: fetchedPage.offset
      }
      const showNextPageLink = !!fetchedPage.offset
      const recipes = state.recipes
      console.log(`Adding at index: ${pageNumber}`)
      recipes[pageNumber] = recipesPage
      return {
        ...state,
        recipes,
        showNextPageLink,
        showPrevPageLink: state.currentPage > 0
      }

    default:
      return state
  }
}

const initialState = {
  categories: [
    { id: 1, name: 'Primi' },
    { id: 2, name: 'Secondi' }
  ],
  currentPage: 0,
  currentCategory: null,
  showNextPageLink: false,
  showPrevPageLink: false,
  searchBoxOpen: false,
  searchBoxText: null,
  recipes: [
    {
      recipes: []
    }
  ]
}

const RecipesPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(`state: ${JSON.stringify(state, null, 2)}`)
  // const pageNumber = 1
  // const [categories, setCategories] = useState(null)
  // const [recipes, setRecipes] = useState(null)
  // const [nextPageLink, setNextPageLink] = useState(null)

  // const [mustShowSearchBox, setShowSearchBox] = useState(false)

  // const match = useRouteMatch('/:categoryName/:offset1/:offset2')
  // const categoryName = match?.params?.categoryName || 'tutte-le-ricette'

  // const offset =
  //   match?.params?.offset1 &&
  //   `${match?.params?.offset1}/${match?.params?.offset2}`
  // console.log(`offset is ${offset}`)

  // const onClickSearchIcon = () => {
  //   setShowSearchBox(!mustShowSearchBox)
  // }

  const goToPrevPage = () => {
    dispatch({ type: 'SWITCH_TO_PREV_PAGE' })
  }
  const loadNextPage = () => {
    const offset = state.recipes[state.currentPage].offset
    if (!offset) return
    dispatch({ type: 'SWITCH_TO_NEXT_PAGE' })
    if (state.recipes[state.currentPage + 1]) {
      console.log(`Next page already loaded`)
    } else {
      console.log(`Must load next page with offset [${offset}]`)
      fetchRecipesByOffset(offset).then(records => {
        console.log(
          `records (by offset) for recipes: ${JSON.stringify(records)}`
        )
        dispatch({ type: 'RECIPES_FETCHED', payload: records })
        // setTimeout(() => dispatch({ type: 'SWITCH_TO_NEXT_PAGE' }), 60000)
      })
    }
  }

  const fetchRecipesByCategoryName = categoryName => {
    const queryByTag =
      categoryName == null
        ? ''
        : `&filterByFormula=(FIND("${categoryName}",LOWER({Categoria}))>0)`

    const recipesUrl = `https://ricette-di-elisa-api.netlify.app/.netlify/functions/recipes/?pageSize=15&sort[0][field]=Name&sort[0][direction]=asc${queryByTag}`
    return fetchFromApi(
      recipesUrl,
      json => ({ records: json.records, offset: json.offset }),
      processAndUpdateRecipes
    )
  }

  const fetchRecipesByOffset = offset => {
    if (!offset) return
    const recipesUrl = `https://ricette-di-elisa-api.netlify.app/.netlify/functions/recipes/?pageSize=15&offset=${offset}`

    console.log(recipesUrl)
    return fetchFromApi(
      recipesUrl,
      json => ({ records: json.records, offset: json.offset }),
      processAndUpdateRecipes
    )
  }

  // const fetchRecipesByQuery = query => {
  //   const queryFormula = `&filterByFormula=(FIND("${query}",LOWER({Name}))>0)`

  //   const recipesUrl = `https://ricette-di-elisa-api.netlify.app/.netlify/functions/recipes/?pageSize=15&sort[0][field]=Name&sort[0][direction]=asc${queryFormula}`
  //   fetchFromApi(recipesUrl, processAndUpdateRecipes(setRecipes), json => {
  //     // setNextPageLink(json.offset)
  //     return { records: json.records, offset: json.offset }
  //   })
  // }

  const fetchCategories = () => {
    const url =
      'https://ricette-di-elisa-api.netlify.app/.netlify/functions/categories/?sort[0][field]=Name&sort[0][direction]=asc'

    return fetchFromApi(
      url,
      json => json.records,
      records =>
        records
          .filter(category => category.fields.Name)
          .map(category => ({
            name: category?.fields?.Name,
            id: category.id
          }))
    )
    // console.log(`typeof a: ${typeof a}`)
    // return a
  }

  useEffect(() => {
    dispatch({ type: 'LOADING_STARTED' })
    fetchCategories().then(records => {
      dispatch({ type: 'CATEGORIES_FETCHED', payload: records })
    })
  }, [])

  useEffect(() => {
    // if (offset) {
    //   fetchRecipesByOffset(offset)
    // } else {
    fetchRecipesByCategoryName(state.currentCategory).then(records => {
      console.log(`records for recipes: ${JSON.stringify(records)}`)
      dispatch({ type: 'RECIPES_FETCHED', payload: records })
    })
    // }
  }, [state.currentCategory])

  return (
    <Layout>
      {/* <div class='loader ease-linear rounded-full inline-block border-8 border-t-8 h-16 w-16'></div> */}
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <CategoriesBar
        categories={state.categories}
        categoryName={state.currentCategory}
        isSearchButtonActive={false}
        onClickSearchIcon={() => 1}
      />
      <SearchBox
        show={false}
        submitSearch={
          () => 0
          /*value => {
          fetchRecipesByQuery(value)
          // console.log(`Should be searching ${value}`)
          setShowSearchBox(false)
        }*/
        }
        resetSearch={e => 0 /*setShowSearchBox(false) */}
      />
      <div className='text-center mt-6'>
        {state.showPrevPageLink && (
          <button onClick={goToPrevPage}>&laquo; Pagina precedente</button>
        )}
        {state.showNextPageLink && (
          <button onClick={loadNextPage}>Pagina successiva &raquo;</button>
        )}

        <span className='ml-3'>
          {state.currentCategory && (
            <span>Category {state.currentCategory}</span>
          )}
        </span>
      </div>
      <pre>{`${state.currentPage} / ${state.recipes.length}`}</pre>
      <RecipesGrid
        recipes={
          state.recipes[state.currentPage] &&
          state.recipes[state.currentPage].recipes
        }
      />
      <div className='text-center mt-6'>
        {state.showNextPageLink && (
          <Link to={`/`}>Pagina successiva &raquo;</Link>
        )}

        <span className='ml-3'>
          {state.currentCategory && (
            <span>Category {state.currentCategory}</span>
          )}
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
