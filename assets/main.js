const app = document.getElementById("root");
const button = document.getElementsByClassName("btn");
const nav = document.createElement("div");
nav.setAttribute("class", "container api-selectors appear");

const container = document.createElement("div");
container.setAttribute("class", "container-fluid cards");

const row = document.createElement("div");
row.setAttribute("class", "row justify-content-center");
row.setAttribute("id", "data");

const logo = document.createElement("img");
logo.src = "assets/starwars.png";
logo.setAttribute("class", "img-fluid single-featured-image-header");
logo.setAttribute("alt", "StarWars Logo");

const apiUrl = `https://swapi.co/api/`;

const peopleBtn = document.createElement("button");
peopleBtn.setAttribute("class", "btn btn-warning");
peopleBtn.setAttribute("onclick", "doSomething(value) ");
peopleBtn.innerText = "People";
peopleBtn.value = "people";

const planetsBtn = document.createElement("button");
planetsBtn.setAttribute("class", "btn btn-warning");
planetsBtn.setAttribute("onclick", "doSomething(value) ");
planetsBtn.innerText = "Planets";
planetsBtn.value = "planets";

const speciesBtn = document.createElement("button");
speciesBtn.setAttribute("class", "btn btn-warning");
speciesBtn.setAttribute("onclick", "doSomething(value)");
speciesBtn.innerText = "Species";
speciesBtn.value = "species";

const vehiclesBtn = document.createElement("button");
vehiclesBtn.setAttribute("class", "btn btn-warning");
vehiclesBtn.setAttribute("onclick", "doSomething(value)");
vehiclesBtn.innerText = "Vehicles";
vehiclesBtn.value = "vehicles";

const starshipsBtn = document.createElement("button");
starshipsBtn.setAttribute("class", "btn btn-warning");
starshipsBtn.setAttribute("onclick", "doSomething(value)");
starshipsBtn.innerText = "Starships";
starshipsBtn.value = "starships";

const filmsBtn = document.createElement("button");
filmsBtn.setAttribute("class", "btn btn-warning");
filmsBtn.setAttribute("onclick", "doSomething(value)");
filmsBtn.innerText = "Films";
filmsBtn.value = "films";

app.appendChild(logo);
app.appendChild(nav);
nav.appendChild(peopleBtn);
nav.appendChild(planetsBtn);
nav.appendChild(speciesBtn);
nav.appendChild(vehiclesBtn);
nav.appendChild(starshipsBtn);
nav.appendChild(filmsBtn);
app.appendChild(container);
container.appendChild(row);

let btnValue = {};
let nextPage = {};
let prevPage = {};

function getInfo() {
  axios.get(apiUrl + btnValue).then(response => {
    this.data = response.data;
    let pagination = "";
    if (data.next || data.previous) {
      pagination = generatePaginationButtons(data.next, data.previous);
      row.innerHTML = `${pagination}`;
    }
    data.results.forEach(item => {
      let card = document.createElement("div");
      row.appendChild(card);
      card.setAttribute("class", "card col-lg-3");

      if (item.height) {
        card.innerHTML = `<h1>${item.name}</h1><h6>Height:</h6><p> ${item.height} cm</p><h6>Hair color:</h6><p>${item.hair_color}</p><h6>Birth Year:</h6><p>${item.birth_year}</p>`;
      } else if (item.terrain) {
        card.innerHTML = `<h1>${item.name}</h1><h6>Terrain:</h6><p> ${item.terrain}</p><h6>Gravity:</h6><p>${item.gravity}</p><h6>Climate:</h6><p>${item.climate}</p>`;
      } else if (item.classification) {
        card.innerHTML = `<h1>${item.name}</h1><h6>Classification:</h6><p> ${item.classification}</p><h6>Designation:</h6><p>${item.designation}</p><h6>Language:</h6><p>${item.language}</p>`;
      } else if (item.vehicle_class) {
        card.innerHTML = `<h1>${item.name}</h1><h6>Manufacturer:</h6><p>${item.manufacturer}</p><h6>Model:</h6><p>${item.model}</p><h6>Vehicle class:</h6><p>${item.vehicle_class}</p>`;
      } else if (item.starship_class) {
        card.innerHTML = `<h1>${item.name}</h1><h6>Manufacturer:</h6><p> ${item.manufacturer}</p><h6>Model:</h6><p>${item.model}</p><h6>Starship class:</h6><p>${item.starship_class}</p>`;
      } else if (item.title) {
        card.innerHTML = `<h1>${item.title}</h1><p>${item.opening_crawl}</p>`;
      }
    });
  });
}

function doSomething(value) {
  btnValue = value;

  clearData();
  getInfo();
}
function getImageDirectoryByFullURL(nextUrl) {
  nextUrl = nextUrl.split("/");
  nextUrl = nextUrl.pop();
}
function clearData() {
  let clear = document.getElementById("data");
  clear.innerHTML = "";
}

function generatePaginationButtons(next, prev) {
  if (next && !prev) {
    next = next.slice(21, 38);
    return `<div id="next" class="rotate-right"><button onclick="doSomething(value)" value="${next}"><i class="fas fa-jedi hvr-pulse-grow"></i></button></div>`;
  } else if (next && prev) {
    next = next.slice(21, 38);
    prev = prev.slice(21, 38);
    return `<div id="prev" class="rotate-left"><button onclick="doSomething(value)" value="${prev}"><i class="fas fa-jedi hvr-pulse-grow"></i></button></div>
               <div id="next" class="rotate-right"><button onclick="doSomething(value)" value="${next}"><i class="fas fa-jedi hvr-pulse-grow"></i></button></div>`;
  } else if (!next && prev) {
    prev = prev.slice(21, 38);
    return `<div id="next" class="hide"></div><div id="prev" class="rotate-left"><button onclick="doSomething(value)" value="${prev}"><i class="fas fa-jedi hvr-pulse-grow"></i></button></div>`;
  }
}
