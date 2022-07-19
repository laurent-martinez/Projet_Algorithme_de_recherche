import "./styles/main.scss";
import { recipes } from "./data/recipes.js";
import { buildCard } from "./views/buildCard";
import { buildApplianceList } from "./views/buildDropdown";
import { buildIngredientsList } from "./views/buildDropdown";
import { buildUstensilsList } from "./views/buildDropdown";
import { dropdownOpen } from "./scripts/dropdownOpening";
import { Filter } from "./scripts/Filters";

// DOM
const searchBarInput = document.querySelector("#searchBar-input");
const searchResult = document.querySelector("#search-result");
const searchIngredients = document.querySelector("#search-ingredients");
const searchAppliance = document.querySelector("#search-appliance");
const searchUstensils = document.querySelector("#search-ustensils");
const tags = document.querySelector("#tags");
const listResult = document.querySelectorAll(".list-result");

// CLASS
const filter = new Filter(recipes);

// ARRAY
let tagList = [];

/**
 * Affichage des recettes
 */

const buildCards = (recipes) => {
  searchResult.innerHTML = "";
  for (let i = 0; i < recipes.length; i++) {
    buildCard(recipes[i]);
  }
};
/**
 * Search bar
 */
searchBarInput.addEventListener("keyup", () => {
  searchResult.innerHTML = "";
  searchBarFilter();
});

/**
 * Gestion des tags
 */
const manageTags = () => {
  for (let i = 0; i < listResult.length; i++) {
    let item = listResult[i].querySelectorAll(".item-list");
    for (let j = 0; j < item.length; j++) {
      item[j].addEventListener("click", (e) => {
        const tag = {
          // objet tag avec une value et un type
          value: e.target.textContent, // la valeur sur laquelle je clique dans ma liste
          type: e.target.closest(".list-result").dataset.type, // je vais chercher data-type de mon html(ingredients, apparatus ou ustensils)
        };
        tagList.push(tag); // je mets dans mon tableau tous ce que je click
        tags.innerHTML += `
        <button class="tag tag-${tag.type}">${tag.value}<i class="fa-solid fa-xmark close-tag" data-value="${tag.value}"></i></button>
        `;
        tags.style.display = "flex";
        const tagResult = filter.byTags(tag); // je trie avec ma class Filter
        searchResult.innerHTML = ""; // je vide les résultas qui ne correspondent pas

        buildCards(tagResult);
        buildIngredientsList(
          tagResult,
          tagList
            .filter((tag) => tag.type == "ingredients")
            .map((tag) => tag.value)
        );
        buildApplianceList(
          tagResult,
          tagList
            .filter((tag) => tag.type == "appliance")
            .map((tag) => tag.value)
        );
        buildUstensilsList(
          tagResult,
          tagList
            .filter((tag) => tag.type == "ustensils")
            .map((tag) => tag.value)
        );
        manageTags();
        eraseTags();
      });
    }
  }
  // listResult.forEach((list) => {
  //   list.querySelectorAll(".item-list").forEach((itemList) => {
  //     itemList.addEventListener("click", (e) => {
  //       const tag = {
  //         // objet tag avec une value et un type
  //         value: e.target.textContent, // la valeur sur laquelle je clique dans ma liste
  //         type: e.target.closest(".list-result").dataset.type, // je vais chercher data-type de mon html(ingredients, apparatus ou utensils)
  //       };
  //       tagList.push(tag); // je mets dans mon tableau tous ce que je click
  //       tags.innerHTML += `
  //                   <button class="tag tag-${tag.type}">${tag.value}<i class="fa-solid fa-xmark close-tag" data-value="${tag.value}"></i></button>
  //               `;
  //       const tagResult = filter.byTags(tag); // je trie avec ma class Filter
  //       searchResult.innerHTML = ""; // je vide les résultas qui ne correspondent pas

  //       displayCards(tagResult);
  //       displayIngredients(
  //         tagResult,
  //         tagList
  //           .filter((tag) => tag.type == "ingredients")
  //           .map((tag) => tag.value)
  //       );
  //       displayAppliance(
  //         tagResult,
  //         tagList
  //           .filter((tag) => tag.type == "appliance")
  //           .map((tag) => tag.value)
  //       );
  //       displayUtensils(
  //         tagResult,
  //         tagList
  //           .filter((tag) => tag.type == "utensils")
  //           .map((tag) => tag.value)
  //       );
  //       eventTag();
  //       removeTag();
  //     });
  //   });
  // });
};

/**
 * Suppression tag
 */
const eraseTags = () => {
  let clsTag = document.querySelectorAll(".close-tag");
  for (let i = 0; i < clsTag.length; i++) {
    clsTag[i].addEventListener("click", (e) => {
      e.target.closest(".tag").remove();
      tagList = tagList.filter((tag) => tag.value != e.target.dataset.value);
      searchResult.innerHTML = "";
      searchBarFilter();
    });
  }
};

/**
 * Filtre par la barre de recherche et les tags (ensemble)
 */
const searchBarFilter = () => {
  filter.recipes = recipes;
  let result = filter.recipes;
  let input = document.querySelector("#searchBar-input").value;
  if (input.length >= 3) {
    result = filter.bySearch(input);
  }
  tagList.forEach((tag) => {
    result = filter.byTags(tag);
  });
  buildCards(result);
  buildIngredientsList(
    result,
    tagList.filter((tag) => tag.type == "ingredients").map((tag) => tag.value)
  );
  buildApplianceList(
    result,
    tagList.filter((tag) => tag.type == "appliance").map((tag) => tag.value)
  );
  buildUstensilsList(
    result,
    tagList.filter((tag) => tag.type == "ustensils").map((tag) => tag.value)
  );
  manageTags();
};

searchIngredients.addEventListener("keyup", () => {
  buildIngredientsList(recipes, tagList);
  manageTags();
});

searchAppliance.addEventListener("keyup", () => {
  buildApplianceList(recipes, tagList);
  manageTags();
});

searchUstensils.addEventListener("keyup", () => {
  buildUstensilsList(recipes, tagList);
  manageTags();
});

/**
 * Initialisation
 */
buildCards(recipes);
buildIngredientsList(recipes, []);
buildApplianceList(recipes, []);
buildUstensilsList(recipes, []);
dropdownOpen();

manageTags();

let moyenne = [];
setTimeout(() => {
  for (let i = 0; i < 50; i++) {
    let start = performance.now();
    searchBarFilter();
    moyenne.push(performance.now() - start);
  }
  for (let i = 0; i < 100; i++) {
    let start = performance.now();
    searchBarFilter();
    moyenne.push(performance.now() - start);
  }
  for (let i = 0; i < 20; i++) {
    let start = performance.now();
    searchBarFilter();
    moyenne.push(performance.now() - start);
  }
  for (let i = 0; i < 150; i++) {
    let start = performance.now();
    searchBarFilter();
    moyenne.push(performance.now() - start);
  }

  console.log(moyenne.reduce((a, b) => a + b) / moyenne.length);
}, 350);

// score : 10.13,10.38,11.8,9.50,8.71

// setTimeout(() => {
//   for (let i = 0; i < 50; i++) {
//     let start = performance.now();
//     filterTagSearch();
//     moyenne.push(performance.now() - start);
//   }
//   console.log(moyenne.reduce((a, b) => a + b) / moyenne.length);
// }, 350);
