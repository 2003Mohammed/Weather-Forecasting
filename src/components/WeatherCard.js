// src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ data }) => {
    return (
        <div>
            <h2>{data.name}, {data.sys.country}</h2>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
            <p>{data.weather[0].description}</p>
        </div>
    );
};

export default WeatherCard;
