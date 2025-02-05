document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '902a51adbd0b31156fe27f1d048d492b'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging line
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
    } else {
        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherInfo.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}">
        `;
    }
}