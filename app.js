let btn = document.querySelector("button");

let inp = document.querySelector("input");

let ul = document.querySelector("ul");

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
  }
});


/* Using event delegatio->: when we click on a child element, the parent element will be triggered, 
   since the event listener is added to the parent element.
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
});






// using this event listener we are unable to delete the newly added tasks

// let delBtns = document.querySelectorAll(".delete");

// for (const delBtn of delBtns) {
//   delBtn.addEventListener("click", function () {
//     let par = this.parentElement;
//     console.log(par);
//     par.remove();
//   });
// }
