// DOM Manipulation
const resultsContainer = document.querySelector('.results-container')
const form = document.querySelector('form')
const input = document.querySelector('input')

// Obtain the name and image of recipe when submit input field
form.addEventListener('submit', getThumbnailRecipe)

//Function to obtain the name and image of the recipe and assign to DOM elements
async function getThumbnailRecipe(event) {
  event.preventDefault()

  // Create a try and catch method when user inputs an invalid ingredient
  try {
    // Create a document frament to store elements and then append, store the ingredient and the data
    const ingredient = input.value
    
    // Add validation when user input is empty
    if (!ingredient) {
      alert('Please insert an ingredient')
      return      
    }

    const container = document.createDocumentFragment()

    const data = await getDataSearch(ingredient)

    // Validation to remove previous entries and avoid automatic append
    const section = document.querySelector('.results-container')

    if (section.children) {
      const array = Array.from(section.children)
      array.forEach(item => item.remove())
    }

    // Loop throught all recipes and create DOM elements
    data.forEach(item => {
      const div = document.createElement('div')
      const h5 = document.createElement('h5')
      const img = document.createElement('img')
   
      h5.textContent = item['strMeal']
      img.src = item['strMealThumb']
      img.dataset.id = item['idMeal']  

      img.setAttribute('data-bs-toggle', 'modal')
      img.setAttribute('data-bs-target', '#recipe')

      div.append(img, h5)
      container.append(div)
      div.classList.add('result-item')
    })

    resultsContainer.append(container)
  } catch(err) {
    alert('Not available recipes for that ingredient')
  }
}


