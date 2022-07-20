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
                    <button class="tag tag-${tag.type}">${tag.value}<i class="fa-solid fa-xmark close-tag" data-value="${tag.value}"></i> 
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
  if (result.length == 0) {
    const result = document.createElement("div");
    const text = document.createElement("p");
    result.classList.add("result");
    text.classList.add("no-result");
    text.textContent = "Aucune recette ne correspond à votre recherche";
    console.log(text);
    result.append(text);
    searchResult.append(result);
  } else {
    buildCards(result);
  }
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

let moyenne = [];
setTimeout(() => {
  for (let i = 0; i < 50; i++) {
    let start = performance.now();
    filterTagSearch();
    moyenne.push(performance.now() - start);
  }
  for (let i = 0; i < 100; i++) {
    let start = performance.now();
    filterTagSearch();
    moyenne.push(performance.now() - start);
  }
  for (let i = 0; i < 20; i++) {
    let start = performance.now();
    filterTagSearch();
    moyenne.push(performance.now() - start);
  }
  for (let i = 0; i < 150; i++) {
    let start = performance.now();
    filterTagSearch();
    moyenne.push(performance.now() - start);
  }

  console.log(moyenne.reduce((a, b) => a + b) / moyenne.length);
}, 350);
