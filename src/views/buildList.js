import { normalize } from "../index";

// DOM
const ingredientsResult = document.querySelector("#list-ingredients-result");
const applianceResult = document.querySelector("#list-appliance-result");
const ustensilsResult = document.querySelector("#list-ustensils-result");

export const buildIngredients = (recipes, tagIngredients) => {
  ingredientsResult.innerHTML = "";
  let ingredientsArray = [];

  recipes.forEach((recipe) => {
    const ingredients = recipe.ingredients;
    const itemsIngredients = ingredients.map((ings) => ings.ingredient);
    itemsIngredients.forEach((item) => ingredientsArray.push(normalize(item)));
  });

  let ingredientsList = [...new Set(ingredientsArray)].sort();

  const inputIngredients = document.querySelector("#search-ingredients").value;
  ingredientsList = ingredientsList.filter(
    (ingredient) =>
      !tagIngredients.includes(ingredient) &&
      ingredient.toLowerCase().includes(inputIngredients.toLowerCase())
  );

  ingredientsList.forEach((ingredient) => {
    ingredientsResult.insertAdjacentHTML(
      "beforeend",
      `<p class="item-list item-ingredients">${ingredient}</p>`
    );
  });
};

export const buildAppliance = (recipes, tagAppliance) => {
  applianceResult.innerHTML = "";
  let applianceArray = [];

  recipes.filter((recipe) => {
    const appliance = recipe.appliance;
    applianceArray.push(appliance);
  });

  let applianceList = [...new Set(applianceArray)].sort();
  const inputAppliance = document.querySelector("#search-appliance").value;

  applianceList = applianceList.filter(
    (appliance) =>
      !tagAppliance.includes(appliance) &&
      appliance.toLowerCase().includes(inputAppliance.toLowerCase())
  );

  applianceList.forEach((appliance) => {
    applianceResult.insertAdjacentHTML(
      "beforeend",
      `<p class="item-list item-appliance">${appliance}</p>`
    );
  });
};

export const buildUstensils = (recipes, tagUstensils) => {
  ustensilsResult.innerHTML = "";
  let ustensilsArray = [];

  recipes.map((recipe) => {
    const ustensils = recipe.ustensils;
    ustensils.forEach((ustensil) => ustensilsArray.push(ustensil));
  });

  let ustensilsList = [...new Set(ustensilsArray)].sort();
  const inputUstensils = document.querySelector("#search-ustensils").value;

  ustensilsList = ustensilsList.filter(
    (ustensil) =>
      !tagUstensils.includes(ustensil) &&
      ustensil.toLowerCase().includes(inputUstensils.toLowerCase())
  );

  ustensilsList.forEach((ustensil) => {
    ustensilsResult.insertAdjacentHTML(
      "beforeend",
      `<p class="item-list item-ustensils">${ustensil}</p>`
    );
  });
};
