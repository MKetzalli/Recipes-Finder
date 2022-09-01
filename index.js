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
      //creando elementos de tarjeta
      let divCardOption = document.createElement("div");
      let imgCardOption = document.createElement("img");
      let divCardOptionBody = document.createElement("div");
      let h5CardOptionTitle = document.createElement("h5");

      //agregando estilos
      divCardOption.classList.add("card");
      imgCardOption.classList.add("card-img-top");
      divCardOptionBody.classList.add("card-body");
      h5CardOptionTitle.classList.add("card-title");

      //indicando orden
      cardsOptions.append(divCardOption);
      divCardOption.append(imgCardOption, divCardOptionBody);
      divCardOptionBody.append(h5CardOptionTitle)

      //asignando valores
      h5CardOptionTitle.textContent = item["strMeal"];
      imgCardOption.src = item["strMealThumb"];

      //abrir receta al presionar imagen
      imgCardOption.addEventListener("click", getRecipe);

      function getRecipe() {
        cardsOptions.style.display = "none"; 
        cardsDetail.style.display = "block"; 

        //creando elementos de tarjeta
        const divCardDetail = document.createElement("div");
        const imgCardDetail = document.createElement("img");
        const divCardDetailBody = document.createElement("div");
        const h5CardDetailTitle = document.createElement("h5");
        const h6CardDetailTitleIngredients = document.createElement("h6");
        const ulCardDetail = document.createElement("ul");
        const liCardDetail = document.createElement("li");
        const h6CardDetailTitleRecipe = document.createElement("h6");
        const pCardDetail = document.createElement("p");

        //aplicando estilos
        divCardDetail.classList.add("card")
        imgCardDetail.classList.add("card-img-top")
        divCardDetailBody.classList.add("card-body")
        h5CardDetailTitle.classList.add("card-title")
        h6CardDetailTitleIngredients.classList.add("card-title")
        ulCardDetail.classList.add("list-group")
        liCardDetail.classList.add("list-group-item")
        h6CardDetailTitleRecipe.classList.add("card-title")
        pCardDetail.classList.add("card-text")

        //indicando orden
        cardsDetail.append(divCardDetail); 
        divCardDetail.append(imgCardDetail, divCardDetailBody); 
        divCardDetailBody.append(h5CardDetailTitle,h6CardDetailTitleIngredients,ulCardDetail,h6CardDetailTitleRecipe,pCardDetail)
        ulCardDetail.append(liCardDetail)

        //asignacion de valores
        imgCardDetail.src = item["strMealThumb"]; 
        h5CardDetailTitle.textContent = item["strMeal"]; 
        h6CardDetailTitleIngredients.textContent = "Ingredientes"; 
        liCardDetail.textContent = item["strIngredient1"]; 
        h6CardDetailTitleRecipe.textContent = "Proceso"; 
        pCardDetail.textContent = item["strInstructions"]; 
      } 

      divCardOption.classList.toggle("result-item");
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
  try {
    while (cardsDetail.firstChild) {
      cardsDetail.removeChild(cardsDetail.firstChild);
    }
  } catch (err) {
    return;
  }
});

// Obtain the name and image of recipe when submit input field
form.addEventListener("submit", getMealNamesImages);
