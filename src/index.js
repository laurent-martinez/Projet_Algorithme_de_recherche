import "./styles/main.scss";
import { recipes } from "./data/recipes.js";
import { buildCard } from "./views/buildCard";
import { buildAppliance } from "./views/buildList";
import { buildIngredients } from "./views/buildList";
import { buildUstensils } from "./views/buildList";
import { list } from "./scripts/list";
import { Filter } from "./scripts/class/Filter";

// DOM
const searchInput = document.querySelector("#search-input");
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
  recipes?.forEach((recipe) => {
    buildCard(recipe);
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
const manageTags = () => {
  listResult.forEach((list) => {
    list.querySelectorAll(".item-list").forEach((itemList) => {
      itemList.addEventListener("click", (e) => {
        const tag = {
          // objet tag avec une value et un type
          value: e.target.textContent, // la valeur sur laquelle je clique dans ma liste
          type: e.target.closest(".list-result").dataset.type, // je vais chercher data-type de mon html(ingredients, apparatus ou ustensils)
        };
        tagList.push(tag); // je mets dans mon tableau tous ce que je click
        tags.innerHTML += `
                    <button class="tag tag-${tag.type}">${tag.value}<i class="fa-solid fa-xmark close-tag" data-value="${tag.value}"></i></button>
                `;
        const tagResult = filter.byTags(tag); // je trie avec ma class Filter
        searchResult.innerHTML = ""; // je vide les résultas qui ne correspondent pas

        buildCards(tagResult);
        buildIngredients(
          tagResult,
          tagList
            .filter((tag) => tag.type == "ingredients")
            .map((tag) => tag.value)
        );
        buildAppliance(
          tagResult,
          tagList
            .filter((tag) => tag.type == "appliance")
            .map((tag) => tag.value)
        );
        buildUstensils(
          tagResult,
          tagList
            .filter((tag) => tag.type == "ustensils")
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
  buildCards(result);
  buildIngredients(
    result,
    tagList.filter((tag) => tag.type == "ingredients").map((tag) => tag.value)
  );
  buildAppliance(
    result,
    tagList.filter((tag) => tag.type == "appliance").map((tag) => tag.value)
  );
  buildUstensils(
    result,
    tagList.filter((tag) => tag.type == "ustensils").map((tag) => tag.value)
  );
  eventTag();
};

searchIngredients.addEventListener("keyup", () => {
  buildIngredients(recipes, tagList);
  eventTag();
});

searchAppliance.addEventListener("keyup", () => {
  buildAppliance(recipes, tagList);
  eventTag();
});

searchUstensils.addEventListener("keyup", () => {
  buildUstensils(recipes, tagList);
});

/**
 * Initialisation
 */
buildCards(recipes);
buildIngredients(recipes, []);
buildAppliance(recipes, []);
buildUstensils(recipes, []);
list();
manageTags();

// let moyenne = [];
// setTimeout(() => {
//   for (let i = 0; i < 50; i++) {
//     let start = performance.now();
//     searchBarFilter();
//     moyenne.push(performance.now() - start);
//   }
//   for (let i = 0; i < 100; i++) {
//     let start = performance.now();
//     searchBarFilter();
//     moyenne.push(performance.now() - start);
//   }
//   for (let i = 0; i < 20; i++) {
//     let start = performance.now();
//     searchBarFilter();
//     moyenne.push(performance.now() - start);
//   }
//   for (let i = 0; i < 150; i++) {
//     let start = performance.now();
//     searchBarFilter();
//     moyenne.push(performance.now() - start);
//   }

//   console.log(moyenne.reduce((a, b) => a + b) / moyenne.length);
// }, 350);
