class OpenWeatherMapClient {
  constructor() {
    this._apiVersion = '2.5'
    this._baseUrl = `https://api.openweathermap.org/data/${this._apiVersion}`
    this._apiKey = '__put_your_open_weather_map_api_key__'
  }

  async weatherAt(cityName) {
    let reqestUrl = `${this._baseUrl}/weather?q=${cityName}&appid=${this._apiKey}`
    let request =
      await fetch(reqestUrl).then((response) => { return response.json() })

    return request
  }
}

class WeatherIndexPage {
  static mappingWeatherToElements() {
    let openWeatherMapClient = new OpenWeatherMapClient()

    // 特定の属性値を持つ要素が存在しているのを期待
    // <div class="weather" data-city-name="Tokyo"/>
    Array.from(
      document.querySelectorAll('.weather')
    ).map(elm => {
      openWeatherMapClient.weatherAt(elm.dataset.cityName)
        .then((json) => {
          elm.innerHTML = this.buildHTML(json)
        })
    })
  }

  static buildHTML(json) {
    return (
      `
      <h2>${json['name']}</h2>
      <img src="http://openweathermap.org/img/w/${json['weather'][0]['icon']}.png" alt="" />
      <div class="weather-main">${json['weather'][0]['main']}</div>
      <div class="weather-temp">${Math.round( json['main']['temp'] )} F</div>
      `
    )
  }
}

document.addEventListener("turbolinks:load", () => {
  WeatherIndexPage.mappingWeatherToElements()
});
