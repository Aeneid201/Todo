"use strict";

// caching DOM
let addBtn = document.querySelector("#add");
let entry = document.querySelector("#item");
let itemsList = document.querySelector(".items");

// todo array
let todos = [];

// populating local storage
function populateStorage() {
  localStorage.setItem("list", JSON.stringify(todos));
}

let storedItems = JSON.parse(localStorage.getItem("list"));

// if localStorage is not empty, push the items to the todos array
if (storedItems) {
  todos.push(...storedItems);
}

// display todo list items
function render() {
  todos.forEach((element, i) => {
    let html = `<div class="item" data-item="${i}">
    <p class="item__title">${element}</p>
    <input class="item__input d-none" autocomplete="off" value="${element}">
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
    populateStorage();
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
  let currentItem = e.target.closest(".item");
  let item__index = currentItem.getAttribute("data-item");
  let clickedBtn = e.target.closest("button");
  let item__title = currentItem.querySelector(".item__title");
  let item__value = currentItem.querySelector(".item__input");

  // if button was clicked, check which one
  if (clickedBtn) {
    if (clickedBtn.classList.contains("edit")) {
      // edit item
      item__title.classList.add("d-none");
      item__value.classList.remove("d-none");

      item__value.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();

          // TODO: check if modified title already exists in the todos array

          // replace item in array
          todos.splice(item__index, 1, item__value.value);
          populateStorage();
          item__title.classList.remove("d-none");
          item__value.classList.add("d-none");

          // clear and render
          clearAll();
          render();
        }
      });
    }
    // delete item
    else if (clickedBtn.classList.contains("delete")) {
      todos.splice(item__index, 1);
      populateStorage();
      clearAll();
      render();
    }
  }
});

// clear all items
function clearAll() {
  itemsList.innerHTML = "";
}

// clear entry input
function clearField() {
  entry.value = "";
}
