<template>
  <div class="weather-wrapper">
    <div class="weather-container">
      <h1>Weather App</h1>
      <div class="weather-info">
        <div class="weather-item location-selector">
          <label>
            <input @input="getCity()" v-model="search">
          </label>
          <ul>
            <li v-for="city in foundCities" @click="selectCity(city)">{{city.name}} {{city
                .country}}</li>
          </ul>
        </div>
        <div class="weather-item main-weather">5</div>
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
import { ref, onMounted, reactive } from 'vue'

let search = ref('')
let foundCities = reactive([])
let currentCity = reactive([])

function selectCity(city) {
  currentCity = city
  foundCities = []
}

async function getCity() {
  let key = '08e6a6a1566274461f6738badb1537fc'
  if (search.value) {
    let searchResults =
    await axios.get
    (`http://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=5&appid=${key}`)
    foundCities = searchResults.data
  }
  else
    foundCities = []
  // let lat = city.data[0].lat
  // let lon = city.data[0].lon
  // let response = await
  //     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
}
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