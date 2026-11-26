// Turns Visual Crossing's raw response into only what the page needs.
// Values are left unformatted (no rounding, raw dates/epochs) so display
// code decides how to show them.
export function processWeatherData(raw) {
  const current = raw.currentConditions;
  const today = raw.days[0];

  return {
    location: raw.resolvedAddress,
    timezone: raw.timezone,

    current: {
      temp: current.temp,
      feelsLike: current.feelslike,
      conditions: current.conditions,
      icon: current.icon,
      humidity: current.humidity,
      windSpeed: current.windspeed,
      sunriseEpoch: current.sunriseEpoch,
      sunsetEpoch: current.sunsetEpoch,
    },

    today: {
      date: today.datetime,
      tempMax: today.tempmax,
      tempMin: today.tempmin,
      precipProb: today.precipprob,
      description: today.description,
    },

    // Next 7 days, not including today
    forecast: raw.days.slice(1, 8).map((day) => ({
      date: day.datetime,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
      icon: day.icon,
      conditions: day.conditions,
    })),
  };
}

export function createUrl(searchLocation, unit) {
    return "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
    + encodeURIComponent(searchLocation) + "?"
    + `unitGroup=${unit}`
    + "&include=days,current"
    + "&elements=add:sunriseEpoch,add:sunsetEpoch,add:description"
    + "&iconSet=icons2"
    //"&key=YOUR_API_KEY"
    + "&contentType=json"
}