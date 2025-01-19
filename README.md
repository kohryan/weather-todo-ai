# WeatherToDo

WeatherToDo is a weather forecasting application that not only provides real-time weather information but also recommends activities based on the current and upcoming weather conditions using Generative AI. Whether it's sunny, rainy, or cloudy, WeatherToDo helps you plan your day with personalized recommendations. The app fetches weather data from the OpenWeatherMap API and uses the Gemini API to suggest activities, making it an all-in-one weather and activity planner.

## Features
- **Real-time Weather Updates**: Get up-to-date information about the weather, including temperature, humidity, wind speed
- **Weather Forecast**: Check the weather forecast for the next few days.
- **AI-based Activity Recommendations**: Based on the current weather, get personalized activity recommendations powered by the Gemini API.
- **City Search**: Search for weather information by city name.
- **Weather Icons and Backgrounds**: View weather-specific icons and backgrounds that match the current weather conditions.
- **Responsive Design**: Works smoothly across different devices, including mobile phones and desktops.

## Tech Stack
WeatherToDo is built using the following technologies:
- **ReactJS**: For building the user interface.
- **ViteJS**: A fast development environment for building the app.
- **OpenWeatherMap API**: For fetching real-time weather data and forecasts.
- **Gemini API**: To recommend activities based on the current weather conditions.

## Installation

To run WeatherToDo locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kohryan/weather-todo-ai.git

2. Install dependencies:
   ```bash
   cd weather-todo-ai
   npm install

3. Start the development server:
   ```bash
   npm run dev

# How It Works
**Weather Data Fetching**: WeatherToDo uses the OpenWeatherMap API to fetch current weather and forecast data based on the city provided by the user.
**Activity Recommendations**: Based on the current weather, the app makes use of the Gemini API to recommend activities that are suitable for the weather conditions.
**UI Rendering**: WeatherToDo dynamically updates the user interface with weather icons, backgrounds, and relevant activity suggestions, providing a smooth and engaging user experience.

# Contributing
We welcome contributions! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to your forked repository (`git push origin feature-name`).
5. Create a new pull request.

# License
WeatherToDo is open-source software licensed under the MIT License.