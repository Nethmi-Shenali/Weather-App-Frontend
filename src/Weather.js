import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    const getWeather = async () => {
        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8001/weather?city=${city}`);
            setWeatherData(response.data);
            setError("");  // Clear any previous errors
        } catch (err) {
            setError("Failed to fetch weather data. Please try again later.");
            setWeatherData(null);
        }
    };

    // Styling for the weather app
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#87CEEB',  // Cloudy Blue Sky
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cloudy-sky.png")', // Moving cloud texture
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        animation: 'moveClouds 30s linear infinite'
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        boxSizing: 'border-box',
        animation: 'fadeIn 1s ease-out'
    };

    const headingStyle = {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
        fontWeight: '600'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: '100%'
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3'
    };

    const errorStyle = {
        color: 'red',
        fontWeight: 'bold',
        marginTop: '10px'
    };

    const weatherInfoStyle = {
        marginTop: '20px',
        color: '#333',
        fontSize: '18px',
        textAlign: 'left'
    };

    // Keyframes for fadeIn animation
    const fadeInKeyframes = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;

    // Keyframes for moving clouds in the background
    const moveCloudsKeyframes = `
        @keyframes moveClouds {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 100% 0;
            }
        }
    `;

    return (
        <div style={containerStyle}>
            <style>{fadeInKeyframes}</style>
            <style>{moveCloudsKeyframes}</style>
            <div style={cardStyle}>
                <h1 style={headingStyle}>Weather Checker</h1>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={getWeather}
                >
                    Get Weather
                </button>

                {error && <p style={errorStyle}>{error}</p>}

                {weatherData && !error && (
                    <div style={weatherInfoStyle}>
                        <p><strong>City:</strong> {weatherData.city}</p>
                        <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
                        <p><strong>Description:</strong> {weatherData.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
