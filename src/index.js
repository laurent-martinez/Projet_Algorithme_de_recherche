import "./styles/main.scss";
import { recipes } from "./recipes.js";
import cooking from "./assets/cooking_hat.svg";
import magnifying from "./assets/magnifying_glass.svg";
import food from "./assets/food.svg";
import time from "./assets/timer.svg";
import closeArrow from "./assets/close_arrow.svg";

// let recipeList = [];
let initialArray = [].concat(recipes);
let searchReduceArray = [].concat(recipes);
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];
let tagList = [];
const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardsContainer = document.querySelector("[data-cards-container]");

const normalize = (variable) => {
  return variable
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};
// Create the search bar //
// console.log("array avant la searchbar", searchReduceArray);

// recipes.forEach((each) => arr.push(each.ingredients));
// console.log(arr);

/*****centralisation de toutes les fonctions *******/
const init = () => {
  buildSearchBar();
  buildCard(recipes);
  getAppliancesList(initialArray);
  getUstensilList(initialArray);
  getIngredientsList(initialArray);
  searchTags("ingredients");
  searchTags("device");
  searchTags("ustensil");
  searchFilter();
  getCategoriesTag("ingredients", allIngredients);
  getCategoriesTag("device", allAppliances);
  getCategoriesTag("ustensil", allUstensils);
};
//**création de la barre de recherche***********/

const searchBar = document.querySelector("[data-search]");
const buildSearchBar = () => {
  const logoBrand = document.getElementById("logo");
  logoBrand.src = cooking;
  const searchPicture = document.getElementById("search_picture");
  searchPicture.src = magnifying;
};

// Build the cards //

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
// select card with input search value //
const searchFilter = () => {
  searchBar.addEventListener("input", (e) => {
    e.preventDefault();

    const value = normalize(e.target.value);
    //faire apparaitre les cards//
    // recipes.forEach((list) => {
    //   list.element.classList.add("hide");
    //   let isVisible = false;
    //   let ingSearch = list.ingred.some((ing) =>
    //     normalize(ing.ingredient).includes(value)
    //   );
    //   let titreConf = normalize(list.titre).includes(value);

    //   if (
    //     normalize(list.description).includes(value) ||
    //     titreConf ||
    //     ingSearch
    //   ) {
    //     isVisible = true;
    //   }

    //   // cache les éléments non séléctionnés du dom//
    //   list.element.classList.toggle("hide", !isVisible);
    // });
    // filtrer le tableau et garder les éléments sélectionnés//
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
        getAppliancesList(searchReduceArray);
        getUstensilList(searchReduceArray);
        getIngredientsList(searchReduceArray);
        buildCard(searchReduceArray);
        console.log("array après la recherche searchBar", searchReduceArray);
        searchTags("ingredients");
        searchTags("device");
        searchTags("ustensil");
        getCategoriesTag("ingredients", allIngredients, ingredientMenu);
        getCategoriesTag("device", allAppliances, devices);
        getCategoriesTag("ustensil", allUstensils, ustensilsM);
      } else {
        buildCard(recipes);
      }
    }, 650);
  });
};

// DOM //
const ingredientMenu = document.querySelector(".ingredient_menu");

// create ingredient list//

const getIngredientsList = (data) => {
  ingredientMenu.innerHTML = "";

  for (let recipe of data) {
    recipe.ingredients.map((object) => {
      allIngredients.push(normalize(object.ingredient));
    });
  }
  allIngredients = [...new Set(allIngredients.sort())];
  allIngredients.map((ing) => {
    tagList.map((tag) => {
      allIngredients = allIngredients.filter((item) => item.includes(tag));
    });
    const li = document.createElement("li");
    li.className = "ingredients_li";
    li.innerHTML += ing;
    ingredientMenu.appendChild(li);
  });
};

//DOM //
const devices = document.querySelector(".device_menu");
// create devices list //

