const icons = import.meta.webpackContext("./icons", {
  recursive: false,   // don't look in subfolders
  regExp: /\.svg$/,   // only files ending in .svg (skips the README)
});

export function fillScreen(weatherData, unit) {
    //Clear what's currently on the screen before writing new
    clearScreen();

    // Set the unit labels on the page
    const unitLabels = document.querySelectorAll(".unit-label");
    const windUnit = document.getElementById("wind-unit");

    windUnit.textContent = unit === "metric" ? "km/h" : "mph";
    
    for (const label of unitLabels){
      label.textContent = unit === "metric" ? "°C" : "°F";
    }
    
    // Current weather summary
    const locationName = document.getElementById("location-name");
    const currentIcon = document.getElementById("current-icon");
    const currentDate = document.getElementById("current-date");
    const currentTemp = document.getElementById("current-temp");
    const currentCondition = document.getElementById("current-conditions");
    const feelsLike = document.getElementById("feels-like");
    const description = document.getElementById("description");
    
    document.body.dataset.theme = weatherData.current.icon;
    locationName.textContent = weatherData.location;
    
    const key = `./${weatherData.current.icon}.svg`;

    if (icons.keys().includes(key)){
        currentIcon.setAttribute("src", icons(key));
    };

    const curDate = new Date(weatherData.today.date);
    const curOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: "UTC",      
    };

    currentDate.textContent = curDate.toLocaleDateString("en-US", curOptions);

    currentTemp.textContent = Math.round(weatherData.current.temp);
    currentCondition.textContent = weatherData.current.conditions;
    feelsLike.textContent = Math.round(weatherData.current.feelsLike);
    description.textContent = weatherData.today.description;

    // Current weather details
    const tempMax = document.getElementById("temp-max");
    const tempMin = document.getElementById("temp-min");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const precipProb = document.getElementById("precip-prob");
    const sunrise = document.getElementById("sunrise"); //6:52 AM
    const sunset = document.getElementById("sunset"); //4:32 PM

    tempMax.textContent = Math.round(weatherData.today.tempMax);
    tempMin.textContent = Math.round(weatherData.today.tempMin);
    humidity.textContent = Math.round(weatherData.current.humidity);
    windSpeed.textContent = Math.round(weatherData.current.windSpeed);
    precipProb.textContent = Math.round(weatherData.today.precipProb);
    
    const sunOptions = {
        hour: "numeric",
        minute: "2-digit",
        timeZone: weatherData.timezone,
    }

    const sunriseDate = new Date(weatherData.current.sunriseEpoch * 1000);
    sunrise.textContent = sunriseDate.toLocaleTimeString("en-US", sunOptions);
    
    const sunsetDate = new Date(weatherData.current.sunsetEpoch * 1000);
    sunset.textContent = sunsetDate.toLocaleTimeString("en-US", sunOptions);

    const forecastList = document.getElementById("forecast-list");

    for (const day of weatherData.forecast){
        const li = document.createElement("li");
        li.classList.add("forecast-day");

        const pDay = document.createElement("p");
        pDay.classList.add("forecast-name");

        const forecastDate = new Date(day.date);
        const forecastOptions = {
            weekday: "short", 
            timeZone: "UTC",
        };

        pDay.textContent = forecastDate.toLocaleDateString("en-US", forecastOptions);

        const img = document.createElement("img");
        img.classList.add("forecast-icon");
        img.alt = day.conditions;

        const imgKey = `./${day.icon}.svg`;

        if (icons.keys().includes(imgKey)){
            img.setAttribute("src", icons(imgKey));
        };

        const p = document.createElement("p");
        p.classList.add("forecast-temps");

        const spanHi = document.createElement("span");
        spanHi.classList.add("hi");
        spanHi.textContent = `${Math.round(day.tempMax)}° `;

        const spanLo = document.createElement("span");
        spanLo.classList.add("lo");
        spanLo.textContent = `${Math.round(day.tempMin)}°`;

        p.append(spanHi, spanLo);

        li.append(pDay, img, p);

        forecastList.append(li);
    }
}

function clearScreen() {

    const currWeatherDetails = document.querySelectorAll(".js-value");

    for (let detail of currWeatherDetails){
        if (detail instanceof HTMLBodyElement) {
            detail.dataset.theme = '';
        } else if (detail.id === "current-icon"){
            detail.removeAttribute("src");
        } else {
            detail.textContent = '';
        }
    }

    //Forecast days list
    const forecastList = document.getElementById("forecast-list");
    forecastList.textContent = '';
}