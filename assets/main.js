const app = document.getElementById("root");
const button = document.getElementsByClassName("btn");
const nav = document.createElement("div");
nav.setAttribute("class", "container api-selectors");

const container = document.createElement("div");
container.setAttribute("class", "container-fluid cards");

const row = document.createElement("div");
row.setAttribute("class", "row justify-content-center");
row.setAttribute("id", "data");

const logo = document.createElement("img");
logo.src = "assets/starwars.png";
logo.setAttribute("class", "img-fluid");

const apiUrl = `https://swapi.co/api/`;

const peopleBtn = document.createElement("button");
peopleBtn.setAttribute("class", "btn btn-warning");
peopleBtn.setAttribute("onclick", "doSomething(value)");
peopleBtn.innerText = "People";
peopleBtn.value = "people";

const planetsBtn = document.createElement("button");
planetsBtn.setAttribute("class", "btn btn-warning");
planetsBtn.setAttribute("onclick", "doSomething(value)");
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

function getInfo() {
  axios.get(apiUrl + btnValue).then(response => {
    this.data = response.data;
    this.data.results.forEach(item => {
      if (item.name) {
        const card = document.createElement("div");
        row.appendChild(card);
        card.setAttribute("class", "card col-lg-3");

        card.innerHTML = `<h1>${item.name}</h1><p>Height: ${item.height}</p><br><p>Hair color: ${item.hair_color}</p><br><p>Birth Year: ${item.birth_year}</p><br>`

        
        
      } else {
        const card = document.createElement("div");
        card.setAttribute("class", "card col-lg-3");

        const h1 = document.createElement("h1");
        h1.textContent = item.title;

        row.appendChild(card);
        card.appendChild(h1);
    
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
