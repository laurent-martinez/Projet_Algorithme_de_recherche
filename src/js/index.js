import "../styles/main.scss";
import { recipes } from "./data/recipes.js";
import food from "../assets/food.svg";
import time from "../assets/timer.svg";
import cooking from "../assets/cooking_hat.svg";
import magnifying from "../assets/magnifying_glass.svg";
import closeArrow from "../assets/close_arrow.svg";

let initialArray = [].concat(recipes);
let searchReduceArray = [].concat(recipes);
let tagReduceArray = [].concat(recipes);
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let tagList = [];

// DOM///////////////////////////////
const searchBar = document.querySelector("[data-search]");
const ingredientMenu = document.querySelector(".ingredient_menu");
const ustensilsM = document.querySelector(".ustensil_menu");
const devices = document.querySelector(".device_menu");
const ingredientButton = document.querySelector(".ingredientButton");
const deviceButton = document.querySelector(".deviceButton");
const ustensilButton = document.querySelector(".ustensilButton");
const lists = document.querySelectorAll(".lists");
const tags = document.querySelector("#tags");
/// utils //////
const normalize = (variable) => {
  return variable
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};
////// init //////////////
const init = () => {
  buildSearchBar();
  buildCard(recipes);
  searchTags("ingredients");
  searchTags("device");
  searchTags("ustensil");
  searchFilter();
  // getCategoriesTag("ingredients", allIngredients);
  // getCategoriesTag("device", allAppliances);
  // getCategoriesTag("ustensil", allUstensils);
  removeTags();
};

//// display ///////////
const buildSearchBar = () => {
  const logoBrand = document.getElementById("logo");
  logoBrand.src = cooking;
  const searchPicture = document.getElementById("search_picture");
  searchPicture.src = magnifying;
};

// Build the cards //
const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardsContainer = document.querySelector("[data-cards-container]");

const buildCard = (recipes) => {
  recipeCardsContainer.innerHTML = "";
  recipes.map((recipe) => {
    const card = recipeCardTemplate.content.cloneNode(true).children[0];
    const recipesPic = document.querySelectorAll("[data-img]");
    recipesPic.forEach((recip) => {
      recip.src = food;
    });

    const logoTimer = document.querySelectorAll("[data-timer-img]");
    logoTimer.forEach((logo) => {
      logo.src = time;
    });
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
  });
};

ingredientButton.addEventListener("click", (e) => {
  if (tagList.length <= 0 && searchBar.value.length < 3) {
    getIngredientsList(recipes);
  }
  manageTags();
  // getCategoriesTag("ingredients", allIngredients, ingredientMenu);
});

deviceButton.addEventListener("click", (e) => {
  if (tagList.length <= 0 && searchBar.value.length < 3) {
    getAppliancesList(recipes);
  }
  manageTags();
  // getCategoriesTag("device", allAppliances, devices);
});

ustensilButton.addEventListener("click", (e) => {
  if (tagList.length <= 0 && searchBar.value.length < 3) {
    getUstensilList(recipes);
  }
  manageTags();
  // getCategoriesTag("ustensil", allUstensils, ustensilsM);
});

///// ingredient-list //////////

const getIngredientsList = (recipes) => {
  ingredientMenu.innerHTML = "";
  allIngredients = [];

  recipes.forEach((recipe) => {
    const ingredients = recipe.ingredients;
    const itemsIngredients = ingredients.map((ings) => ings.ingredient);
    itemsIngredients.forEach((item) => allIngredients.push(normalize(item)));
  });

  let ingredientsList = [...new Set(allIngredients)].sort();

  ingredientsList.forEach((ingredient) => {
    ingredientMenu.insertAdjacentHTML(
      "beforeend",
      `<li class="list ingredients_li">${normalize(ingredient)}</li>`
    );
  });
};

//////// device list //////////////////////////////////
const getAppliancesList = (recipes) => {
  devices.innerHTML = "";
  allAppliances = [];

  recipes.filter((recipe) => {
    const appliance = recipe.appliance;
    allAppliances.push(normalize(normalize(appliance)));
  });

  let applianceList = [...new Set(allAppliances)].sort();

  applianceList.forEach((app) => {
    devices.insertAdjacentHTML(
      "beforeend",
      `<li class="list device_li">${normalize(app)}</li>`
    );
  });
};

////////// ustensil list //////////////////////////////////
const getUstensilList = (recipes) => {
  ustensilsM.innerHTML = "";
  allUstensils = [];

  recipes.map((recipe) => {
    const utensils = recipe.ustensils;
    utensils.forEach((ustensil) => allUstensils.push(normalize(ustensil)));
  });
  allUstensils = [...allUstensils];
  let utensilsList = [...new Set(allUstensils)].sort();

  utensilsList.forEach((utensil) => {
    ustensilsM.insertAdjacentHTML(
      "beforeend",
      `<li class="list ustensil_li">${normalize(utensil)}</li>`
    );
  });
};
// filter cards by searchBar /////////
// select card with input search value //

