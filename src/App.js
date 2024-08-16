import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const apiKey = '2881fad7c1e90ae7e91019c5fdc3f0ae'; // Your API key here

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log(forecastResponse.data); // Corrected the console log
      setForecastData(forecastResponse.data.list.slice(0, 2));
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData();
    } else {
      console.error('Please provide a valid city name.');
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}

      {forecastData.length > 0 && (
        <div className="forecast">
          <h3>2-Day Forecast</h3>
          <div className="forecast-container">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {day.main.temp}°C</p>
                <p>Humidity: {day.main.humidity}%</p>
                <p>Wind: {day.wind.speed} m/s</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
