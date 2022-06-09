import "./styles/main.scss";
import { recipes } from "./data/recipes.js";
import { displayCard } from "./display/displayCard";

import { Filter } from "./scripts/class/Filter";

// CLASS
const filter = new Filter(recipes);

const displayCards = (recipes) => {
  recipes?.forEach((recipe) => {
    displayCard(recipe);
  });
};
displayCards(recipes);
