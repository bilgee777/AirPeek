import apiKey from "./config.js";

window.getWeather = function () {
  const city = document.getElementById("cityInput").value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=tr&units=metric`;

  if (city === "") return;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        document.getElementById("weatherResult").classList.remove("hidden");
        document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("temperature").textContent = `${data.main.temp}°C`;
        document.getElementById("humidity").textContent = `Nem: %${data.main.humidity}`;
        document.getElementById("wind").textContent = `Rüzgar: ${data.wind.speed} m/s`;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      } else {
        document.getElementById("weatherResult").classList.add("hidden");
        alert("Şehir bulunamadı!");
      }
    })
    .catch(() => {
      alert("Bir hata oluştu.");
    });
};
