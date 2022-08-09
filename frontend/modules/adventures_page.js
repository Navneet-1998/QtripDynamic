
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
let search_params = new URLSearchParams(search);
let id = search_params.get("city");  
  
  return id;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
try {
    const result = await fetch(config.backendEndpoint + "/adventures?city="+city);
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
 }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let ele = document.createElement("div");
    ele.className ="col-6 col-lg-3 mb-4";
    ele.innerHTML = `
                    <a href="detail/?adventure=${key.id}" id=${key.id}>
                     <div class="activity-card">
                      <div class="category-banner">${key.category}</div>

                         <img
                           class="img-responsive"
                           src=${key.image}
                           />

                          <div class="activity-card-text text-sm-center w-100 p-2 mt-3 ">
                           <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                            <h5 class="text-left">${key.name}</h5>
                             <p>₹${key.costPerHead}</p>
                             </div>
                           <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                         <h5 class="text-left w-25">Duration</h5>
                       <p>${key.duration} Hours</p>
                     </div>
                    </div>
                  </div>
                </a>
              `;
    document.getElementById("data").appendChild(ele);               
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((key) => {
    return (key.duration > low && key.duration <= high)
  });
  return filteredList;
}


function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredList=[];
  console.log(list);
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
      });

      return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredlist =[]
  let arr=filters["duration"].split("-")

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
if(filters["category"].length>0&&filters["duration"].length>0){

 filteredlist=filterByCategory(list,filters.category)
 filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
}else if(filters["category"].length>0){
  filteredlist=filterByCategory(list,filters.category);
}else if(filters["duration"].length>0){
 filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
}else{
  return list;
}
  // Place holder for functionality to work in the Stubs
 return filteredlist;
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an objec
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"));
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;

  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                        <div>${key}</div>
                        `;
   
    document.getElementById("category-list").appendChild(ele);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
