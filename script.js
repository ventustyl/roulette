let maintenance = document.querySelector(".maintenance");
let listing = document.querySelector(".listing");
let users, tache, heure, check;

maintenance.addEventListener("click", function () {
  maintenance.classList.toggle("active");
});

let btn = document.querySelector(".btn");

btn.addEventListener("click", async function () {
  let newTodo = document.createElement("li");
  await test();
  newTodo.classList.add("todo");
  newTodo.textContent = ` | `;
  newTodo.innerHTML = ` 
  <h3>${users} </h3>
  <p class="user">${tache}  | ${heure} </p>
  <hr>
  `;
  listing.appendChild(newTodo);
});

const test = async function addtache() {
  let response = await fetch("./taches.json");
  let dataTache = await response.json();
  let rand = Math.floor(Math.random() * dataTache.taches.length);
  tache = dataTache.taches[rand];

  let response2 = await fetch("./user.json");
  let dataUser = await response2.json();
  let rand2 = Math.floor(Math.random() * dataUser.user.length);
  users = dataUser.user[rand2];

  heure = Math.floor(Math.random() * 24 + 1) + "h";
};
