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
    return this.recipes;
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

      case "ustensils":
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
