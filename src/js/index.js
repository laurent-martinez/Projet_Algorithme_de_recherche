import "../styles/main.scss";
import { recipes } from "./data/recipes.js";
import food from "../assets/food.svg";
import time from "../assets/timer.svg";
import cooking from "../assets/cooking_hat.svg";
import magnifying from "../assets/magnifying_glass.svg";
import closeArrow from "../assets/close_arrow.svg";

let initialArray = [].concat(recipes);
let searchReduceArray = [];
let tagReduceArray = [];
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
  searchTags("ingredients");
  manageTags();
  // getCategoriesTag("ingredients", allIngredients, ingredientMenu);
});

deviceButton.addEventListener("click", (e) => {
  if (tagList.length <= 0 && searchBar.value.length < 3) {
    getAppliancesList(recipes);
  }
  searchTags("device");
  manageTags();
  // getCategoriesTag("device", allAppliances, devices);
});

ustensilButton.addEventListener("click", (e) => {
  if (tagList.length <= 0 && searchBar.value.length < 3) {
    getUstensilList(recipes);
  }
  searchTags("ustensil");
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
  tagList.forEach((tag) => {
    ingredientsList = ingredientsList.filter((ing) => !tag.includes(ing));
  });
  ingredientsList.forEach((ingredient) => {
    // ingredientMenu.insertAdjacentHTML(
    //   "beforeend",
    ingredientMenu.innerHTML += `<li class="list ingredients_li">${normalize(
      ingredient
    )}</li>`;
    // );
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
  tagList.forEach((tag) => {
    applianceList = applianceList.filter((app) => !tag.includes(app));
  });

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
  let ustensilsList = [...new Set(allUstensils)].sort();
  tagList.forEach((tag) => {
    ustensilsList = ustensilsList.filter((us) => !tag.includes(us));
  });
  ustensilsList.forEach((ustensil) => {
    ustensilsM.insertAdjacentHTML(
      "beforeend",
      `<li class="list ustensil_li">${normalize(ustensil)}</li>`
    );
  });
};
// filter cards by searchBar /////////
// select card with input search value //

searchBar.addEventListener("input", () => {
  recipeCardsContainer.innerHTML = "";
  searchFilter();
});

const searchFilter = () => {
  recipeCardsContainer.innerHTML = "";
  const value = normalize(searchBar.value);
  recipeCardsContainer.innerHTML = "";
  if (value.length >= 3 && tagList.length < 1) {
    searchReduceArray = recipes.filter(
      (recipe) =>
        recipe.ingredients
          .map((item) => normalize(item.ingredient))
          .includes(value) ||
        recipe.name.includes(value) ||
        recipe.description.includes(value)
    );
    console.log(searchReduceArray);
    buildCard(searchReduceArray);
    getAppliancesList(searchReduceArray);
    getUstensilList(searchReduceArray);
    getIngredientsList(searchReduceArray);
  } else if (value.length >= 3 && tagList.length > 0) {
    console.log("kikou", searchReduceArray);
    searchReduceArray = tagReduceArray.filter(
      (recipe) =>
        recipe.ingredients
          .map((item) => normalize(item.ingredient))
          .includes(value) ||
        recipe.name.includes(value) ||
        recipe.description.includes(value)
    );
    removeTags();
    console.log("coucou", tagReduceArray);

    console.log("Recoucou", tagReduceArray);
    buildCard(searchReduceArray);
    getIngredientsList(searchReduceArray);
    getAppliancesList(searchReduceArray);
    getUstensilList(searchReduceArray);
  } else if (value.length < 3 && tagList.length < 1) {
    buildCard(recipes);
    getAppliancesList(recipes);
    getUstensilList(recipes);
    getIngredientsList(recipes);
  } else if (value.length < 3 && tagList.length > 0) {
    removeTags();

    console.log("coucou", tagReduceArray);
    tagFilter();
    console.log("Recoucou", tagReduceArray);
    buildCard(tagReduceArray);
    getIngredientsList(tagReduceArray);
    getAppliancesList(tagReduceArray);
    getUstensilList(tagReduceArray);
  }
};

// const searchFilter = () => {
//   recipeCardsContainer.innerHTML = "";
//   buildCard(recipes);
//   const value = normalize(searchBar.value);

//   setTimeout(() => {
//     if (value.length >= 3) {
//       searchReduceArray = searchReduceArray.filter(
//         (recipe) =>
//           recipe.ingredients
//             .map((item) => normalize(item.ingredient))
//             .includes(value) ||
//           recipe.name.includes(value) ||
//           recipe.description.includes(value)
//       );
//     }
//   }, 650);
//   tagFilter();
//   buildCard(searchReduceArray);
//   getAppliancesList(searchReduceArray);
//   getUstensilList(searchReduceArray);
//   getIngredientsList(searchReduceArray);
//   manageTags();
// };
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

/////// create tags & push to taglist/////////
const manageTags = () => {
  lists.forEach((list) => {
    console.log(list.dataset.category);
    list.querySelectorAll(".list").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.target.remove();
        const tag = e.target.textContent;
        tagList.push(tag);
        tagList = [...new Set(tagList)];
        tagList.map((tagVal) => {
          console.log(tagVal);
          if (normalize(tagVal).includes(normalize(tag))) {
            switch (list.dataset.category) {
              case "ingredient":
                tags.insertAdjacentHTML(
                  "beforeend",
                  `
                  <button class="tags ingredient_style">${tagVal}<img class="closeTag" src="${closeArrow}"  data-value="${tagVal}"></img></button>
                  `
                );
                break;
              case "device":
                tags.insertAdjacentHTML(
                  "beforeend",
                  `
                  <button class="tags device_style">${tagVal}<img class="closeTag" src="${closeArrow}"  data-value="${tagVal}"></img></button>
                  `
                );
                break;
              case "ustensil":
                tags.insertAdjacentHTML(
                  "beforeend",
                  `
                  <button class="tags ustensil_style">${tagVal}<img class="closeTag" src="${closeArrow}"  data-value="${tagVal}"></img></button>
                  `
                );
                break;
              default:
                console.log("error categories undefined");
            }
            lists.innerHTML = "";
          }
        });
        // if (tagList.includes(tag)) {

        // }
        console.log(tagList);
        removeTags();
        tagFilter();
        searchFilter();
      });
    });
  });
};

