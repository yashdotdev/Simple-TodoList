let btn = document.querySelector("button");

let inp = document.querySelector("input");

let ul = document.querySelector("ul");

const emptyMessage = document.createElement("h3");
emptyMessage.innerText = "Todo list is empty!";
emptyMessage.style.textAlign = "center"; // Optional styling


btn.addEventListener("click", function () {
  if (inp.value == "") {
    alert("Input field can't be empty!");
  } else {
    let item = document.createElement("li");

    item.innerText = inp.value;   

    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";
    delBtn.classList.add("delete");

    item.appendChild(delBtn); 
    ul.appendChild(item);
    inp.value = "";

    // If there's already an empty message, remove it after adding a new item
    if (ul.querySelector("h3")) {
      ul.querySelector("h3").remove();
    }
  }
});


/* 
Event delegation allows an event listener to be added to a parent element, so when a
child element is clicked, the parent’s event handler is triggered. To prevent the event
from triggering when clicking anywhere else in the parent, we use event.target.
This ensures that the event only triggers if the specific child element inside the parent is clicked.
*/


ul.addEventListener("click", function (event) {
  // console.log(event.target);
  // console.dir(event.target);
  // console.log(event.target.nodeName);

  if (event.target.nodeName == "BUTTON") {
    let listItem = event.target.parentElement;
    listItem.remove();
    console.log("deleted");
  }

  //if the todo will be empty then it will display it 
  if(ul.children.length == 0) {
    
    ul.appendChild(emptyMessage);
    emptyMessage.style.textAlign = "center";
  }
});
