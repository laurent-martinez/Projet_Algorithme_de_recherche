export class Filter {
  constructor(recipes) {
    this.recipes = recipes;
  }

  // bySearch(input) {
  // this.recipes = this.recipes.filter((recipe) => {
  //   return (
  //     recipe.name.toLowerCase().includes(input.toLowerCase()) ||
  //     recipe.description.toLowerCase().includes(input.toLowerCase()) ||
  //     recipe.ingredients.some((ingredient) =>
  //       ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
  //     )
  //   );
  // });
  //   if (this.recipes.length == 0) {
  //     const searchResult = document.querySelector("#search-result");
  //     const result = document.createElement("p");
  //     result.classList.add("no-result");
  //     result.textContent = "Aucune recette ne correspond à votre recherche";
  //     searchResult.appendChild(result);
  //   } else {
  //     return this.recipes;
  //   }
  // }

  bySearch(input) {
    let searchBarArray = [];
    for (let i = 0; i < this.recipes.length; i++) {
      if (
        this.recipes[i].name.toLowerCase().includes(input.toLowerCase()) ||
        this.recipes[i].description
          .toLowerCase()
          .includes(input.toLowerCase()) ||
        this.recipes[i].ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(input.toLowerCase())
        )
      ) {
        searchBarArray.push(this.recipes[i]);
      }
    }
    this.recipes = searchBarArray;

    return this.recipes;
  }

  byTags(tag) {
    switch (tag.type) {
      case "ingredients":
        // this.recipes = this.recipes.filter((recipe) => {
        //   return recipe.ingredients.some((ingredient) => {
        //     return ingredient.ingredient
        //       .toLowerCase()
        //       .includes(tag.value.toLowerCase());
        //   });
        // });
        let ingArray = [];
        for (let i = 0; i < this.recipes.length; i++) {
          this.recipes[i].ingredients.some((ingredient) => {
            if (
              ingredient.ingredient
                .toLowerCase()
                .includes(tag.value.toLowerCase())
            ) {
              ingArray.push(this.recipes[i]);
              console.log(ingArray);
            }
          });
        }
        this.recipes = ingArray;

        break;

      case "appliance":
        // this.recipes = this.recipes.filter((recipe) => {
        //   return recipe.appliance
        //     .toLowerCase()
        //     .includes(tag.value.toLowerCase());
        // });
        let appArray = [];
        for (let i = 0; i < this.recipes.length; i++) {
          if (
            this.recipes[i].appliance
              .toLowerCase()
              .includes(tag.value.toLowerCase())
          ) {
            appArray.push(this.recipes[i]);
            console.log(appArray);
          }
        }
        this.recipes = appArray;
        break;

      case "ustensils":
        // this.recipes = this.recipes.filter((recipe) => {
        //   return recipe.ustensils.some((ustensil) => {
        //     return ustensil.toLowerCase().includes(tag.value.toLowerCase());
        //   });
        // });
        let usArray = [];
        for (let i = 0; i < this.recipes.length; i++) {
          this.recipes[i].ustensils.some((ustensil) => {
            if (ustensil.toLowerCase().includes(tag.value.toLowerCase())) {
              usArray.push(this.recipes[i]);
              console.log(usArray);
            }
          });
        }
        this.recipes = usArray;
        break;
    }

    return this.recipes;
  }
}
