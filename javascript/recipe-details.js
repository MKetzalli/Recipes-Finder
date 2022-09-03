// Add reference that will display a random button
const randomButton = document.querySelector('.button-random')

// Add an event listener to get a random recipe when button click
randomButton.addEventListener('click', () => {
  getRecipeDetails(event, 'random')
})

// Add an event listener to get the recipe by id
results.addEventListener('click', () => {
  getRecipeDetails(event, 'lookup')
})

// Function to get the information to display in the modals
async function getRecipeDetails(event, apimethod) {
  try {
    // Get reference to DOM elements
    const titleSection = document.querySelector('.recipe-title')
    const ingredientsSection = document.querySelector('.recipe-ingredients')
    const measuresSection = document.querySelector('.recipe-measures')
    const recipeDescriptionContent = document.querySelector('.recipe-description-content')
    const recipeImage = document.querySelector('.recipe-image')

    // Remove elements that already existed to avoid overlapping
    if (ingredientsSection.children) {
      const ingredientsChildren = Array.from(ingredientsSection.children)
      ingredientsChildren.forEach(item => item.remove())
    }

    if (measuresSection.children) {
      const measuresChildren = Array.from(measuresSection.children)
      measuresChildren.forEach(item => item.remove())
    }

    // Avoid image overlapping
    if (recipeImage) {
      recipeImage.src = ''
    }

    // Obtain the ingredient and data for each type of API method
    let ingredient
    let data

    if (apimethod === 'lookup') {
      ingredient = event.target.getAttribute('data-id')
      data = await getDataLookup(ingredient)
    } else {
      data = await getDataRandom()
    }

    // Headers creation for each item
    const measuresHeader = document.createElement('h2')
    const ingredientsHeader = document.createElement('h2')

    measuresHeader.textContent = 'Measures'
    measuresSection.append(measuresHeader)

    ingredientsHeader.textContent = 'Ingredients'
    ingredientsSection.append(ingredientsHeader)

    titleSection.textContent = data[0]['strMeal']
    recipeDescriptionContent.textContent = data[0]['strInstructions']
    recipeImage.src = data[0]['strMealThumb']
   
    // Obtain the keys that include the measures and ingredients so the DOM elements can be created
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
