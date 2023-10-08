let input = document.getElementById("input");
let addBtn = document.getElementById("add");
let list = document.getElementById("list");
let clear = document.getElementById("clear");

let getLocalStorage = () => {
  return localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
};
function addUser(user) {
  let newUser = {
    userName: user,
    userId: Math.floor(Math.random() * 10000),
  };
  let item = getLocalStorage();
  item.push(newUser);
  localStorage.setItem("users", JSON.stringify(item));
}

addBtn.addEventListener("click", () => {
  addUser(input.value);
  input.value = "";
  location.reload(true);
  input.autofocus = true;
});

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload(true);
});

window.addEventListener("DOMContentLoaded", () => {
  if (getLocalStorage().length > 0) {
    clear.style.display = "block";
  }
  let allToDos = getLocalStorage()
    .map((item) => {
      return `
        <li data-id="${item.userId}">
        ${item.userName}
        <button class="delBtn">Del</button> 
        <button class="editBtn">Edit</button> 
         </li>
    `;
    })
    .join("");
  list.innerHTML = allToDos;
  const remover = document.querySelectorAll(".delBtn");
  const editer = document.querySelectorAll(".editBtn");

  for (let i = 0; i < remover.length; i++) {
    remover[i].addEventListener("click", (e) => {
      let element = e.target.parentElement;
      let elementId = element.getAttribute("data-id");
      deleteItem(elementId);
    });
  }
  for (let i = 0; i < editer.length; i++) {
    editer[i].addEventListener("click", (e) => {
      input.value = users[i].userName;
    });
  }

  let users = getLocalStorage();
  function deleteItem(id) {
    console.log(id);
    let newItems = users.filter((item) => item.userId != id);
    localStorage.setItem("users", JSON.stringify(newItems));
    location.reload(true);
  }
  function editItem(id) {
    // input.value = id;
  }
});
