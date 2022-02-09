class Weather {
  constructor() {
    this.APIkey = "1db0fab9d6e33adf9d572bc308517808";
  }

  //fetching location detail information
  async getGeo(location) {
    const resGeo = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${this.APIkey}`
    );

    const dataGeo = await resGeo.json();

    return {
      geo: dataGeo,
    };
  }

  async getGeoReverse(lat, lon) {
    const resGeo = await fetch(`
      http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.APIkey}
    `);

    const dataGeo = await resGeo.json();

    return {
      geo: dataGeo,
    };
  }

  //fetching weather location at specific latitude and longitude
  async getWeather(lat, lon) {
    const resWeather = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.APIkey}`
    );

    const dataWeather = await resWeather.json();

    return {
      weather: dataWeather,
    };
  }
}
