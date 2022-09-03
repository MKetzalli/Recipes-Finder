function getDataSearch(ingredient) {
  return(
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`)
    .then(res => res.json())
    .then(dishes => dishes.meals)
  )
}


function getDataLookup(ingredient) {
  return(
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingredient}`)
    .then(res => res.json())
    .then(dishes => dishes.meals)
  )
}


function getDataRandom() {
  return(
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(dishes => dishes.meals)
  )
}
