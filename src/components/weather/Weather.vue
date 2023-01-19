<template>
  <div class="weather-wrapper">
    <div class="weather-container">
      <h1>Weather App</h1>
      <div class="weather-info">
        <div class="weather-item location-selector">2</div>
        <div class="weather-item main-weather">5</div>
        <div class="weather-item temperature">2</div>
        <div class="weather-item humidity">5</div>
        <div class="weather-item wind">5</div>
        <div class="weather-item clouds">5</div>
      </div>
    </div>
    <form action="submit">
      <input type="text" v-model="search">
    </form>
    <button @click="getWeather">api call</button>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from 'vue'

let search = ref('')


async function getWeather() {
  let key = '08e6a6a1566274461f6738badb1537fc'
  let searchquery = search.value
  let city = await
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchquery}&limit=5&appid=08e6a6a1566274461f6738badb1537fc`)
  let lat = city.data[0].lat
  let lon = city.data[0].lon
  let response = await
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
  console.log(response.data)
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