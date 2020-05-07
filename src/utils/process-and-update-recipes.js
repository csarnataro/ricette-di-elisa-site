const filterRecipes = recipe => recipe?.fields?.Name

const getCategoriesAsString = recipe => recipe?.fields?.ListaCategorie

const split = str => typeof str === 'string' && str.split(',') 

const getTags = recipe => {
  const categoriesAsString = getCategoriesAsString(recipe)
  return split(categoriesAsString)
}

const processRecipe = recipe => {
  return {
    id: recipe.id,
    title: recipe?.fields?.Name,
    ingredients: recipe?.fields?.Ingredienti,
    process: recipe?.fields?.Esecuzione,
    suggestedBy: recipe?.fields?.['Suggerita da'],
    categoryIds: recipe?.fields?.Categoria,
    tags: getTags(recipe)
  }
}

/**
 * 
 * @param {function} setRecipes sets the recipes using a hook `useState`
 */
const processAndUpdateRecipes = ({records, offset}) => {
  const filteredRecords = records
    .filter(filterRecipes)
    .map(processRecipe)

  return {records: filteredRecords, offset}
}

export default processAndUpdateRecipes