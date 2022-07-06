// DOM
const ingredientsResult = document.querySelector("#list-ingredients-result");
const applianceResult = document.querySelector("#list-appliance-result");
const utensilsResult = document.querySelector("#list-utensils-result");

export const displayIngredients = (recipes, tagIngredients) => {
  ingredientsResult.innerHTML = "";
  let ingredientsArray = [];

  recipes.forEach((recipe) => {
    const ingredients = recipe.ingredients;
    const itemsIngredients = ingredients.map((ings) => ings.ingredient);
    itemsIngredients.forEach((item) => ingredientsArray.push(item));
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

export const displayAppliance = (recipes, tagAppliance) => {
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

export const displayUtensils = (recipes, tagUtensils) => {
  utensilsResult.innerHTML = "";
  let utensilsArray = [];

  recipes.map((recipe) => {
    const utensils = recipe.ustensils;
    utensils.forEach((utensil) => utensilsArray.push(utensil));
  });

  let utensilsList = [...new Set(utensilsArray)].sort();
  const inputUtensils = document.querySelector("#search-utensils").value;

  utensilsList = utensilsList.filter(
    (utensil) =>
      !tagUtensils.includes(utensil) &&
      utensil.toLowerCase().includes(inputUtensils.toLowerCase())
  );

  utensilsList.forEach((utensil) => {
    utensilsResult.insertAdjacentHTML(
      "beforeend",
      `<p class="item-list item-utensils">${utensil}</p>`
    );
  });
};
