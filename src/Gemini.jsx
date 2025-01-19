import React, { useState, useEffect } from 'react';
import './Gemini.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

export function Gemini({ city, weatherCondition, humidity, windSpeed, forecastData, language }) {
  const apiKey = 'CHANGE-TO-YOUR-API-KEY'; // Your API Key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true); 

  async function run(prompt) {
    try {
      setLoading(true);
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text();
      setResponseData(response);
      setLoading(false);
    } catch (err) {
      console.error('Error during the AI response:', err);
      setError("");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (city && weatherCondition && forecastData) {
      const prompt =
        language === 'en'
          ? `The weather in ${city} is currently ${weatherCondition}. The humidity is ${humidity}% and the wind speed is ${windSpeed} km/h. Here is the forecast for the next days: ${forecastData.list.slice(0, 3).map((forecast) => {
              const tempInCelsius = Math.round(forecast.main.temp - 273.15); 
              return `${new Date(forecast.dt * 1000).toLocaleDateString()} - ${forecast.weather[0].main}: ${tempInCelsius}°C`; 
            }).join(', ')}. Based on the current weather and forecast, suggest some activities that people in ${city} might enjoy. Please consider local culture, environment, and the current season. Use English.`
          : `Cuaca di ${city} saat ini ${weatherCondition}. Kelembaban udara adalah ${humidity}% dan kecepatan angin ${windSpeed} km/jam. Berikut adalah ramalan cuaca untuk beberapa hari ke depan: ${forecastData.list.slice(0, 3).map((forecast) => {
              const tempInCelsius = Math.round(forecast.main.temp - 273.15); 
              return `${new Date(forecast.dt * 1000).toLocaleDateString()} - ${forecast.weather[0].main}: ${tempInCelsius}°C`; 
            }).join(', ')}. Berdasarkan cuaca saat ini dan ramalan cuaca, berikut adalah beberapa aktivitas yang bisa dinikmati oleh orang-orang di ${city}. Pertimbangkan budaya lokal, lingkungan, dan musim saat ini. Gunakan Bahasa Indonesia.`;
  
      run(prompt);
    }
  }, [city, weatherCondition, forecastData, humidity, windSpeed, language]);

  const convertMarkdownToHtml = (markdown) => {
    let html = markdown.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^([*+-])\s(.+)$/gm, '<ul><li>$2</li></ul>');
    html = html.replace(/^\d+\.\s(.+)$/gm, '<ol><li>$1</li></ol>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    html = html.replace(/\*(.+?)\*/g, '<i>$1</i>');
    html = html.replace(/^\-+$/gm, '<hr />');
    html = html.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    return html;
  };

  return (
    <>
      <button className="gemini-hamburger" onClick={() => setIsVisible(!isVisible)}>
        ✦
      </button>

      <div className={`gemini-container ${isVisible ? '' : 'hidden'}`}>
        <h2>Rekomendasi Aktivitas</h2>
        <div className="language-toggle">
          <label>
            <input
              type="radio"
              name="language"
              value="id"
              checked={language === 'id'}
              onChange={() => setLanguage('id')}
            />
            Bahasa Indonesia
          </label>
          <label>
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === 'en'}
              onChange={() => setLanguage('en')}
            />
            English
          </label>
        </div>

        {loading && <p>Loading AI Recommendation</p>}
        {error && <p>{error}</p>}
        {responseData && (
          <div
            dangerouslySetInnerHTML={{
              __html: convertMarkdownToHtml(responseData),
            }}
          />
        )}
        {!loading && !responseData && !error && <p>Masukkan Lokasi</p>}
      </div>
    </>
  );
}

export default Gemini;
