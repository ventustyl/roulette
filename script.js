// Assurez-vous d'avoir importé ShortUniqueId soit via un <script> tag ou un module
let maintenance = document.querySelector(".maintenance");
let listing = document.querySelector(".listing");
let btnTotal = document.querySelector(".btnTotal");
let score = document.querySelector(".score");
let users = "",
  tache = "",
  heure = "",
  montant = "";

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (e) {
    console.error("Fetch error: " + e.message);
    return null;
  }
}

async function addRandomTask() {
  let dataTache = await fetchData("./taches.json");
  let dataUser = await fetchData("./user.json");

  if (dataTache && dataUser) {
    let randTache = Math.floor(Math.random() * dataTache.taches.length);
    let randUser = Math.floor(Math.random() * dataUser.user.length);
    tache = dataTache.taches[randTache];
    users = dataUser.user[randUser];
    heure = Math.floor(Math.random() * 24 + 1) + "h";
    montant = parseInt(heure) * 82.67 + "€";
    check();
  }
}

function createTodoElement(key, value) {
  let newTodo = document.createElement("li");
  newTodo.classList.add("todo");
  newTodo.dataset.key = key; // Use data-key to relate DOM elements with localStorage keys
  let values = value.split(",");
  console.log(values);
  newTodo.innerHTML = `<h3>${values[0]}</h3><p class="user">${values[1]} | ${values[2]} | montant: <b class="final">${values[3]}</b></p><hr>`;
  listing.appendChild(newTodo);
}

function loadTodos() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    createTodoElement(key, value);
  }
}

function addTodoToLocalStorage(users, tache, heure, montant) {
  const uid = new ShortUniqueId({ length: 10 });
  const uniqueId = uid.rnd();
  console.log(uniqueId);
  localStorage.setItem(uniqueId, `${users},${tache},${heure},${montant}`);
  createTodoElement(uniqueId, `${users},${tache},${heure},${montant}`);
}

function check() {
  document.querySelectorAll("li").forEach((li) => {
    li.removeEventListener("click", handleTodoClick); // Remove existing event listeners to avoid duplicates
    li.addEventListener("click", handleTodoClick);
  });
}

function handleTodoClick(event) {
  let li = event.currentTarget;
  let key = li.dataset.key;
  let h3 = li.querySelector("h3");

  if (!h3.classList.contains("strike")) {
    h3.classList.add("strike");
  } else {
    h3.classList.remove("strike");
    localStorage.removeItem(key);
    li.remove();
  }
}

window.onload = function () {
  loadTodos();
  check();
};

if (maintenance) {
  maintenance.addEventListener("click", function () {
    maintenance.classList.toggle("active");
  });
}

let btn = document.querySelector(".btn");
if (btn) {
  btn.addEventListener("click", async function () {
    await addRandomTask();
    addTodoToLocalStorage(users, tache, heure, montant);
    check();
  });
}

btnTotal.addEventListener("click", () => {
  let m = 0,
    n = 0;

  let montantFinal = document.querySelectorAll(".final");
  console.log(montantFinal);
  for (let i = 0; i < montantFinal.length; i++) {
    m = parseFloat(montantFinal[i].innerText).toFixed(2);
    n = parseFloat(n) + parseFloat(m);
    console.log(n);
  }
  score.innerHTML = n + "€";
});
