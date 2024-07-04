import React, { useEffect, useState } from "react";
import "./weather.css";
import { CiLocationOn } from "react-icons/ci";
// import { IoIosPartlySunny } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { IoRainy } from "react-icons/io5";
// import { CiCloud } from "react-icons/ci";

const Wheather = ({ weather, error, loading }) => {
  const currentDate = new Date();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  // console.log(weather);

  if (loading) {
    return (
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <p className="error-message">{error || "Weather data not found."}</p>
    );
  }

  return (
    <div className="widget">
      <div className="header">
        <div className="location">
          <CiLocationOn />
          <p>
            {weather.name} , {weather.sys.country}
          </p>
        </div>
        <div className="time">
          <p>{`${dayOfWeek}`}</p>
        </div>
      </div>
      <div className="temperature">
        <h1>{weather.main.temp.toFixed(0)}°C</h1>
        <div className="icon">
          <span className="">
            {weather.weather[0].description === "clear sky" ? (
              <IoIosSunny size={50} />
            ) : (
              <IoRainy size={50} />
            )}
          </span>
        </div>
        <div className="details">
          <p style={{ padding: "3px 0px" }}>
            Pressure: {weather.main.pressure}Pa{" "}
          </p>
          <p style={{ padding: "3px 0px" }}>
            Humidity: {weather.main.humidity}%
          </p>
          <p style={{ padding: "3px 0px" }}>wind: {weather.wind.speed}km/h</p>
        </div>
      </div>
      <div className="rain-chance">
        <h1 style={{ textTransform: "capitalize" }}>
          {weather.weather[0].description}
        </h1>
      </div>
    </div>
  );
};

export default Wheather;
