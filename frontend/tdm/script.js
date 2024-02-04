function showMoreOrHideFormSelects() {
  var hiddenFormSelects = document.getElementById("hiddenFormSelects");
  var showMoreBtn = document.getElementById("showMoreBtn");

  if (hiddenFormSelects.style.display === "flex") {
    hiddenFormSelects.style.display = "none";
    showMoreBtn.textContent = "Show More";
    resetFormSelectValues();
  } else {
    hiddenFormSelects.style.display = "flex";
    showMoreBtn.textContent = "Reset";
  }
}

function resetFormSelectValues() {
  var formSelects = document.querySelectorAll(".form-select");
  formSelects.forEach(function (select) {
    select.value = select.options[0].value;
  });
}

function submitForm() {
  console.log("Form submitted!");
}