const getAppliancesList = (data) => {
  devices.innerHTML = "";

  for (let recipe of data) {
    let appliances = normalize(recipe.appliance);
    allAppliances.push(appliances);
  }
  allAppliances = [...new Set(allAppliances.sort())];
  allAppliances.forEach((object) => {
    const device_li = document.createElement("li");
    device_li.className = "device_li";
    device_li.innerHTML += object;
    devices.appendChild(device_li);
  });
};

//DOM //
const ustensilsM = document.querySelector(".ustensil_menu");

// create ustensils list //

const getUstensilList = (data) => {
  ustensilsM.innerHTML = "";

  for (let recipe of data) {
    recipe.ustensils.map((object) => {
      allUstensils.push(normalize(object));
    });
  }
  allUstensils = [...allUstensils];
  allUstensils = [...new Set(allUstensils.sort())];
  allUstensils.forEach((object) => {
    const ustensil_li = document.createElement("li");
    ustensil_li.className = "ustensil_li";
    ustensil_li.innerHTML += object;
    ustensilsM.appendChild(ustensil_li);
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
const getCategoriesTag = (category, tabs, menu) => {
  // create the tag //
  const categories = document.getElementsByClassName(`${category}_li`);
  const buttons = document.querySelector(".buttons");
  const firstChild = buttons.firstChild;

  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", (e) => {
      let tag = document.createElement("button");
      tag.className = "tags";
      tag.textContent = categories[i].innerHTML || categories[i].textContent;
      let closeTag = document.createElement("img");
      closeTag.className = "closeTag";
      closeTag.src = closeArrow;

      buttons.append(tag);
      tag.appendChild(closeTag);
      tabs = tabs.filter((item, index) => tabs.indexOf(item) == index);

      categories[i].innerHTML = "";
      let value = normalize(tag.innerText) || normalize(tag.textContent);
      tagList.push(value);
      console.log(tagList);
      // erase the tags //

      tabs = tabs.filter((e, i) => tabs.indexOf(e) == i);

      // hide the cards who doesn't match the tags//
      // if (value) {
      //   searchReduceArray.forEach((list) => {
      //     let isVisibleA = false;
      //     let ingTag = list.ingredients.some((ing) =>
      //       normalize(ing.ingredient).includes(value)
      //     );
      //     if (ingTag) {
      //       return (isVisibleA = true);
      //     }

      //     if (normalize(list.appliance).includes(value)) {
      //       return (isVisibleA = true);
      //     }
      //     let ustensilsTag = list.ustensils.some(
      //       (ustensils) => value == normalize(ustensils)
      //     );
      //     if (ustensilsTag) {
      //       return (isVisibleA = true);
      //     }

      removeTags(tabs);
      // filter searchReduceArray with the tags//
      searchReduceArray = searchReduceArray.filter(
        (e) =>
          e.ingredients.some((item) =>
            normalize(item.ingredient).includes(value)
          ) ||
          normalize(e.appliance).includes(value) ||
          e.ustensils.some((item) => normalize(item).includes(value))
      );
      console.log("array après la sélection des tags", searchReduceArray);
      console.log(tabs);
      buildCard(searchReduceArray);
      console.log(tabs);

      // list.element.classList.toggle("hide", !isVisibleA);
    });
    // }
    // });
  }
};
const removeTags = (tabs) => {
  let clsTag = document.querySelectorAll(".closeTag");
  for (let item of clsTag) {
    item.addEventListener("click", (e) => {
      console.log(tabs);
      console.log(e.target.closest(".tags").textContent);
      e.target.closest(".tags").remove();
      tabs = [...new Set(tabs.sort())];
      tabs.push(e.target.closest(".tags").textContent);
      console.log("tabs après", tabs);
      buildCard(searchReduceArray);
      getAppliancesList(searchReduceArray);
      getUstensilList(searchReduceArray);
      getIngredientsList(searchReduceArray);
    });
  }
};
init();
