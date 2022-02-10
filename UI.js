//instatntiate restcountries api
const regionNamesInEnglish = new Intl.DisplayNames(["en"], { type: "region" });

class UI {
  constructor() {
    this.searchGroup = document.getElementById("search-group");
    this.searchResults = document.getElementById("search-results");
    this.searchResultLists = document.getElementById("search-result-lists");
    this.searchText = document.getElementById("search-text");
    this.city = document.querySelector(".city");
    this.state = document.querySelector(".region");
    this.country = document.querySelector(".country");
    this.temp = document.querySelector(".temp");
    this.tempLike = document.querySelector(".temp-like");
    this.icon = document.getElementById("wicon");
    this.desc = document.querySelector(".description");
    this.maxTemp = document.querySelector(".max-temp");
    this.minTemp = document.querySelector(".min-temp");
    this.windSpeed = document.querySelector(".wind-speed");
    this.windDir = document.querySelector(".wind-dir");
    this.pressure = document.querySelector(".pressure");
    this.humidity = document.querySelector(".humidity");
    this.body = document.body;
    this.author = document.getElementById("author");
  }

  //[1] show results tab=======================================================
  showSearchResultLists(lists, title) {
    let output = "";

    lists.forEach((list, index) => {
      if (list.state === undefined) {
        output += `
          <div id="search-result-item" num="${index}">
            <div>
              <span class="city-item">${list.name}</span>,
              <span class="country-item">${regionNamesInEnglish.of(
                list.country
              )}</span>
              <br>
              <span class="lat-item">Lat: ${list.lat}</span>,
              <span class="lon-item">Lon: ${list.lon}</span>
            </div>
          </div>
        `;
      } else {
        output += `
          <div id="search-result-item" num="${index}">
            <div>
              <span class="city-item">${list.name}</span>,
              <span class="state-item">${list.state}</span>,
              <span class="country-item">${regionNamesInEnglish.of(
                list.country
              )}</span>
              <br>
              <span class="lat-item">Lat: ${list.lat}</span>,
              <span class="lon-item">Lon: ${list.lon}</span>
            </div>
          </div>
        `;
      }
    });

    this.showSearchCard(output, title);
  }

  //[2] show no results==========================================================
  showNoResults(title) {
    let output = `
    <div id="search-result-item">
      <p>no results on ${title}</p>
    </div>
    `;

    this.showSearchCard(output, title);
  }

  //[3] show search result card================================================
  showSearchCard(output, title) {
    this.searchText.innerHTML = title;
    this.searchResultLists.innerHTML = output;
    this.searchGroup.style.display = "grid";
    setTimeout(() => {
      this.searchResults.style.transform = "translateY(0%)";
      this.searchResults.style.opacity = "1";
    }, 50);
  }

  //[4] hide search card==========================================================
  hideSearchCard() {
    searchInput.value = "";
    searchResults.style.transform = "translateY(20%)";
    searchResults.style.opacity = "0";
    setTimeout(() => {
      searchGroup.style.display = "none";
    }, 300);
  }

  //[5] update all info at main card============================================
  updateWeatherDataUI(geo, weather) {
    this.city.textContent = `Weather in ${geo.name}`;
    this.state.textContent = geo.state;
    this.country.textContent = regionNamesInEnglish.of(geo.country);
    this.temp.textContent = `${Math.floor(weather.main.temp)}°C`;
    this.tempLike.textContent = `feels like ${Math.floor(
      weather.main.feels_like
    )}°C`;
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    );
    this.desc.textContent = weather.weather[0].description;
    this.maxTemp.textContent = `Max-Temperature: ${Math.floor(
      weather.main.temp_max
    )}°C`;
    this.minTemp.textContent = `Min-Temperature: ${Math.floor(
      weather.main.temp_min
    )}°C`;
    this.windSpeed.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
    this.windDir.textContent = `Wind Direction: ${weather.wind.deg}°`;
    this.pressure.textContent = `Pressure: ${weather.main.pressure} hPa`;
    this.humidity.textContent = `Humidity: ${weather.main.humidity}%`;
  }

  //[6] update BG image according to the searched location====================
  updateBgIMG(imgURL, author, authorURL) {
    this.body.style.background = `url(${imgURL}) no-repeat center center/cover`;
    this.author.textContent = author;
    this.author.setAttribute("href", `${authorURL}`);
  }
}
