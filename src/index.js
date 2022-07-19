import "./styles/main.scss";
import { recipes } from "./data/recipes.js";
import { buildCard } from "./views/buildCard";
import { buildAppliance } from "./views/buildList";
import { buildIngredients } from "./views/buildList";
import { buildUstensils } from "./views/buildList";
import { dropdownOpen } from "./scripts/dropdownOpening";
import { Filter } from "./scripts/Filters";

// DOM
const searchInput = document.querySelector("#searchBar-input");
const searchResult = document.querySelector("#search-result");
const searchIngredients = document.querySelector("#search-ingredients");
const searchAppliance = document.querySelector("#search-appliance");
const searchUstensils = document.querySelector("#search-ustensils");
const tags = document.querySelector("#tags");
const listResult = document.querySelectorAll(".list-result");

// UTILS //
export const normalize = (variable) => {
  return variable
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};
// CLASS //
const filter = new Filter(recipes);

// ARRAY //
let tagList = [];

// display Cards ///

const buildCards = (recipes) => {
  searchResult.innerHTML = "";
  recipes?.forEach((recipe) => {
    buildCard(recipe);
  });
};

// eventListeners //

searchInput.addEventListener("keyup", () => {
  searchResult.innerHTML = "";
  filterTagSearch();
});

searchIngredients.addEventListener("keyup", () => {
  buildIngredients(recipes, tagList);
  manageTags();
});

searchAppliance.addEventListener("keyup", () => {
  buildAppliance(recipes, tagList);
  manageTags();
});

searchUstensils.addEventListener("keyup", () => {
  buildUstensils(recipes, tagList);
  manageTags();
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
                    <button class="tag tag-${tag.type}">${tag.value} <svg width="20" class="close-tag" data-value="${tag.value}" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                    </svg>
                    </button>
                `;
        const tagResult = filter.recipesByTags(tag); // je trie avec ma class Filter
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
        manageTags();
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
  let input = document.querySelector("#searchBar-input").value;
  if (input.length >= 3) {
    result = filter.recipesByInput(input);
  }
  tagList.forEach((tag) => {
    result = filter.recipesByTags(tag);
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
  manageTags();
};

/**
 * Initialisation
 */
buildCards(recipes);
buildIngredients(recipes, []);
buildAppliance(recipes, []);
buildUstensils(recipes, []);
dropdownOpen();
manageTags();

// let moyenne = [];
// setTimeout(() => {
//   for (let i = 0; i < 50; i++) {
//     let start = performance.now();
//     filterTagSearch();
//     moyenne.push(performance.now() - start);
//   }
//   for (let i = 0; i < 100; i++) {
//     let start = performance.now();
//     filterTagSearch();
//     moyenne.push(performance.now() - start);
//   }
//   for (let i = 0; i < 20; i++) {
//     let start = performance.now();
//     filterTagSearch();
//     moyenne.push(performance.now() - start);
//   }
//   for (let i = 0; i < 150; i++) {
//     let start = performance.now();
//     filterTagSearch();
//     moyenne.push(performance.now() - start);
//   }

//   console.log(moyenne.reduce((a, b) => a + b) / moyenne.length);
// }, 350);
