export const dropdownOpen = () => {
  const listComboBox = document.querySelectorAll(".combo-box");
  const input = document.querySelector(".i");
  listComboBox.forEach((comboBox) => {
    comboBox.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("open")) {
        e.currentTarget.classList.remove("open");
        e.currentTarget.querySelector("input").placeholder =
          e.currentTarget.querySelector("input").dataset.type;
      } else {
        listComboBox.forEach((combo) => {
          combo.classList.remove("open");
          combo.querySelector("input").placeholder =
            combo.querySelector("input").dataset.type;
        });
        e.currentTarget.classList.add("open");
        e.currentTarget.querySelector("input").placeholder =
          "Rechercher un " +
          e.currentTarget.querySelector("input").dataset.searchType;
        input.classList.add("big");
      }
    });
  });
};
