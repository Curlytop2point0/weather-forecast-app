document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeatherData(city);
        fetchForecastData(city);
    }
});

function fetchWeatherData(city) {
    const apiKey = '453420130e655d6a338afe73c55ae2f6'; // Add my API Key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the API response
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchForecastData(city) {
    const apiKey = '453420130e655d6a338afe73c55ae2f6'; // Add my API Key here
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayForecastData(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    if (data && data.main && data.weather) {
        weatherDataDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°F</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } else {
        weatherDataDiv.innerHTML = `<p>Error: Unable to fetch weather data. Please try again.</p>`;
    }
}

function displayForecastData(data) {
    const forecastDataDiv = document.getElementById('weatherData');
    if (data && data.list) {
        let forecastHTML = '<h3>5-Day Forecast</h3>';
        data.list.forEach((forecast, index) => {
            if (index % 8 === 0) { // Display one forecast per day (every 8th item)
                forecastHTML += `
                    <div>
                        <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
                        <p>Temperature: ${forecast.main.temp}°F</p>
                        <p>Weather: ${forecast.weather[0].description}</p>
                    </div>
                `;
            }
        });
        forecastDataDiv.innerHTML += forecastHTML;
    } else {
        forecastDataDiv.innerHTML += `<p>Error: Unable to fetch forecast data. Please try again.</p>`;
    }
}
