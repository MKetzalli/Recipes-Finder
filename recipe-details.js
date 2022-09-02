const randomButton = document.querySelector('.button-random')

randomButton.addEventListener('click', () => {
  getRecipeDetails(event, 'random')
})

results.addEventListener('click', () => {
  getRecipeDetails(event, 'lookup')
})

async function getRecipeDetails(event, apimethod) {
  try {
    const titleSection = document.querySelector('.recipe-title')
    const ingredientsSection = document.querySelector('.recipe-ingredients')
    const measuresSection = document.querySelector('.recipe-measures')
    const recipeDescription = document.querySelector('.recipe-description')
    const recipeImage = document.querySelector('.recipe-image')

    if (ingredientsSection.children) {
      const array = Array.from(ingredientsSection.children)
      array.forEach(item => item.remove())
    }

    if (measuresSection.children) {
      const array = Array.from(measuresSection.children)
      array.forEach(item => item.remove())
    }
 
    let ingredient
    let data

    if (apimethod === 'lookup') {
      ingredient = event.target.getAttribute('data-id')
      data = await getDataLookup(ingredient)
    } else {
      data = await getDataRandom()
    }

    titleSection.textContent = data[0]['strMeal']
    recipeDescription.textContent = data[0]['strInstructions']
    recipeImage.src = data[0]['strMealThumb']
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
