const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

async function getApiKey() {
  try {
    const response = await fetch("http://localhost:3000/api/key");
    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error("Error fetching the API Key:", error);
    return null;
  }
}

search.addEventListener("click", async () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  const API_KEY = await getApiKey();

  if (!API_KEY) {
    console.error("Error");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "assets/clear.png";
          break;

        case "Rain":
          image.src = "assets/rain.png";
          break;

        case "Snow":
          image.src = "assets/snow.png";
          break;

        case "Clouds":
          image.src = "assets/cloud.png";
          break;

        case "Haze":
          image.src = "assets/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}m/s`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
