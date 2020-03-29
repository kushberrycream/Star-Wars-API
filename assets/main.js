const app = document.getElementById("root");
const logo = document.createElement("img");
logo.src = "assets/starwars.png";
logo.setAttribute("class", "img single-featured-image-header ");
logo.setAttribute("alt", "StarWars Logo");

const container = document.createElement("div");
container.setAttribute("class", "container-fluid cards");

const row = document.createElement("div");
row.setAttribute("class", "row justify-content-center");
row.setAttribute("id", "data");

const refresh = document.createElement("div");
refresh.setAttribute("class", "refresh-btn");
refresh.setAttribute("onclick", "window.location.reload()");
refresh.innerHTML = `<i class="fas fa-redo"></i>`;

const apiUrl = `https://swapi.co/api/`;

const peopleBtn = document.createElement("div");
peopleBtn.setAttribute("class", "cardnav character col-lg-3");
peopleBtn.setAttribute("onclick", "doSomething(value) ");
peopleBtn.innerHTML = `<p class="btn-title">Characters</p>`;
peopleBtn.value = "people";

const planetsBtn = document.createElement("div");
planetsBtn.setAttribute("class", "cardnav planets col-lg-3");
planetsBtn.setAttribute("onclick", "doSomething(value) ");
planetsBtn.innerHTML = `<p class="btn-title">Planets</p>`;
planetsBtn.value = "planets";

const speciesBtn = document.createElement("div");
speciesBtn.setAttribute("class", "cardnav species col-lg-3");
speciesBtn.setAttribute("onclick", "doSomething(value)");
speciesBtn.innerHTML = `<p class="btn-title">Species</p>`;
speciesBtn.value = "species";

const vehiclesBtn = document.createElement("div");
vehiclesBtn.setAttribute("class", "cardnav vehicles col-lg-3");
vehiclesBtn.setAttribute("onclick", "doSomething(value)");
vehiclesBtn.innerHTML = `<p class="btn-title">vehicles</p>`;
vehiclesBtn.value = "vehicles";

const starshipsBtn = document.createElement("div");
starshipsBtn.setAttribute("class", "cardnav starships col-lg-3");
starshipsBtn.setAttribute("onclick", "doSomething(value)");
starshipsBtn.innerHTML = `<p class="btn-title">Starships</p>`;
starshipsBtn.value = "starships";

const filmsBtn = document.createElement("div");
filmsBtn.setAttribute("class", "cardnav films col-lg-3");
filmsBtn.setAttribute("onclick", "doSomething(value)");
filmsBtn.innerHTML = `<p class="btn-title">Films</p>`;
filmsBtn.value = "films";

app.appendChild(logo);
app.appendChild(container);
container.appendChild(row);
row.appendChild(peopleBtn);
row.appendChild(planetsBtn);
row.appendChild(speciesBtn);
row.appendChild(vehiclesBtn);
row.appendChild(starshipsBtn);
row.appendChild(filmsBtn);

let btnValue = {};

function getInfo() {
  axios.get(apiUrl + btnValue).then(response => {
    app.appendChild(refresh);
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
        let bby = item.birth_year.split("BBY").join(" BBY");
        card.innerHTML = `<h1>${item.name}</h1><h6>Height:</h6><p> ${item.height} cm</p><h6>Hair color:</h6><p>${item.hair_color}</p><h6>Birth Year:</h6><p>${bby}</p>`;
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
