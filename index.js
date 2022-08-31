// DOM Manipulation
const results = document.querySelector('.results')
const form = document.querySelector('form')
const input = document.querySelector('.input-recipe')

// Function to obtain the data from the API
function getData(ingredient) {
  return(
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`)
    .then(res => res.json())
    .then(dishes => dishes.meals)
  )
}

//Function to obtain the name and image of the recipe and assign to DOM elements

async function getMealNamesImages(event) {
  event.preventDefault()

  const divContainer = document.createElement('div')
  results.append(divContainer)
  divContainer.classList.toggle('results-container')

  const ingredient = document.querySelector('input').value
  const data = await getData(ingredient)
}
