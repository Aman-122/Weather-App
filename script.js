document.getElementById('getWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value.trim();
    if (location) {
        if (isNaN(location)) {
            getWeatherByCity(location);
        } else {
            getWeatherByPincode(location);
        }
    }
});

function getWeatherByCity(city) {
    const apiKey = 'a7fba2aa431fc5ca96505caf042e2ae2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => console.error('Error:', error));
}

function getWeatherByPincode(pincode) {
    const apiKey = 'a7fba2aa431fc5ca96505caf042e2ae2';
    const countryCode = 'IN'; // Modify as needed
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},${countryCode}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('Location not found!');
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherResult');
    weatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
