//challenge1
let now = new Date();

let dayData = document.querySelector(" #current-day");

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let calendar = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = week[now.getDay()];
let month = calendar[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

dayData.innerHTML = ` ${day} ${month} ${date}, ${hours}:${min}`;

//challenge 3
//convert temprature
/*let cel = 21;
function getCelsiusTemp(event) {
  event.preventDefault();
  let celsius = document.querySelector("#currentTemp");
  celsius.innerHTML = `${cel}`;
}

function getFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#currentTemp");
  let fah = Math.round((cel * 9) / 5 + 32);
  fahrenheit.innerHTML = `${fah}`;
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", getCelsiusTemp);

let faherenheitTemp = document.querySelector("#fahrenheit");
faherenheitTemp.addEventListener("click", getFahrenheitTemp);
*/

//week5 updated code api and function

function showWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#temp-feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#temp-humidity").innerHTML =
    response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#precipitaion").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "daf948a252007cfa5458b46795b7f223";
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data";
  let apiUrl = `${apiEndPoint}/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city-name").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

searchCity("Paris");

// current location
function showCurrentTemperature(position) {
  let apiKey = "daf948a252007cfa5458b46795b7f223";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
