// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Forecast from './Forecast';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async (location) => {
        const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData(location);
    };

    return (
        <div>
            <h1>Weather Forecast</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Enter location" 
                />
                <button type="submit">Get Weather</button>
            </form>
            {weatherData && (
                <div>
                    <WeatherCard data={weatherData} />
                    <Forecast location={location} />
                </div>
            )}
        </div>
    );
};

export default Weather;