///// filter by tags ///////
// const tagFilter = () => {
//   return tagList.forEach((tag) => {
//     if (tag) {
//       searchReduceArray = searchReduceArray.filter(
//         (e) =>
//           e.ingredients.some((item) =>
//             normalize(item.ingredient).includes(normalize(tag))
//           ) ||
//           normalize(e.appliance).includes(normalize(tag)) ||
//           e.ustensils.some((item) => normalize(item).includes(normalize(tag)))
//       );
//       console.log("tagf", searchReduceArray);
//     }
//   });
// };

const tagFilter = () => {
  return tagList.map((tag) => {
    console.log(searchReduceArray);
    if (tagReduceArray.length < 1 && searchReduceArray.length < 1) {
      tagReduceArray = [].concat(recipes);
    } else if (tagReduceArray.length < 1 && searchReduceArray.length > 0) {
      tagReduceArray = [].concat(searchReduceArray);
    }
    console.log("hééééé", searchReduceArray);
    console.log("oooohhh", tagReduceArray);
    if (tagReduceArray.length > 0) {
      if (tag) {
        tagReduceArray = tagReduceArray.filter(
          (e) =>
            e.ingredients.some((item) =>
              normalize(item.ingredient).includes(normalize(tag))
            ) ||
            normalize(e.appliance).includes(normalize(tag)) ||
            e.ustensils.some((item) => normalize(item).includes(normalize(tag)))
        );
        console.log(tagReduceArray);
        return tagReduceArray;
      }
    }
  });
};
// fonction qui va reconstruire une liste de recettes selon les TAGS choisis
// function tagRecipes() {
//   if (reducedRecipesArray.length === 0) { reducedRecipesArray = [].concat(recipesArray); }
//   reducedTagRecipesArray = [].concat(reducedRecipesArray);
//   selectedIngredientsArray.forEach((selectedIngredient) => reducedTagRecipesArray = reducedTagRecipesArray.filter((item) => item.ingredients.some(
//     (ingredient) => ingredient.ingredient == selectedIngredient,
//   )));

//   selectedApplianceArray.forEach((selectedAppliance) =>
//     reducedTagRecipesArray = reducedTagRecipesArray.filter((item) =>
//       item.appliance == selectedAppliance));

//   selectedUstensilsArray.forEach((selectedUstensil) =>
//     reducedTagRecipesArray = reducedTagRecipesArray.filter((item) =>
//       item.ustensils.some(
//         (ustensil) => ustensil == selectedUstensil)));
//   console.log('reducedTagRecipesArray APRES TAGS', reducedTagRecipesArray);
// }
// const tagFilter = (tag) => {
//   switch (tag.category) {
//     case "ingredient":
//       searchReduceArray = searchReduceArray.filter((recipe) => {
//         return recipe.ingredients.some((ingredient) => {
//           return ingredient.ingredient
//             .toLowerCase()
//             .includes(tag.value.toLowerCase());
//         });
//       });
//       break;

//     case "device":
//       searchReduceArray = searchReduceArray.filter((recipe) => {
//         return recipe.appliance.toLowerCase().includes(tag.value.toLowerCase());
//       });
//       break;

//     case "utensil":
//       searchReduceArray = searchReduceArray.filter((recipe) => {
//         return recipe.ustensils.some((ustensil) => {
//           return ustensil.toLowerCase().includes(tag.value.toLowerCase());
//         });
//       });
//       break;
//   }

//   return searchReduceArray;
// };
///// remove tags //////
// const removeTags = () => {
//   let clsTag = document.querySelectorAll(".closeTag");
//   for (let item of clsTag) {
//     item.addEventListener("click", (e) => {
// let tagVal = normalize(e.target.closest(".tags").textContent);
// tagList = tagList.filter((tag) => tag !== tagVal);
//       tagFilter();
//       buildCard(searchReduceArray);
//       e.target.closest(".tags").remove();
//     });
//   }
// };

const removeTags = () => {
  document.querySelectorAll(".closeTag").forEach((tag) => {
    tag.addEventListener("mousedown", (e) => {
      let tagVal = normalize(e.target.closest(".tags").textContent);
      tagList = tagList.filter((tag) => tag !== tagVal);
      e.target.closest(".tags").remove();
      searchFilter();
    });
  });
};
const removeCards = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.remove());
};
/*****initialisation de toutes les valeurs(cards, lists) *******/
init();
