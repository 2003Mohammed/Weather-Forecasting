// src/components/Forecast.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forecast = ({ location }) => {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchForecastData = async () => {
            const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

            try {
                const response = await axios.get(url);
                setForecastData(response.data.list.slice(0, 7));
            } catch (error) {
                console.error('Error fetching the forecast data:', error);
            }
        };

        fetchForecastData();
    }, [location]);

    return (
        <div>
            <h3>7-Day Forecast</h3>
            <div>
                {forecastData.map((day, index) => (
                    <div key={index}>
                        <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                        <p>Temp: {day.main.temp}°C</p>
                        <p>Humidity: {day.main.humidity}%</p>
                        <p>Wind: {day.wind.speed} m/s</p>
                        <p>{day.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
