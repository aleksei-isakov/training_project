<template>
  <div class="weather-wrapper">
    <div class="weather-container">
      <h1>Weather App</h1>
      <div class="weather-info">
        <div class="weather-item location-selector">
          <label>
            <input @input="SearchCity" v-model="search">
          </label>
          <ul>
            <li v-for="city in foundCities" @click="selectCity(city)">{{city.name}} {{city
                .country}}</li>
          </ul>
        </div>
        <div class="weather-item main-weather">
          <p>{{weather.data.temperature}}</p>
          <p>{{weather.data.feels_like}}</p>
          <p>{{weather.data.pressure}}</p>
          <p>{{weather.data.humidity}}</p>
        </div>
        <div class="weather-item temperature">2</div>
        <div class="weather-item humidity">5</div>
        <div class="weather-item wind">5</div>
        <div class="weather-item clouds">5</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, reactive, watch, computed, onMounted } from 'vue'

const key = '08e6a6a1566274461f6738badb1537fc'
let search = ref('')
let foundCities = reactive([])

let currentCityCoordinates = reactive({
  lat: '',
  lon: ''
})

let currentCityWeather = reactive({
  main: {},
  weather: {},
  wind: {}
})

let weather = reactive( {
  data: computed( {
    get() {
      return {
        temperature: `Temperature: ${(currentCityWeather.main.temp - 273.15).toFixed(1)} °C`,
        feels_like: `Feels like ${(currentCityWeather.main.feels_like - 273.15).toFixed(1)} °C`,
        humidity: `Humidity: ${currentCityWeather.main.humidity} %`,
        pressure: `Pressure: ${currentCityWeather.main.pressure} hPa`,
        wind: `Wind speed ${currentCityWeather.wind.speed} m/s`,
        weather: currentCityWeather.weather.main,
        weather_icon: currentCityWeather.weather.icon
      }
    },
    set() {
    }
  })
})


watch( currentCityCoordinates, async () => {
  let responseData = await
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCityCoordinates.lat}&lon=${currentCityCoordinates.lon}&appid=${key}`)
  currentCityWeather.main = responseData.data.main;
  currentCityWeather.weather = responseData.data.weather[0];
  currentCityWeather.wind = responseData.data.wind
})

function selectCity(city) {
  currentCityCoordinates.lat = city.lat
  currentCityCoordinates.lon = city.lon
  foundCities = []
}

async function SearchCity() {
  if (search.value) {
    let searchResults =
    await axios.get
    (`http://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=5&appid=${key}`)
    foundCities = searchResults.data
  }

}
onMounted(() => {
  selectCity({lat: '59.9387', lon: '30.3162'})
})
</script>

<style scoped lang="scss">
.weather-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px;
  background-color: yellow;
  min-height: 810px;
}
.weather-container {
  height: 100%;
  width: 1280px;
  display: flex;
  flex-direction: column;
  background-color: crimson;
  justify-content: space-between;
}
.weather-info {
  display: flex;
}
.weather-item {
  flex-basis: 100%;
  height: 200px;

  background-color: aquamarine;
}
</style>