import "./styles/main.scss";
import { recipes } from "./recipes.js";
import cooking from "./assets/cooking_hat.svg";
import magnifying from "./assets/magnifying_glass.svg";
import food from "./assets/food.svg";
import time from "./assets/timer.svg";
import closeArrow from "./assets/close_arrow.svg";

//*********tabs******************//
let initialArray = [];
let initialIngArray = [];
let initialDeviceArray = [];
let initialUstensilArray = [];
let initialTags = { IngTags: [], DeviceTags: [], UstensilTags: [] };

let searchReduceArray = [];
let reducedIngArray = [];
let reducedDeviceArray = [];
let reducedUstensilArray = [];
let reducedTags = {
  reducedIngTags: [],
  reducedDeviceTags: [],
  reducedUstensilTags: [],
};

//*******Fill initial tabs*****//

const fillInitialTabs = () => {
  recipes.forEach((recipe) => {
    initialArray.push(recipe);

    initialDeviceArray.push(recipe.appliance);
    initialDeviceArray = [...new Set(initialDeviceArray)];

    recipe.ustensils.map((item) => {
      initialUstensilArray.push(item);
      initialUstensilArray = [...new Set(initialUstensilArray)];
    });

    recipe.ingredients.forEach((item) => {
      initialIngArray.push(item.ingredient);
      initialIngArray = [...new Set(initialIngArray)];
    });
  });

  initialTags.IngTags = [].concat(initialIngArray);
  initialTags.DeviceTags = [].concat(initialDeviceArray);
  initialTags.UstensilTags = [].concat(initialUstensilArray);
};
fillInitialTabs();

//******* helper functions ********************************************************************//

const normalize = (variable) => {
  return variable
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};

let ingList = [];
// recipes.forEach((each) => arr.push(each.ingredients));
// console.log(arr);
const getIngList = (arrList) => {
  arrList.forEach((each) =>
    each.ingredients.map((ing) => ingList.push(ing.ingredient))
  );

  return ingList;
};

const flatArray = (arr) => {
  let flatArr = [].concat(...arr);
  return flatArr;
};

//****Builds ************************************************************************************/

const recipeCardTemplate = document.querySelector("[data-recipe-template]");
const recipeCardsContainer = document.querySelector("[data-cards-container]");

// build  the search bar //

const searchBar = document.querySelector("[data-search]");
const buildSearchBar = () => {
  const logoBrand = document.getElementById("logo");
  logoBrand.src = cooking;
  const searchPicture = document.getElementById("search_picture");
  searchPicture.src = magnifying;
};
buildSearchBar();

// Build the cards //

const buildCard = (data) => {
  data.map((recipe) => {
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
    const recipesPic = document.querySelectorAll("[data-img]");
    recipesPic.forEach((recip) => {
      recip.src = food;
    });

    instructions.textContent = recipe.description;
    recipeCardsContainer.append(card);

    return {
      element: card,
      title: recipe.name,
    };
  });
};
// select card with input search value //
const searchFilter = (initialArray) => {
  searchBar.addEventListener("input", (e) => {
    e.preventDefault();
    const value = normalize(e.target.value);
    console.log(value);
    initialArray.forEach((el) =>
      el.ingredients.map((e) =>
        normalize(e.ingredient) === normalize(value)
          ? searchReduceArray.push(el)
          : searchReduceArray
      )
    );
    initialArray.map((el) =>
      normalize(el.name).includes(value)
        ? searchReduceArray.push(el)
        : searchReduceArray
    );
    initialArray.map((el) =>
      normalize(el.description).includes(value)
        ? searchReduceArray.push(el)
        : searchReduceArray
    );

    if (value) {
      buildCard(searchReduceArray);
      getIngredientsList(searchReduceArray);
      getAppliancesList(searchReduceArray);
      getUstensilList(searchReduceArray);
    } else {
      getIngredientsList(initialArray);
      getAppliancesList(initialArray);
      getUstensilList(initialArray);
    }
  });
};
searchFilter(initialArray);

const logoTimer = document.querySelectorAll("[data-timer-img]");
logoTimer.forEach((logo) => {
  logo.src = time;
});

// DOM //
const ingredientMenu = document.querySelector(".ingredient_menu");

// create ingredient list//

const getIngredientsList = (data) => {
  for (let recipe of data) {
    recipe.ingredients.map((object) => {
      reducedIngArray.push(normalize(object.ingredient));
    });
  }
  reducedIngArray = [...new Set(reducedIngArray)];
  reducedIngArray.map((ing) => {
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
  for (let recipe of data) {
    let appliances = normalize(recipe.appliance);
    reducedDeviceArray.push(appliances);
  }
  reducedDeviceArray = [...new Set(reducedDeviceArray)];
  reducedDeviceArray.forEach((object) => {
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
  for (let recipe of data) {
    recipe.ustensils.map((object) => {
      reducedUstensilArray.push(normalize(object));
    });
  }
  reducedUstensilArray = [...reducedUstensilArray];
  reducedUstensilArray = [...new Set(reducedUstensilArray)];
  reducedUstensilArray.forEach((object) => {
    const ustensil_li = document.createElement("li");
    ustensil_li.className = "ustensil_li";
    ustensil_li.innerHTML += object;
    ustensilsM.appendChild(ustensil_li);
    return ustensil_li;
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
searchTags("ingredients");
searchTags("device");
searchTags("ustensil");

// create tags and erase it & remove unmatched cards//

let ingredientTags = [],
  deviceTags = [],
  ustensilTags = [];

const getCategoriesTag = (category, tabs, typeTags) => {
  const categories = document.getElementsByClassName(`${category}_li`);
  const buttons = document.querySelector(".buttons");
  const firstChild = buttons.firstChild;

  for (let i = 0; i < categories.length; i++) {
    console.log(categories[i]);
    categories[i].addEventListener("click", () => {
      console.log("ok");
      let tag = document.createElement("button");
      tag.className = "tags";
      tag.textContent = categories[i].textContent;
      typeTags.push(tag.textContent);
      let closeTag = document.createElement("img");
      closeTag.className = "closeTag";
      closeTag.src = closeArrow;

      buttons.insertBefore(tag, firstChild);
      buttons.appendChild(tag);
      tag.appendChild(closeTag);
      let filterIng = tag.textContent;

      if (tag) {
        tabs = tabs.filter((el) => el !== normalize(filterIng));
      }

      let clsTag = document.querySelectorAll(".closeTag");
      for (let item of clsTag) {
        item.addEventListener("click", (e) => {
          tabs.push(tag.textContent);
          typeTags = typeTags.filter((el) => el !== tag.textContent);
          tag.remove();
        });
      }

      tabs = tabs.filter((e, i) => tabs.indexOf(e) == i);

      let value = normalize(tag.innerText) || normalize(tag.textContent);
    });
  }
  return tabs;
};
getCategoriesTag("ingredients", reducedIngArray, ingredientTags);
getCategoriesTag("device", reducedDeviceArray, deviceTags);
getCategoriesTag("ustensil", reducedUstensilArray, ustensilTags);
