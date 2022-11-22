"use strict";

// caching DOM
let addBtn = document.querySelector("#add");
let entry = document.querySelector("#item");
let itemsList = document.querySelector(".items");
let closeModalBtn = document.querySelector(".close-modal");
let customModal = document.querySelector(".custom-modal");

// todo list object
let todos = ["Buy groceries", "Wash dog"];

// display todo list items
function render() {
  todos.forEach((element, i) => {
    let html = `<div class="item" data-item="${i}">
    <p class="title">${element}</p>
    <div class="btns">
      <button class="edit"><i class="fa fa-pen"></i></button>
      <button class="delete"><i class="fa fa-trash"></i></button>
    </div>
  </div>`;
    itemsList.insertAdjacentHTML("afterbegin", html);
  });
}

render();

// add item
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (entry.value) {
    todos.push(entry.value);
  } else {
    alert("Cannot be empty!");
  }

  // clear and render
  clearAll();
  clearField();
  render();
});

// edit item
itemsList.addEventListener("click", function (e) {
  let editTarget = e.target.closest(".item");
  let index = editTarget.getAttribute("data-item");
  let clickedBtn = e.target.closest("button");

  // if edit button was clicked
  if (clickedBtn) {
    if (clickedBtn.classList.contains("edit")) {
        

      // delete item
    } else if (clickedBtn.classList.contains("delete")) {
      todos.splice(index, 1);
      clearAll();
      render();
    }
  }
});

// clear queue
function clearAll() {
  itemsList.innerHTML = "";
}

// clear input
function clearField() {
  entry.value = "";
}

// close the modal
closeModalBtn.addEventListener("click", function (e) {
  customModal.classList.add("hide");
});
