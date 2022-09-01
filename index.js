// DOM Manipulation
const results = document.querySelector('.results')
const form = document.querySelector('form')
const input = document.querySelector('input')

// Function to obtain the data from the API
function getDataRecipe(ingredient) {
  return(
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`)
    .then(res => res.json())
    .then(dishes => dishes.meals)
  )
}

//Function to obtain the name and image of the recipe and assign to DOM elements

async function getThumbnailRecipe(event) {
  event.preventDefault()
  // Create a try and catch method when user inputs an invalid ingredient
  try {
    // Create a document frament to store elements and then append, store the ingredient and the data
    const container = document.createDocumentFragment()
    const ingredient = input.value
    const data = await getDataRecipe(ingredient)

    // Validation to remove previous entries and avoid automatic append
    const section = document.querySelector('.results-container')

    if (section.children) {
      const array = Array.from(section.children)
      array.forEach(item => item.remove())
    }
    // Loop throught all recipes and create DOM elements
    data.forEach(item => {
      const div = document.createElement('div')
      const h3 = document.createElement('h3')
      const img = document.createElement('img')
   
      h3.textContent = item['strMeal']
      img.src = item['strMealThumb']
  
      div.append(img, h3)
      container.append(div)
      div.classList.add('result-item')
    })

    results.append(container)
  } catch(err) {
    alert('Not available recipes for that ingredient')
  }
}

// Obtain the name and image of recipe when submit input field
form.addEventListener('submit', getThumbnailRecipe)
