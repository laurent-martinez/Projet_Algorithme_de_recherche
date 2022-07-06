// DOM
const searchResult = document.querySelector("#search-result");

export const displayCard = (recipe) => {
  const ingredients = recipe.ingredients
    .map(
      (ingredient) =>
        `<li>${ingredient.ingredient} : ${ingredient?.quantity ?? ""} ${
          ingredient?.unit ?? ""
        }</li>`
    )
    .join("");
  searchResult.insertAdjacentHTML(
    "beforeend",
    `
      <div class="recipe">
          <div class="recipe-image"></div>
          <div class="recipe-body">
              <div class="recipe-header">
                  <div class="recipe-title">
                      <h2>${recipe.name}</h2>
                  </div>
                  <div class="recipe-time">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
                  </svg>
                  
                      <p>${recipe.time} min</p>
                  </div>
              </div>
              <div class="recipe-content">
                  <div class="recipe-ingredients">${ingredients}</div>
                  <p class="recipe-describe ">${recipe.description}</p>
              </div>
          </div>
      </div>
      `
  );
};
