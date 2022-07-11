import "./styles/main.scss";
import { recipes } from "./data/recipes.js";
import { displayCard } from "./display/displayCard";
import { displayAppliance } from "./display/displayCategory";
import { displayIngredients } from "./display/displayCategory";
import { displayUtensils } from "./display/displayCategory";
import { list } from "./scripts/list";
import { Filter } from "./scripts/class/Filter";

// DOM
const searchInput = document.querySelector("#search-input");
const searchResult = document.querySelector("#search-result");
const searchIngredients = document.querySelector("#search-ingredients");
const searchAppliance = document.querySelector("#search-appliance");
const searchUtensils = document.querySelector("#search-utensils");
const tags = document.querySelector("#tags");
const listResult = document.querySelectorAll(".list-result");

// CLASS
const filter = new Filter(recipes);

// ARRAY
let tagList = [];

/**
 * Affichage des recettes
 */
const displayCards = (recipes) => {
  recipes?.forEach((recipe) => {
    displayCard(recipe);
  });
};

/**
 * Search bar
 */
searchInput.addEventListener("keyup", () => {
  searchResult.innerHTML = "";
  filterTagSearch();
});

/**
 * Gestion des tags
 */
const eventTag = () => {
  listResult.forEach((list) => {
    list.querySelectorAll(".item-list").forEach((itemList) => {
      itemList.addEventListener("click", (e) => {
        const tag = {
          // objet tag avec une value et un type
          value: e.target.textContent, // la valeur sur laquelle je clique dans ma liste
          type: e.target.closest(".list-result").dataset.type, // je vais chercher data-type de mon html(ingredients, apparatus ou utensils)
        };
        tagList.push(tag); // je mets dans mon tableau tous ce que je click
        tags.innerHTML += `
                    <button class="tag tag-${tag.type}">${tag.value}<i class="fa-solid fa-xmark close-tag" data-value="${tag.value}"></i></button>
                `;
        const tagResult = filter.byTags(tag); // je trie avec ma class Filter
        searchResult.innerHTML = ""; // je vide les résultas qui ne correspondent pas

        displayCards(tagResult);
        displayIngredients(
          tagResult,
          tagList
            .filter((tag) => tag.type == "ingredients")
            .map((tag) => tag.value)
        );
        displayAppliance(
          tagResult,
          tagList
            .filter((tag) => tag.type == "appliance")
            .map((tag) => tag.value)
        );
        displayUtensils(
          tagResult,
          tagList
            .filter((tag) => tag.type == "utensils")
            .map((tag) => tag.value)
        );
        eventTag();
        removeTag();
      });
    });
  });
};

/**
 * Suppression tag
 */
const removeTag = () => {
  document.querySelectorAll(".close-tag").forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.target.closest(".tag").remove();
      tagList = tagList.filter((tag) => tag.value != e.target.dataset.value);
      searchResult.innerHTML = "";
      filterTagSearch();
    });
  });
};

/**
 * Filtre par la barre de recherche et les tags (ensemble)
 */
const filterTagSearch = () => {
  filter.recipes = recipes;
  let result = filter.recipes;
  let input = document.querySelector("#search-input").value;
  if (input.length >= 3) {
    result = filter.bySearch(input);
  }
  tagList.forEach((tag) => {
    result = filter.byTags(tag);
  });
  displayCards(result);
  displayIngredients(
    result,
    tagList.filter((tag) => tag.type == "ingredients").map((tag) => tag.value)
  );
  displayAppliance(
    result,
    tagList.filter((tag) => tag.type == "appliance").map((tag) => tag.value)
  );
  displayUtensils(
    result,
    tagList.filter((tag) => tag.type == "utensils").map((tag) => tag.value)
  );
  eventTag();
};

searchIngredients.addEventListener("keyup", () => {
  displayIngredients(recipes, tagList);
  eventTag();
});

searchAppliance.addEventListener("keyup", () => {
  displayAppliance(recipes, tagList);
  eventTag();
});

searchUtensils.addEventListener("keyup", () => {
  displayUtensils(recipes, tagList);
});

/**
 * Initialisation
 */
displayCards(recipes);
displayIngredients(recipes, []);
displayAppliance(recipes, []);
displayUtensils(recipes, []);
list();
eventTag();

let moyenne = [];
setTimeout(() => {
  for (let i = 0; i < 50; i++) {
    let start = performance.now();
    filterTagSearch();
    moyenne.push(performance.now() - start);
  }
  console.log(moyenne.reduce((a, b) => a + b) / moyenne.length);
}, 350);

// setTimeout(() => {
//   for (let i = 0; i < 50; i++) {
//     let start = performance.now();
//     filterTagSearch();
//     moyenne.push(performance.now() - start);
//   }
//   console.log(moyenne.reduce((a, b) => a + b) / moyenne.length);
// }, 350);
