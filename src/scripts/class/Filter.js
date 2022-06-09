export class Filter {
  constructor(recipes) {
    this.recipes = recipes;
  }

  bySearch(input) {
    this.recipes = this.recipes.filter((recipe) => {
      // filter : me retourne tous les éléments trouvés correspondant
      //console.log("recettes :", recipe)
      return (
        recipe.name.toLowerCase().includes(input.toLowerCase()) ||
        recipe.description.toLowerCase().includes(input.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
        )
      );
    });
    if (this.recipes.length == 0) {
      const $searchResult = document.querySelector("#search-result");
      const result = document.createElement("p");
      result.classList.add("no-result");
      result.textContent = "Aucune recette ne correspond à votre recherche";
      $searchResult.appendChild(result);
    } else {
      return this.recipes;
    }
  }

  byTags(tag) {
    switch (
      tag.type // je viens chercher la valeur type de mon objet tag
    ) {
      case "ingredients":
        this.recipes = this.recipes.filter((recipe) => {
          return recipe.ingredients.some((ingredient) => {
            return ingredient.ingredient
              .toLowerCase()
              .includes(tag.value.toLowerCase());
          });
        });
        break;

      case "devices":
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
    //console.log("tag", this.recipes)
    return this.recipes;
  }
}
