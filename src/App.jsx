import React, { useState } from "react";
import "./index.css";

export default function App() {
  const api = {
    key: "9b2cbf282ecff73342af64f2258cc486",
    url: "https://api.openweathermap.org/data/2.5/weather",
  };

  let [search, setSearch] = useState("");
  let [data, setData] = useState({});
  let [errorMsg, setErrorMsg] = useState("");
  let [bgClass, setBgClass] = useState("");  // Store background class

  function searching() {
    setErrorMsg("Loading...");
    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Data not found");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setErrorMsg("");
        setSearch("");
        updateBackground(result.main.temp, result.weather[0].main);  // Update background based on temp and weather
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setData({});
      });
  }

  let updateBackground = (temperature, weatherCondition) => {
    let bgClass = "";

    if (temperature <= 10) {
      bgClass = "cold";
    } else if (temperature >= 25) {
      bgClass = "hot";
    } else if (weatherCondition === "Clear") {
      bgClass = "sunny";
    } else if (weatherCondition === "Clouds") {
      bgClass = "cloudy";
    } else if (weatherCondition === "Rain") {
      bgClass = "rainy";
    } else {
      bgClass = "warm";
    }

    setBgClass(bgClass);  // Set the background class
  };

  let usingKey = (e) => {
    if (e.key === "Enter") {
      searching();
    }
  };

  return (
    <div className={`app-container ${bgClass}`}>
      <div className="div1">
        <h1>WEATHER</h1>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setErrorMsg("");
          }}
          onKeyPress={usingKey}
          type="text"
          value={search}
        />
        <button onClick={searching}>Search</button>
        <button onClick={() => { setData({}); setErrorMsg(""); setSearch(""); }}>Clear</button>
      </div>

      <div className="div1">
        {data.main ? (
          <>
            <h1>{data.name}</h1>
            <p>Temperature: <b>{data.main.temp} &deg;C</b></p>
            <p>Condition: <b>{data.weather[0].main}</b></p>
          </>
        ) : (
          <h3>{errorMsg}</h3>
        )}
      </div>
    </div>
  );
}
