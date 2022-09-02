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
    const recipeDescriptionContent = document.querySelector('.recipe-description-content')
    const recipeImage = document.querySelector('.recipe-image')

    if (ingredientsSection.children) {
      const ingredientsChildren = Array.from(ingredientsSection.children)
      ingredientsChildren.forEach(item => item.remove())
    }

    if (measuresSection.children) {
      const measuresChildren = Array.from(measuresSection.children)
      measuresChildren.forEach(item => item.remove())
    }

    if (recipeImage) {
      recipeImage.src = ''
    }

    let ingredient
    let data

    if (apimethod === 'lookup') {
      ingredient = event.target.getAttribute('data-id')
      data = await getDataLookup(ingredient)
    } else {
      data = await getDataRandom()
    }

    const measuresHeader = document.createElement('h2')
    const ingredientsHeader = document.createElement('h2')

    measuresHeader.textContent = 'Measures'
    measuresSection.append(measuresHeader)

    ingredientsHeader.textContent = 'Ingredients'
    ingredientsSection.append(ingredientsHeader)

    titleSection.textContent = data[0]['strMeal']
    recipeDescriptionContent.textContent = data[0]['strInstructions']
    recipeImage.src = data[0]['strMealThumb']
    
    const keys = Object.keys(data[0])
  
    const measureKeys = keys.filter(key => key.includes('strMeasure'))
    measureKeys.forEach(measureKey => {
      const p = document.createElement('p')
      p.textContent = data[0][measureKey]
      measuresSection.append(p)
    })
    
    const ingredientKeys = keys.filter(key => key.includes('strIngredient'))
    ingredientKeys.forEach(ingredientKey => {
      const p = document.createElement('p')
      p.textContent = data[0][ingredientKey]
      ingredientsSection.append(p)
    })
  } catch(err) {
    return
  }
}
