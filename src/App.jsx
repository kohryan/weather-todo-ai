import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gemini from './Gemini';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

import sunny from './assets/sunny.png';
import snowy from './assets/snowy.png';
import rain from './assets/rain.png';
import cloud from './assets/cloud.png';

import clearbg from './assets/clearbg.jpg';
import cloudybg from './assets/cloudybg.jpg';
import hazebg from './assets/hazebg.jpg';
import mistbg from './assets/mistbg.jpg';
import snowbg from './assets/snowbg.jpg';
import rainybg from './assets/rainybg.jpg';

import loading from './assets/loading.gif';

function App() {
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [wError, setWError] = useState('');
  const [location, setLocation] = useState('Surabaya');
  const [background, setBackground] = useState(clearbg);
  const [loadingData, setLoadingData] = useState(false);
  const [showAbout, setShowAbout] = useState(false); 

  const api_key = 'CHANGE-TO-YOUR-API-KEY'; // Your API Key

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    setLoadingData(true);
    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;
    try {
      const res = await axios.get(cityUrl);
      const cityData = res.data;
      setData(cityData);

      const { lat, lon } = cityData.coord;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
      const forecastRes = await axios.get(forecastUrl);
      setForecastData(forecastRes.data); 

      setBackground(getBackgroundImage(cityData.weather[0].main));
      setLocation('');
      setWError('');
      setLoadingData(false);
    } catch (error) {
      console.log(error.message);
      setWError('Location not found. Please enter a valid city name.');
      setData({});
      setForecastData({});
      setLoadingData(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return sunny;
      case 'Snow':
        return snowy;
      case 'Rain':
        return rain;
      case 'Clouds':
        return cloud;
      case 'Haze':
        return cloud;
      case 'Mist':
        return cloud;
      case 'Smoke':
        return cloud;
      default:
        return sunny;
    }
  };

  const getBackgroundImage = (main) => {
    switch (main) {
      case 'Clear':
        return clearbg;
      case 'Snow':
        return snowbg;
      case 'Rain':
        return rainybg;
      case 'Clouds':
        return cloudybg;
      case 'Haze':
        return cloudybg;
      case 'Mist':
        return mistbg;
      case 'Drizzle':
        return hazebg;
      default:
        return clearbg;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };


  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${background})` }}>
        <div className="hamburger" onClick={toggleAbout}>
          ☰
        </div>
        <div className="main-heading">WeatherToDo</div>

        {showAbout && (
          <div className="about-panel">
          <h2>About WeatherToDo</h2>
          <p>This application provides real-time weather information for any city. You can check the current weather, humidity, wind speed, and forecast for the upcoming days.</p>
          <p>Built with React, it fetches data from OpenWeatherMap API to give you up-to-date weather details and forecast.</p>
          <p>It also recommends activities based on the weather data, powered by AI from the Gemini API.</p>
          <p>
            Author: <a href="https://www.linkedin.com/in/ryanwjanuardi/" target="_blank" rel="noopener noreferrer">KohRyanStudio</a> 
          </p>
          <p>
            Source: <a href="https://github.com/kohryan/weather-todo-ai" target="_blank" rel="noopener noreferrer">Github</a> 
          </p>
          <p>
            Image Credits: <a href="https://www.unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a> 
          </p>
        </div>
        )}

        <div className="weather-main">
          <div className="search">
            <div className="search-top">
              <i className='fa-solid fa-location-dot'></i>
              <h3>{!wError && data.name && `${data.name}, ${data.sys.country}`}</h3> {/* Tampilkan Kota dan Kode Negara */}
            </div>
            <div className="search-input">
              <input
                type='text'
                placeholder='Enter city name'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <i className='fa-solid fa-search' onClick={search}></i>
            </div>
          </div>

          {loadingData ? (
            <div className="loading">
              <img src={loading} alt="loading" className='loading' />
            </div>
          ) : (
            <>
              {wError && <div className="error">{wError}</div>}
              {!wError && data.main && (
                <>
                  <div className="weather">
                    <img src={getWeatherIcon(data.weather[0].main)} alt={data.weather[0].main} />
                    <div className="weather-type">{data.weather[0].main}</div>
                    <div className="temp">{Math.round(data.main.temp - 273.15)}º</div>
                  </div>
                  <div className="weather-date">
                    <p>{new Date().toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}</p>
                  </div>
                  <div className="weather-data">
                    <div className="humidity">
                      <div className="data-name">Humidity</div>
                      <i className="fa-solid fa-droplet"></i>
                      <div className="data">{data.main.humidity}%</div>
                    </div>
                    <div className="wind">
                      <div className="data-name">Wind</div>
                      <i className="fa-solid fa-wind"></i>
                      <div className="data">{data.wind.speed} km/h</div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {data.name && forecastData.list && forecastData.list.length > 0 && (
          <Gemini
            city={data.name}
            weatherCondition={data.weather[0].main}
            humidity={data.main.humidity}
            windSpeed={data.wind.speed}
            forecastData={forecastData}
            language="id" 
          />
        )}
        <Analytics />
      </div>
    </>
  );
}

export default App;
