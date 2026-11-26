import "./styles.css";
import * as display from "./display.js";
import * as process from "./process.js";

async function getData(location, unit) {
  //Show loading icon
  const loadingIcon = document.getElementById("loading");
  loadingIcon.hidden = false;

  //Hide error message in case it exists
  const errorMsg = document.getElementById("error");
  errorMsg.hidden = true;

  const url = process.createUrl(location, unit);
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Fetch failed with error code ${response.status}`)
    }
 
    const rawWeatherData = await response.json();
    const processedWeatherData = process.processWeatherData(rawWeatherData);

    display.fillScreen(processedWeatherData, unit);  
    lastSuccessfulSearch = location;
        
  } catch (error) {
    errorMsg.hidden = false;
    console.log(error);
  } finally {
    // hide loading after processing
    loadingIcon.hidden = true; 
  }
}

let unit = "us"
let lastSuccessfulSearch = '';

const searchInput = document.getElementById("search-input");

//Default the page to a location
searchInput.value = "Pittsburgh, PA";
getData(searchInput.value.trim(), unit);

// Add a listener to unit buttons
const unitButtons = document.querySelectorAll(".unit-btn");
for (const button of unitButtons){
    button.addEventListener("click", function(event){
      if (unit === event.currentTarget.dataset.unit) {
        return;
      } 

      unit = event.currentTarget.dataset.unit;
      for (const button2 of unitButtons){
        if (button2.dataset.unit === unit) {
            button2.ariaPressed = true;
        } else {
            button2.ariaPressed = false;
        }
      }
      if (lastSuccessfulSearch !== ''){
        getData(lastSuccessfulSearch, unit);
      }
    })
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchInput.value.trim() !== ''){
    getData(searchInput.value.trim(), unit);
  }
});