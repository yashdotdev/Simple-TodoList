let input = document.querySelector("input");

let addTask = document.querySelector(".add");

let ul = document.querySelector("ul");

const emptyMessage = document.createElement("h3");
emptyMessage.innerText = "Todo list is empty!";
emptyMessage.classList.add("empty-message");

addTask.addEventListener("click", function () {
  console.log(input.value);

  if (input.value == "") {
    alert("Input field can't be empty!");
  } else {
    let item = document.createElement("li");

    item.innerText = input.value;
    ul.appendChild(item);
    input.value = "";

    let delBtn = document.createElement("button");

    delBtn.innerText = "Delete";
    delBtn.classList.add("delete");
    item.appendChild(delBtn);

    // If there's already an empty message, remove it after adding a new item
    if (ul.querySelector("h3")) {
      ul.querySelector("h3").remove();
    }
  }
});

// working of event listener for delete buttons
ul.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    console.log("deleted");
  }

  //if the todo will be empty only then it will display the empty message
  if (ul.children.length == 0) {
    ul.appendChild(emptyMessage);
  }
});
