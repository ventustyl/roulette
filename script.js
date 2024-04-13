let maintenance = document.querySelector(".maintenance");
let listing = document.querySelector(".listing");
let users, tache, heure;

window.onload = async function () {
  console.log(localStorage);
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    let newTodo = document.createElement("li");
    newTodo.classList.add("todo");
    newTodo.textContent = ` | `;
    newTodo.innerHTML = ` 
    <h3>${value.split(",")[0]} </h3>
    <p class="user">${value.split(",")[1]}  | ${value.split(",")[2]} </p>
    <hr>
    `;
    listing.appendChild(newTodo);
  }
  await check();
};

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
  const uniqueId = Date.now().toString();
  localStorage.setItem(uniqueId, `${users}, ${tache}, ${heure}`);
  listing.appendChild(newTodo);
  await check();
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

async function check() {
  let h3 = document.querySelectorAll("h3");
  for (let j = 0; j < h3.length; j++) {
    h3[j].addEventListener("click", function () {
      if (h3[j].classList.contains("strike")) {
        h3[j].classList.remove("strike");
        cle = localStorage.key(j);
        localStorage.removeItem(cle);
        console.log(localStorage.key(j));
        h3[j].parentNode.remove();
      } else {
        h3[j].classList.add("strike");
      }
    });
  }
  console.log(h3);
}