export const searchFilter = () => {
  searchBar.addEventListener("input", (e) => {
    e.preventDefault();

    const value = normalize(e.target.value);

    setTimeout(() => {
      if (value.length >= 3) {
        searchReduceArray = searchReduceArray.filter(
          (recipe) =>
            recipe.ingredients
              .map((item) => normalize(item.ingredient))
              .includes(value) ||
            recipe.name.includes(value) ||
            recipe.description.includes(value)
        );
        console.log(searchReduceArray);
        tagFilter();
        buildCard(searchReduceArray);
        getAppliancesList(searchReduceArray);
        getUstensilList(searchReduceArray);
        getIngredientsList(searchReduceArray);
        // getCategoriesTag("ingredients", allIngredients);
        // getCategoriesTag("device", allAppliances);
        // getCategoriesTag("ustensil", allUstensils);
        manageTags();
        removeTags();
      } else if (value.length < 3 && tagList.length == 0) {
        console.log(searchReduceArray);
        buildCard(recipes);
      } else if (value.length < 3 && tagList.length > 0) {
        manageTags();
      }
    }, 650);
  });
};

// find the tags who match the search//
const searchTags = (category) => {
  const searchBox = document.querySelector(`.${category}_search`);
  const items = document.querySelectorAll(`.${category}_li`);
  for (let item of items) {
    let valuue = normalize(item.textContent) || normalize(item.innerHTML);
    searchBox.addEventListener("input", (element) => {
      let value = normalize(element.target.value);
      if (valuue.includes(value)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }
};

// create tags and erase it & remove unmatched cards//
// const getCategoriesTag = (category, tabs) => {
//   // create the tag //
//   const categories = document.getElementsByClassName(`${category}_li`);
//   const buttons = document.querySelector(".buttons");
//   const firstChild = buttons.firstChild;

//   for (let i = 0; i < categories.length; i++) {
//     categories[i].addEventListener("click", (e) => {
//       console.log(e.target.textContent);
//       let tag = document.createElement("button");
//       tag.className = "tags";
//       tag.textContent = e.target.textContent;
//       let closeTag = document.createElement("img");
//       closeTag.className = "closeTag";
//       closeTag.src = closeArrow;

//       buttons.append(tag);
//       tag.appendChild(closeTag);
//       tabs = tabs.filter((item, index) => tabs.indexOf(item) == index);

//       e.target.innerHTML = null;
//       let value = normalize(tag.innerText) || normalize(tag.textContent);
//       tagList.push(value);
//       tabs = tabs.filter((e, i) => tabs.indexOf(e) == i);

//       console.log(tagList);

//       tagFilter();
//       removeTags();
//       console.log("avantRemove", searchReduceArray);

//       getAppliancesList(searchReduceArray);
//       getUstensilList(searchReduceArray);
//       getIngredientsList(searchReduceArray);
//       buildCard(searchReduceArray);
//     });
//   }
//   // console.log("array après la sélection des tags", searchReduceArray);
//   // console.log(tabs);
// };

const manageTags = () => {
  lists.forEach((list) => {
    list.querySelectorAll(".list").forEach((item) => {
      item.addEventListener("click", (e) => {
        const tag = e.target.textContent;
        tagList.push(tag); // je mets dans mon tableau tous ce que je click
        console.log(tagList);
        tagList = [...new Set(tagList)];

        tags.innerHTML += `
                  <button class="tags">${tag}<img class="closeTag" src="${closeArrow}"  data-value="${tag}"></img></button>
              `;
        tagFilter();
        removeCards();

        buildCard(searchReduceArray);
        getIngredientsList(searchReduceArray);
        getAppliancesList(searchReduceArray);
        getUstensilList(searchReduceArray);
        manageTags();
        removeTags();
      });
    });
  });
};

///// filter by tags ///////
const tagFilter = () => {
  return tagList.forEach((tag) => {
    if (tag) {
      searchReduceArray = searchReduceArray.filter(
        (e) =>
          e.ingredients.some((item) =>
            normalize(item.ingredient).includes(normalize(tag))
          ) ||
          normalize(e.appliance).includes(normalize(tag)) ||
          e.ustensils.some((item) => normalize(item).includes(normalize(tag)))
      );
      console.log("tagf", searchReduceArray);
    }
  });
};
///// remove tags //////
// const removeTags = () => {
//   let clsTag = document.querySelectorAll(".closeTag");
//   for (let item of clsTag) {
//     item.addEventListener("click", (e) => {
//       let tagVal = normalize(e.target.closest(".tags").textContent);
//       tagList = tagList.filter((tag) => tag !== tagVal);
//       tagFilter();
//       buildCard(searchReduceArray);
//       e.target.closest(".tags").remove();
//     });
//   }
// };

const removeTags = () => {
  document.querySelectorAll(".closeTag").forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.target.closest(".tags").remove();
      tagList = tagList.filter((tag) => tag.value != e.target.dataset.value);
      searchFilter();
    });
  });
};
const removeCards = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
};
/*****centralisation de toutes les fonctions *******/
init();
