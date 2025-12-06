// sunnySky = {}

// here for testing //
const LOCATION_KEY = 'your_actual_key_here';
const WEATHER_KEY = 'your_actual_key_here';

const state = {
  temp: 70,
  tempLabel: '70',
  city: 'Seattle',
  sky: 'Sunny',
  lat: 47.6038321,
  lon: -122.3300624
};

const convertKtoF = e => {
  return 1.8 * (e - 273.15) + 32;
};

const redTemp = 80;
const orangeTemp = 70;
const yellowTemp = 60;
const greenTemp = 50;

let realTimeButton;
let resetButton;
let tempSlider;
let skyDropDownMenu;
let tempLabel;
let cityInput;
let cityHeader;
let doll;
let parentElementDoll;
let gifFire;

// Initialize DOM elements
const loadElements = () => {
  realTimeButton = document.getElementById('realtime-temp');
  resetButton = document.getElementById('reset-button');
  tempSlider = document.getElementById('temp');
  skyDropDownMenu = document.getElementById('sky-drop-down-menu');
  tempLabel = document.getElementById('temp-label');
  cityInput = document.getElementById('city');
  cityHeader = document.getElementById('city-header');
  doll = document.getElementById('doll-image');
  parentElementDoll = document.getElementById('doll-holder');

  // Create and configure fire gif
  gifFire = document.createElement('img');
  gifFire.src = 'ada-project-docs/assets/landscape/fire.gif';
  gifFire.alt = 'A gif image of fire';
  gifFire.style.height = '400px';
  gifFire.style.width = '35.2rem';
  gifFire.style.position = 'absolute';
  gifFire.style.bottom = '300px';
  gifFire.style.zIndex = '0';
  doll.style.zIndex = '1';
};

// temp slider change and background and landscape change
const handleTempSlider = (event) => {
  state.temp = event.target.value;
  state.tempLabel = event.target.value;
  tempLabel.textContent = event.target.value;
  changeBackgroundColor();
  updateLandscape();
};

const changeBackgroundColor = () => {
  if (state.temp >= redTemp) {
    parentElementDoll.style.backgroundColor = '#cb4949ff';
  } else if (state.temp >= orangeTemp){
    parentElementDoll.style.backgroundColor = '#f6a612ff';
  } else if (state.temp >= yellowTemp){
    parentElementDoll.style.backgroundColor = '#d7b16aff';
  } else if (state.temp >= greenTemp){
    parentElementDoll.style.backgroundColor = '#81ce62ff';
  } else {
    parentElementDoll.style.backgroundColor = '#008080';
  }
}; 

const updateLandscape = () => {
  if (state.temp >= redTemp) {
    parentElementDoll.appendChild(gifFire);
    gifFire.style.display = 'block';
  } else {
    if (gifFire.parentNode === parentElementDoll) {
      parentElementDoll.removeChild(gifFire);
    }
    // parentElementDoll.removeChild(gifFire);
    // parentElementDoll.appendChild();
//     document.getElementById('doll-holder').style.backgroundColor = '#f6a612ff';
//   } else if (state.temp >= yellowTemp){
//     document.getElementById('doll-holder').style.backgroundColor = '#d7b16aff';
//   } else if (state.temp >= greenTemp){
//     document.getElementById('doll-holder').style.backgroundColor = '#81ce62ff';
//   } else {
//     document.getElementById('doll-holder').style.backgroundColor = '#008080';
//   }
  }
};

// Function to get coordinates from city name using LocationIQ
const getCoordinates = async (cityName) => {
  const response = await fetch(
    `https://us1.locationiq.com/v1/search.php?key=${LOCATION_KEY}&q=${encodeURIComponent(cityName)}&format=json`
  );
  const data = await response.json();

  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  } else {
    throw new Error('City not found');
  }
};

// Function to get temperature from OpenWeather API
const getTemperature = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`
  );
  const data = await response.json();

  if (data && data.main && data.main.temp) {
    return convertKtoF(data.main.temp);
  } else {
    throw new Error('Temperature data not available');
  }
};

// Add event listener to the button
const handleRealTimeTemp = async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    alert('Please enter a city name');
    return;
  }

  realTimeButton.textContent = 'Loading...';
  realTimeButton.disabled = true;

  try {
    const coords = await getCoordinates(cityName);
    state.lat = coords.lat;
    state.lon = coords.lon;
    state.city = cityName;

    const temp = await getTemperature(coords.lat, coords.lon);
    state.temp = Math.round(temp);
    state.tempLabel = Math.round(temp).toString();

    tempSlider.value = Math.round(temp);
    tempLabel.textContent = Math.round(temp);

    changeBackgroundColor();
    updateLandscape();
    cityHeader.textContent = cityName;
  } catch (error) {
    console.error('Error in realtime temperature fetch:', error);
    alert('Could not find that city. Please try another name.');
  } finally {
    realTimeButton.textContent = 'Get Realtime Temperature';
    realTimeButton.disabled = false;
  }
};

//city name change and reset button
const handleCityInput = (event) => {
  cityHeader.textContent = event.target.value;
  state.city = event.target.value;
};

// Reset button handler
const handleReset = () => {
  state.city = 'Seattle';
  cityHeader.textContent = 'Seattle';
  cityInput.value = 'Seattle';
};

// sky change

const handleSkyChange = () => {
  state.sky = skyDropDownMenu.value;
  changeSky();
};

// const SkyBLabla(skyObj){

// }

const changeSky = () => {

  if (skyDropDownMenu.value === 'sunny'){
    // skyblablaa(sunny);
    const sunnySky = document.createElement('img');
    parentElementDoll.appendChild(sunnySky);
    sunnySky.src = 'ada-project-docs/assets/sky/sunny.gif';

    /////////ask instructors whats thebest approach here
    //create and update outside of a function
    //or inside
    sunnySky.alt = 'A gif image of sun in the sky';
    sunnySky.style.height = '200px';
    sunnySky.style.width = '200px';
    sunnySky.style.position = 'absolute';
    sunnySky.style.bottom = '450px';
    sunnySky.style.left = '450px';
  }
};

const registerEventHandlers = () => {
  tempSlider.addEventListener('input', handleTempSlider);
  realTimeButton.addEventListener('click', handleRealTimeTemp);
  cityInput.addEventListener('input', handleCityInput);
  resetButton.addEventListener('click', handleReset);
  skyDropDownMenu.addEventListener('change', handleSkyChange);
};

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadElements();
  registerEventHandlers();
});