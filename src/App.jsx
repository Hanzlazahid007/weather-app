import React, { useState, useEffect } from "react";
import Search from "./components/search/Search";
import Wheather from "./components/wheatherDisplay/Wheather";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      );
      const data = await response.json();
      console.log(data);
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setError("");
        setWeather(data);
      }
    } catch (error) {
      setError("Error fetching data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getLocationWeather = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
                import.meta.env.VITE_API_KEY
              }&units=metric`
            );
            const data = await response.json();
            if (data.cod !== 200) {
              setError(data.message);
              setWeather(null);
            } else {
              setError("");
              setWeather(data);
            }
          } catch (error) {
            setError("Error fetching data");
            setWeather(null);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Error getting location");
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchWeather(search);
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Weather App</h1>
      <Search
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        search={search}
      />
      <Wheather weather={weather} error={error} loading={loading} />
    </div>
  );
};

export default App;
