//INSTANTITATE CLASSES ====================================================
//instantiate unsplash api
const unsplash = new Unsplash();

//Instantiate openWeather api
const weather = new Weather();

//instantiate UI class
const ui = new UI();

//instatntiate code to name country api
// const regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "region" });

//GLOBAL CONST ELEMENT =============================================

//get element for searching city or region
const searchInput = document.getElementById("search-input"),
  searchBtn = document.getElementById("search-btn"),
  searchResultUl = document.getElementById("search-result-lists"),
  searchGroup = document.getElementById("search-group"),
  searchResults = document.getElementById("search-results"),
  paragrafManyLists = document.getElementById("many-lists");

// ALL EVENTLISTENER ================================================
//locate current position using navigator geolocation
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

navigator.geolocation.getCurrentPosition(locateSelf, error, options);

//Key event at input for begin to search
searchInput.addEventListener("keydown", doSearchInput);

//click event option at search button for begin to search
searchBtn.addEventListener("click", doSearch);

//when the searched items shows up,
//clicking searchGroup will close this card
searchGroup.addEventListener("click", ui.hideSearchCard);

//event for selecting one of the search results
searchResultUl.addEventListener("click", doLocate);

//ALL THE FUNCTIONS =================================================
//[1] searching location using key event will only begin
//after pressing "enter" key
//then running doSearch() function
function doSearchInput(e) {
  if (e.key === "Enter") {
    doSearch();
  }
}

//[2] running searching function
//take input value ->
//put input value to weather.getGeo() ->
//if there's response then ui.showSearchResults
//if no response then ui.showNoResults
async function doSearch() {
  //get elements
  const searchInputText = searchInput.value;

  // get the lists of location search results
  const weatherGeo = await weather.getGeo(searchInputText);

  if (weatherGeo.geo.length !== 0) {
    //display none to paragraf for .many-items
    paragrafManyLists.style.display = "block";
    //using response and input text to ui method showSearchResultLists
    ui.showSearchResultLists(weatherGeo.geo, searchInputText);
  } else {
    //display none to paragraf for .many-items
    paragrafManyLists.style.display = "none";
    //show no results
    ui.showNoResults(searchInputText);
  }
}

//[3] function that runs after clicking one of the searched location
//
async function doLocate(e) {
  if (e.target.parentElement.id === "search-result-item") {
    //get elements
    const searchInputText = searchInput.value,
      getAttrVal = e.target.parentElement.getAttribute("num");

    // get the lists of location search results
    const weatherGeo = await weather.getGeo(searchInputText);

    const weatherLatLon = await weather.getWeather(
      weatherGeo.geo[getAttrVal].lat,
      weatherGeo.geo[getAttrVal].lon
    );
    //===================
    //try to search an image of searched location
    //==================
    try {
      const getBgIMG = await unsplash.getRandomIMG(
        weatherGeo.geo[getAttrVal].name
      );

      const imgURL =
        getBgIMG.IMG.results[Math.floor(Math.random() * 10)].urls.regular;
      const author =
        getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.name;
      const authorURL =
        getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.links.html;

      ui.updateBgIMG(imgURL, author, authorURL);

      ui.updateWeatherDataUI(weatherGeo.geo[getAttrVal], weatherLatLon.weather);

      ui.hideSearchCard();

      //===================
      //if no image found at the searched location. then it will be returned
      //to search by its state
      //==================
    } catch (e) {
      const getBgIMG = await unsplash.getRandomIMG(
        weatherGeo.geo[getAttrVal].state
      );

      const imgURL =
        getBgIMG.IMG.results[Math.floor(Math.random() * 10)].urls.regular;
      const author =
        getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.name;
      const authorURL =
        getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.links.html;

      ui.updateBgIMG(imgURL, author, authorURL);

      ui.updateWeatherDataUI(weatherGeo.geo[getAttrVal], weatherLatLon.weather);

      ui.hideSearchCard();
    }
  }
}

//[4] locate self
async function locateSelf(pos) {
  var crd = pos.coords;

  const weatherLatLon = await weather.getWeather(crd.latitude, crd.longitude);

  // get the lists of location search results
  const weatherGeoRev = await weather.getGeoReverse(
    crd.latitude,
    crd.longitude
  );

  try {
    const getBgIMG = await unsplash.getRandomIMG(weatherGeoRev.geo[0].name);

    const imgURL =
      getBgIMG.IMG.results[Math.floor(Math.random() * 10)].urls.regular;
    const author =
      getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.name;
    const authorURL =
      getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.links.html;

    ui.updateBgIMG(imgURL, author, authorURL);

    ui.updateWeatherDataUI(weatherGeoRev.geo[0], weatherLatLon.weather);

    //===================
    //if no image found at the searched location. then it will be returned
    //to search by its state
    //==================
  } catch (e) {
    const getBgIMG = await unsplash.getRandomIMG(weatherGeoRev.geo[0].state);

    const imgURL =
      getBgIMG.IMG.results[Math.floor(Math.random() * 10)].urls.regular;
    const author =
      getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.name;
    const authorURL =
      getBgIMG.IMG.results[Math.floor(Math.random() * 10)].user.links.html;

    ui.updateBgIMG(imgURL, author, authorURL);

    ui.updateWeatherDataUI(weatherGeoRev.geo[0], weatherLatLon.weather);
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
