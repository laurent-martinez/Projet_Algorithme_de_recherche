export class Filter {
  constructor(recipes) {
    this.recipes = recipes;
  }

  recipesByInput(input) {
    this.recipes = this.recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(input.toLowerCase()) ||
        recipe.description.toLowerCase().includes(input.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
        )
      );
    });
    if (this.recipes.length == 0) {
      const searchResult = document.querySelector("#search-result");
      const result = document.createElement("div");
      const text = document.createElement("p");
      result.classList.add("result");
      text.classList.add("no-result");
      text.textContent = "Aucune recette ne correspond à votre recherche";
      result.appendChild(text);
      searchResult.appendChild(result);
    } else {
      return this.recipes;
    }
  }

  recipesByTags(tag) {
    switch (tag.type) {
      case "ingredients":
        this.recipes = this.recipes.filter((recipe) => {
          return recipe.ingredients.some((ingredient) => {
            return ingredient.ingredient
              .toLowerCase()
              .includes(tag.value.toLowerCase());
          });
        });
        break;

      case "appliance":
        this.recipes = this.recipes.filter((recipe) => {
          return recipe.appliance
            .toLowerCase()
            .includes(tag.value.toLowerCase());
        });
        break;

      case "utensils":
        this.recipes = this.recipes.filter((recipe) => {
          return recipe.ustensils.some((ustensil) => {
            return ustensil.toLowerCase().includes(tag.value.toLowerCase());
          });
        });
        break;
    }

    return this.recipes;
  }
}
