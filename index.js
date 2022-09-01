// DOM Manipulation
const results = document.querySelector('.results')
const form = document.querySelector('form')
const input = document.querySelector('input')

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
  try {
    const divContainer = document.createElement('div')
    results.append(divContainer)
    divContainer.classList.toggle('results-container')

    const ingredient = input.value
    const data = await getData(ingredient)

    data.forEach(item => {
      const divItem = document.createElement('div')
      const h3 = document.createElement('h3')
      const img = document.createElement('img')
    
      divItem.append(img, h3)
      divContainer.append(divItem)
      h3.textContent = item['strMeal']
      img.src = item['strMealThumb']
      divItem.classList.toggle('result-item')
    })
  } catch(err) {
    alert('Not available recipes with that ingredient')
  }
}

// Obtain the name and image of recipe when submit input field
form.addEventListener('submit', getMealNamesImages)
// When change input, delete div that contained previous entries
input.addEventListener('change', removeDiv)

function removeDiv() {
  try {
    const div = document.querySelector('.results-container')
    div.remove()
  } catch(err) {
    return
  }
}
