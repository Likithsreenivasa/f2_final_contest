const apiKey = '28a834df96616143719848513419f504';
const weatherCardsContainer = document.getElementById('weatherCards');
const cityInput = document.getElementById('cityInput');
const addCityBtn = document.getElementById('addCityBtn');
let citiesData = [];

addCityBtn.addEventListener('click', () => {
  const cityName = cityInput.value.trim();
  if (cityName === '') {
    alert('Please enter a city name.');
    return;
  }

  if (citiesData.some((city) => city.name.toLowerCase() === cityName.toLowerCase())) {
    alert('City already added.');
    return;
  }

  fetchWeatherData(cityName);
});

function fetchWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      citiesData.push(data);
      renderWeatherCards();
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again later.');
    });
}

function renderWeatherCards() {
  citiesData.sort((a, b) => a.main.temp - b.main.temp);
  weatherCardsContainer.innerHTML = '';

  citiesData.forEach((city) => {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    const weatherIconUrl = `https://openweathermap.org/img/w/${city.weather[0].icon}.png`;

    weatherCard.innerHTML = `
      <img src="${weatherIconUrl}" alt="Weather Icon">
      <h3>${city.name}</h3>
      <p>Temperature: ${city.main.temp}°C (High: ${city.main.temp_max}°C, Low: ${city.main.temp_min}°C)</p>
      <p>Weather: ${city.weather[0].main}</p>
      <p>Humidity: ${city.main.humidity}%</p>
      <p>Pressure: ${city.main.pressure} hPa</p>
      <p>Wind Speed: ${city.wind.speed} m/s</p>
    `;

    weatherCardsContainer.appendChild(weatherCard);
  });
}
