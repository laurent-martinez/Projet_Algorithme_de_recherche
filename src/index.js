import "./styles/main.scss";
import { recipes } from "./recipes.js";
import cooking from "./assets/cooking_hat.svg";
import magnifying from "./assets/magnifying_glass.svg";
import food from "./assets/food.svg";
import time from "./assets/timer.svg";

let recipeList = [];

const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardsContainer = document.querySelector("[data-cards-container]");

const logoBrand = document.getElementById("logo");
logoBrand.src = cooking;
const searchPicture = document.getElementById("search_picture");
searchPicture.src = magnifying;
const searchBar = document.querySelector("[data-search]");
console.log(recipes);
recipeList = recipes.map((recipe) => {
  const card = recipeCardTemplate.content.cloneNode(true).children[0];
  console.log(card);
  const title = card.querySelector("[data-title]");
  const timing = card.querySelector("[data-timing]");
  const ingredients = card.querySelector("[data-ingredients]");
  const instructions = card.querySelector("[data-instructions]");
  title.textContent = recipe.name;
  timing.textContent = recipe.time;
  const ingredientso = recipe.ingredients;

  ingredientso.forEach((ing) => {
    ingredients.innerHTML += `<span class="recipe__ingredients__title">${
      ing.ingredient
    } : </span> ${
      parseInt(ing.quantity) + ing.unit || parseInt(ing.quantity) || ""
    } <br>`;
  });

  instructions.textContent = recipe.description;
  recipeCardsContainer.append(card);

  return {
    titre: recipe.name,
    ingred: recipe.ingredients,
    description: recipe.description,
    element: card,
  };
});
searchBar.addEventListener("input", (e) => {
  const value = e.target.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  recipeList.forEach((list) => {
    let isVisible;
    list.ingred.forEach((ing) => {
      isVisible =
        list.titre
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .includes(value) ||
        ing.ingredient
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .includes(value) ||
        list.description
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .includes(value);
    });

    list.element.classList.toggle("hide", !isVisible);
  });
});

const recipesPic = document.querySelectorAll("[data-img]");
recipesPic.forEach((recip) => {
  recip.src = food;
});

const logoTimer = document.querySelectorAll("[data-timer-img]");
console.log(logoTimer);
logoTimer.forEach((logo) => {
  logo.src = time;
});
