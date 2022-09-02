results.addEventListener('click', getRecipeDetails)

async function getRecipeDetails(event) {
  try {
    const titleSection = document.querySelector('.recipe-title')
    const ingredientsSection = document.querySelector('.recipe-ingredients')
    const measuresSection = document.querySelector('.recipe-measures')
    const recipeDescription = document.querySelector('.recipe-description')

    if (ingredientsSection.children) {
      const array = Array.from(ingredientsSection.children)
      array.forEach(item => item.remove())
    }

    if (measuresSection.children) {
      const array = Array.from(measuresSection.children)
      array.forEach(item => item.remove())
    }
  
    const ingredient = event.target.getAttribute('data-id')
    const data = await getDataRecipe(ingredient, 'lookup')

    titleSection.textContent = data[0]['strMeal']
    recipeDescription.textContent = data[0]['strInstructions']
    const keys = Object.keys(data[0])
  
    const ingredientKeys = keys.filter(key => key.includes('strIngredient'))
    ingredientKeys.forEach(ingredientKey => {
      const p = document.createElement('p')
      p.textContent = data[0][ingredientKey]
      ingredientsSection.append(p)
    })

    const measureKeys = keys.filter(key => key.includes('strMeasure'))
    measureKeys.forEach(measureKey => {
      const p = document.createElement('p')
      p.textContent = data[0][measureKey]
      measuresSection.append(p)
    })
  } catch(err) {
    return
  }
}
