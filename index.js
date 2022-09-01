// DOM Manipulation
let results = document.querySelector(".results");
let form = document.querySelector("form");
let input = document.querySelector(".input-recipe");
let cardsOptions = document.getElementsByClassName("cardsOptions")[0];
let cardsDetail = document.getElementsByClassName("cardsDetail")[0];

// Function to obtain the data from the API
function getData(ingredient) {
  return fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
  )
    .then((res) => res.json())
    .then((dishes) => dishes.meals);
}

//Function to obtain the name and image of the recipe and assign to DOM elements
async function getMealNamesImages(event) {
  event.preventDefault();
  //estilo para mostrar u ocultar uno u otro div (cardsOptions o cardsDetail)
  cardsOptions.style.display = "grid";
  cardsDetail.style.display = "none";
  try {
    const ingredient = document.querySelector("input").value;
    const data = await getData(ingredient);

    data.forEach((item) => {
      const divItem = document.createElement("div");
      const h3 = document.createElement("h3");
      const img = document.createElement("img");

      divItem.append(img, h3);
      cardsOptions.append(divItem);

      h3.textContent = item["strMeal"];
      img.src = item["strMealThumb"];

      //abrir receta al presionar imagen
      img.addEventListener("click", getRecipe);
      function getRecipe() {
        console.log(item["strArea"]); //imprime a que cocina pertenece
        cardsOptions.style.display = "none"; //esconde el div cardsOptions (donde esta el listado)
        cardsDetail.style.display = "block"; //muestra el div con la receta

        //repeticion de arriba
        let cardsDetailDiv = document.createElement("div"); //crea un div para mostrar la receta
        let cardsDetailH2 =
          document.getElementsByClassName("cardsDetail-h2")[0]; //crea un h2 para el titulo de la receta
        let cardsDetailImg =
          document.getElementsByClassName("cardsDetail-img")[0]; //crea imagen de receta
        let cardsDetailP = document.getElementsByClassName("cardsDetail-p")[0]; //crea pasos de receta

        cardsDetailH2.textContent = item["strMeal"]; //cambia el texto dentro por titulo de receta
        cardsDetailImg.src = item["strMealThumb"]; //cambia imagen por imagen de receta
        cardsDetailP.textContent = item["strInstructions"]; //cambia texto por pasos de receta
        cardsDetail.append(cardsDetailDiv); //indica que uno esta dentro de otro
        cardsDetailDiv.append(cardsDetailImg, cardsDetailH2, cardsDetailP); //indica que uno esta dentro de otro
      }

      divItem.classList.toggle("result-item");
    });
  } catch (err) {
    alert("Not available recipes with that ingredient");
  }
}
// When change input, delete div that contained previous entries
form.addEventListener("submit", () => {
  try {
    while (cardsOptions.firstChild) {
      cardsOptions.removeChild(cardsOptions.firstChild);
    }
  } catch (err) {
    return;
  }
});

// Obtain the name and image of recipe when submit input field
form.addEventListener("submit", getMealNamesImages);
