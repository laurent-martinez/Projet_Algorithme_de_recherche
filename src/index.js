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

// Create the search bar //
const searchBar = document.querySelector("[data-search]");
const buildSearchBar = () => {
  const logoBrand = document.getElementById("logo");
  logoBrand.src = cooking;
  const searchPicture = document.getElementById("search_picture");
  searchPicture.src = magnifying;
};
buildSearchBar();

// Build the cards //

const buildCard = () => {
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
};
buildCard();

searchBar.addEventListener("input", (e) => {
  const value = e.target.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
  console.log(value);
  recipeList.forEach((list) => {
    let isVisible;
    list.ingred.forEach((ing) => {
      console.log(ing);
      console.log(list);
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
      if (value === ing.ingredient) {
        allIngredients = allIngredients.filter((el) => el !== ing.ingredient);
      }
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

let allIngredients = [];
const getIngredientsList = () => {
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((object) => {
      allIngredients.push(
        object.ingredient.toLowerCase().replace(/\p{Diacritic}/gu, "")
      );
    });
  });
  allIngredients = [...new Set(allIngredients)];
  allIngredients.forEach((finalList) => {
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

let allAppliances = [];

const getAppliancesList = () => {
  recipes.map((recipe) => {
    let appliances = recipe.appliance
      .toLowerCase()
      .replace(/\p{Diacritic}/gu, "");
    allAppliances.push(appliances);
  });
  allAppliances = [...new Set(allAppliances)];
  allAppliances.forEach((object) => {
    const device_li = document.createElement("li");
    device_li.className = "device_li";
    device_li.innerHTML += object;
    devices.appendChild(device_li);
  });
};
getAppliancesList();

//DOM //
const ustensilsM = document.querySelector(".ustensil_menu");
let allUstensils = [];

const getUstensilList = () => {
  recipes.map((recipe) => {
    recipe.ustensils.forEach((object) => {
      allUstensils.push(object.toLowerCase().replace(/\p{Diacritic}/gu, ""));
    });
  });
  allUstensils = [...allUstensils];
  allUstensils = [...new Set(allUstensils)];
  allUstensils.forEach((object) => {
    const ustensil_li = document.createElement("li");
    ustensil_li.className = "ustensil_li";
    ustensil_li.innerHTML += `${object}`;
    ustensilsM.appendChild(ustensil_li);
  });
};
getUstensilList();

// const getCategoriesTag = (category) => {
//   const categories = document.getElementsByClassName(`${category}_li`);
//   const buttons = document.querySelector(".buttons");
//   const firstChild = buttons.firstChild;

//   for (let item of categories) {
//     item.addEventListener("click", () => {
//       let tag = document.createElement("button");
//       tag.className = "tags";
//       tag.textContent = item.textContent;
//       console.log(item);
//       let closeTag = document.createElement("img");
//       closeTag.className = "closeTag";
//       closeTag.src = closeArrow;

//       buttons.insertBefore(tag, firstChild);
//       buttons.appendChild(tag);
//       tag.appendChild(closeTag);

//       if (!(tag.style.display === "none")) {
//         item.style.display = "none";
//       } else {
//         item.style.display = "";
//       }

//       let clsTag = document.querySelectorAll(".closeTag");
//       for (let item of clsTag) {
//         item.addEventListener("click", () => {
//           tag.style.display = "none";
//           item.style.display = "";
//         });
//       }

//       let value =
//         tag.innerText
//           .toLowerCase()
//           .normalize("NFD")
//           .replace(/\p{Diacritic}/gu, "") ||
//         tag.textContent
//           .toLowerCase()
//           .normalize("NFD")
//           .replace(/\p{Diacritic}/gu, "");

//       if (!(tag.style.display === "none")) {
//         recipeList.forEach((list) => {
//           let isVisible;
//           for (let ing of list.ingred) {
//             console.log(ing.ingredient);
//             isVisible = ing.ingredient
//               .toLowerCase()
//               .normalize("NFD")
//               .replace(/\p{Diacritic}/gu, "")
//               .includes(value);
//           }

//           list.element.classList.toggle("hide", !isVisible);
//         });
//       }
//     });
//   }
// };
// getCategoriesTag("ingredients");

// find the tags who match the search//
const searchTags = (category) => {
  const searchBox = document.querySelector(`.${category}_search`);
  const ingredient_menu = document.querySelector(".ingredient_menu");
  const items = document.querySelectorAll(`.${category}_li`);
  for (let item of items) {
    let valuue =
      item.textContent
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "") ||
      item.innerHTML
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    searchBox.addEventListener("input", (element) => {
      let value = element.target.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
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
console.log(allIngredients);
const getCategoriesTag = (category, tabs) => {
  const categories = document.getElementsByClassName(`${category}_li`);
  const buttons = document.querySelector(".buttons");
  const firstChild = buttons.firstChild;

  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", () => {
      let tag = document.createElement("button");
      tag.className = "tags";
      tag.textContent = categories[i].textContent;
      let closeTag = document.createElement("img");
      closeTag.className = "closeTag";
      closeTag.src = closeArrow;

      buttons.insertBefore(tag, firstChild);
      buttons.appendChild(tag);
      tag.appendChild(closeTag);
      let filterIng = tag.textContent;
      if (tag) {
        let index = tabs.findIndex((el) => el === filterIng);
        tabs.splice(index, 1);
      }

      let clsTag = document.querySelectorAll(".closeTag");
      for (let item of clsTag) {
        item.addEventListener("click", (e) => {
          tag.remove();
          tabs.unshift(tag.textContent);
          console.log(tabs);
        });
      }
      tabs = tabs.filter((e, i) => tabs.indexOf(e) == i);
      console.log(tabs);
      let value =
        tag.innerText
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "") ||
        tag.textContent
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "");

      if (value) {
        recipeList.forEach((list) => {
          let isVisibleA;
          list.ingred.forEach((ing) => {
            isVisibleA = ing.ingredient
              .toLowerCase()
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .includes(value);
          });

          list.element.classList.toggle("hide", !isVisibleA);
        });
      }
    });
  }
  return tabs;
};
getCategoriesTag("ingredients", allIngredients);
getCategoriesTag("device", allAppliances);
getCategoriesTag("ustensil", allUstensils);
