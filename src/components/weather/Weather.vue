<template>
  <div class="weather-wrapper">
    <div class="weather-container" >
      <img :src="weatherBackground" alt="" class="dynamic-background">

      <div class="weather-header">
        <h1>Weather App</h1>
      </div>

      <div class="main-weather" >

        <div class="location">
          <div class="location-info">
            <p>{{weather.data.city}}</p>
            <p>{{weather.data.country}}</p>
            <p>{{weather.data.baseStation}}</p>
          </div>
          <label class="location-search">
            <input @input="SearchCity" v-model="search">
          </label>
          <ul >
            <li class="location-selector"
                v-for="city in foundCities"
                @click="selectCity(city)">
              {{city.name}} {{city.country}}
            </li>
          </ul>
        </div>
        <div class="weather-type-title">
          <p>{{weather.data.weather}}</p>
        </div>
        <div class="weather-info">
          <p>{{weather.data.temperature}}</p>
          <p>{{weather.data.feels_like}}</p>
          <p>{{weather.data.pressure}}</p>
          <p>{{weather.data.humidity}}</p>
        </div>

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
  lon: '',
  name: '',
  country: ''
})
let path = ref('')
let currentCityWeather = reactive({
  main: {},
  weather: {},
  wind: {},
  base: {}
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
        baseStation: currentCityWeather.base,
        city: currentCityCoordinates.name,
        country: currentCityCoordinates.country,
        weather: currentCityWeather.weather.main,
        weather_icon: currentCityWeather.weather.icon
      }
    },
    set() {
    },
  })
})


watch( currentCityCoordinates, async () => {
  let responseData = await
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCityCoordinates.lat}&lon=${currentCityCoordinates.lon}&appid=${key}`)
  currentCityWeather.main = responseData.data.main;
  currentCityWeather.weather = responseData.data.weather[0];
  currentCityWeather.wind = responseData.data.wind
  currentCityWeather.base = responseData.data.name
})

function selectCity(city) {
  currentCityCoordinates.lat = city.lat
  currentCityCoordinates.lon = city.lon
  currentCityCoordinates.name = city.name
  currentCityCoordinates.country = city.state
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

let weatherBackground = computed(() => {
  switch (weather.data.weather) {
    case 'Mist': return "src/assets/weather/mist.gif";
    case 'Clear': return "src/assets/weather/clear.gif";
    case 'Clouds': return "src/assets/weather/clouds.gif";
    case 'Rain': return "src/assets/weather/rain.gif";
    case 'Snow': return "src/assets/weather/snow.gif";
  }
})

onMounted(() => {
  selectCity({lat: '59.9387', lon: '30.3162', name: 'Saint-Petersburg', state: 'Russia'})
})

</script>

<style scoped lang="scss">

.weather-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px;
  min-height: 810px;
}
.weather-container {
  height: 100%;
  width: 1280px;
  display: flex;
  flex-direction: column;
  background-size: 100%;
  position: relative;
  z-index: 5;
}
.weather-type-title {
  color: white;
  height: 40px;
  width: 150px;
  text-align: center;
  backdrop-filter: blur(10px);
}
.dynamic-background {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
}
.weather-header {
  display: flex;
  justify-content: space-between;
  color: white;
  z-index: 5;
}

.main-weather {
  font-size: 27px;
  background-size: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 40px 10px;
  z-index: 5;
}
.weather-info, .location-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  height: 250px;
  width: 250px;
  backdrop-filter: blur(10px);
  color: white;
}
.weather-header {
  padding-left: 10px;
}
</style>