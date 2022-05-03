import "./styles/main.scss";
import { recipes } from "./recipes.js";
import cooking from "./assets/cooking_hat.svg";
import magnifying from "./assets/magnifying_glass.svg";
import food from "./assets/food.svg";
import time from "./assets/timer.svg";
import closeArrow from "./assets/close_arrow.svg";

let recipeList = [];

const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardsContainer = document.querySelector("[data-cards-container]");

const logoBrand = document.getElementById("logo");
logoBrand.src = cooking;
const searchPicture = document.getElementById("search_picture");
searchPicture.src = magnifying;
const searchBar = document.querySelector("[data-search]");

recipeList = recipes.map((recipe) => {
  const card = recipeCardTemplate.content.cloneNode(true).children[0];
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
logoTimer.forEach((logo) => {
  logo.src = time;
});

// const fillDropdown = (e) => {
//   recipes.map((recipe) => {
//     const ingredient = document.querySelector(".ingredient_menu");
//     const devices = document.querySelector(".device_menu");
//     const ustensils = document.querySelector(".ustensil_menu");
//     const li = document.createElement("li");
//     const lili = document.createElement("li");
//     lili.className = "device_li";
//     const lilili = document.createElement("li");

//     recipe.ingredients.forEach((ingred) => {
//       console.log(ingred.ingredient);
//       li.innerHTML += `${ingred.ingredient
//         .toLowerCase()
//         .replace(/\p{Diacritic}/gu, "")}<br>`;
//     });
//     lili.textContent += recipe.appliance;

//     lilili.innerHTML += `${recipe.ustensils}<br>`;

//     ingredient.appendChild(li);
//     devices.appendChild(lili);
//     ustensils.appendChild(lilili);
//   });
// };

// fillDropdown();
// const liar = document.querySelectorAll(".device_li");
// console.log(liar);
// liar.forEach((li) => {
//   li.addEventListener("click", (e) => {
//     li.style.backgroundColor = "red";
//   });
// });

// get the ingredients list //

// recipes.forEach((recipe) => {
//   const allIngredients = [];
//   const devices = document.querySelector(".device_menu");
//   const ustensils = document.querySelector(".ustensil_menu");
//   const ingredientari = document.querySelector(".ingredient_menu");
//   const li = document.createElement("li");
//   const lili = document.createElement("li");
//   const lilili = document.createElement("li");
//   li.className = "ingredients_li";
//   let ingredients = recipe.ingredients;
//   ingredients.map((ing) =>
//     allIngredients.push(
//       ing.ingredient.toLowerCase()c
//     )
//   );
//   let ingredientNoRepeat = [].concat([...new Set(allIngredients)]);
//   let ingredientJoined = ingredientNoRepeat.flat();
//   console.log(allIngredients);
//   console.log(ingredientJoined);
//   ingredientJoined.map((ing) => (li.innerHTML += `${ing}<br>`));
//   ingredientari.appendChild(li);
// });

// const liar = document.getElementsByClassName(".ingredients_li");
// console.log(liar);
// liar.forEach((li) => {
//   li.addEventListener("click", (e) => {
//     li.style.backgroundColor = "red";
//   });
// });

// DOM //
const ingredientMenu = document.querySelector(".ingredient_menu");

const getIngredientsList = () => {
  const allIngredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((object) => {
      allIngredients.push(
        object.ingredient.toLowerCase().replace(/\p{Diacritic}/gu, "")
      );
    });
  });
  const ingredientsUnique = [...new Set(allIngredients)];
  ingredientsUnique.forEach((finalList) => {
    const li = document.createElement("li");
    li.className = "ingredients_li";
    li.innerHTML += finalList;
    ingredientMenu.appendChild(li);
  });
};
getIngredientsList();

// const handleTag = document.querySelectorAll(".ingredients_li");
// console.log(handleTag);
// handleTag.forEach((tag) => {
//   tag.addEventListener("click", (e) => {
//     recipeList.forEach((list) => {
//       let isVisible;
//       list.ingred.forEach((ing) => {
//         isVisible = ing.ingredient
//           .toLowerCase()
//           .normalize("NFD")
//           .replace(/\p{Diacritic}/gu, "")
//           .includes(value);
//       });

//       list.element.classList.toggle("hide", !isVisible);
//     });
//   });
// });

//DOM //
const devices = document.querySelector(".device_menu");

const getAppliancesList = () => {
  const allAppliances = [];
  recipes.map((recipe) => {
    let appliances = recipe.appliance
      .toLocaleLowerCase()
      .replace(/\p{Diacritic}/gu, "");
    allAppliances.push(appliances);
  });
  const applianceUnique = [...new Set(allAppliances)];
  applianceUnique.forEach((object) => {
    const device_li = document.createElement("li");
    device_li.className = "device_li";
    device_li.innerHTML += object;
    devices.appendChild(device_li);
  });
};
getAppliancesList();

//DOM //
const ustensils = document.querySelector(".ustensil_menu");

const getUstensilList = () => {
  let allUstensils = [];
  recipes.map((recipe) => {
    allUstensils = [...recipe.ustensils];
    const ustensilUnique = [...new Set(allUstensils)];
    ustensilUnique.forEach((object) => {
      const ustensil_li = document.createElement("li");
      ustensil_li.className = "ustensil_li";
      ustensil_li.innerHTML += `${object}`;
      ustensils.appendChild(ustensil_li);
    });
  });
};
getUstensilList();

const getIngredientsTag = () => {
  const ingredients = document.getElementsByClassName("ingredients_li");
  const buttons = document.querySelector(".buttons");
  const firstChild = buttons.firstChild;
  console.log(ingredients);
  for (let item of ingredients) {
    item.addEventListener("click", () => {
      let tag = document.createElement("button");
      tag.className = "tags";
      let closeTag = document.createElement("img");
      closeTag.src = "./assets/close_arrow.svg";
      console.log(closeTag);
      tag.appendChild(closeTag);
      console.log(tag);
      buttons.insertBefore(tag, firstChild);
      tag.textContent = item.textContent;
      buttons.appendChild(tag);
      item.remove();
    });
  }
};
getIngredientsTag();
