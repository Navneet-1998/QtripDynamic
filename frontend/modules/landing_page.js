import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log(cities);
  //Updates the DOM with the cities

  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const result = await fetch(config.backendEndpoint+"/cities");
    const data = await result.json();
    console.log(data);
    return data;
  } 
  catch (error) {
    return null;
 }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let docu = document.createElement("div");
  docu.className = "col-sm-6 col-lg-3";
  docu.innerHTML = `
                  <a href="pages/adventures/?city=${id}" id=${id}>
                    <div class="tile">
                    <img src="${image}" />
                      <div class="tile-text text-center">
                        <h5>${city}</h5>
                        <p>${description}</p>
                      </div>
                      </div>
                      </a>
                    `;
  
  document.getElementById("data").append(docu);
}

export { init, fetchCities, addCityToDOM };
 
