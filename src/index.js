'strict mode';

const state = {
  temp: 70,
  tempLabel: '70',
  city: 'Seattle',
  sky: 'sunny',
  lat: 47.6038321,
  lon: -122.3300624
};

const config = {
  RED_TEMP: 80,
  ORANGE_TEMP: 70,
  YELLOW_TEMP: 60,
  GREEN_TEMP: 50,
};

const elements = {
  realTimeButton: null,
  resetButton: null,
  tempSlider: null,
  skyDropDownMenu: null,
  tempLabel: null,
  cityInput: null,
  cityHeader: null,
  doll: null,
  parentElementDoll: null,
  gifFire: null,
  beachTemp: null,
  forestTemp: null,
  winterTemp: null,
  sunnySky: null,
  cloudySky: null,
  rainySky: null,
  snowySky: null,
};

const convertKtoF = e => {
  return 1.8 * (e - 273.15) + 32;
};

const setupElements = () => {
  elements.realTimeButton = document.getElementById('realtime-temp');
  elements.resetButton = document.getElementById('reset-button');
  elements.tempSlider = document.getElementById('temp');
  elements.skyDropDownMenu = document.getElementById('sky-drop-down-menu');
  elements.tempLabel = document.getElementById('temp-label');
  elements.cityInput = document.getElementById('city');
  elements.cityHeader = document.getElementById('city-header');
  elements.doll = document.getElementById('doll-image');
  elements.parentElementDoll = document.getElementById('doll-holder');
  
  elements.doll.style.zIndex = '1';
  elements.parentElementDoll.style.position = 'relative';

  /////////////////////////////background elements/////////////////////////////
  elements.gifFire = document.createElement('img');
  elements.gifFire.src = 'ada-project-docs/assets/landscape/fireTemp.gif';
  elements.gifFire.alt = 'A gif image of fire';
  elements.gifFire.style.display = 'block';
  elements.gifFire.style.height = '400px';
  elements.gifFire.style.width = '35.2rem';
  elements.gifFire.style.position = 'absolute';
  elements.gifFire.style.bottom = '100px';
  elements.gifFire.style.zIndex = '0';

  elements.beachTemp = document.createElement('img');
  elements.beachTemp.src = 'ada-project-docs/assets/landscape/beachTemp.png';
  elements.beachTemp.alt = 'A gif image of beach landscape';
  elements.beachTemp.style.display = 'block';
  elements.beachTemp.style.height = '400px';
  elements.beachTemp.style.width = '40.2rem';
  elements.beachTemp.style.position = 'absolute';
  elements.beachTemp.style.bottom = '0px';
  elements.beachTemp.style.zIndex = '0';

  elements.forestTemp = document.createElement('img');
  elements.forestTemp.src = 'ada-project-docs/assets/landscape/forestTemp.png';
  elements.forestTemp.alt = 'A gif image of forest landscape';
  elements.forestTemp.style.display = 'block';
  elements.forestTemp.style.height = '400px';
  elements.forestTemp.style.width = '40.2rem';
  elements.forestTemp.style.position = 'absolute';
  elements.forestTemp.style.bottom = '0px';
  elements.forestTemp.style.zIndex = '0';

  elements.winterTemp = document.createElement('img');
  elements.winterTemp.src = 'ada-project-docs/assets/landscape/winterTemp.png';
  elements.winterTemp.alt = 'A gif image of winter landscape';
  elements.winterTemp.style.display = 'block';
  elements.winterTemp.style.height = '400px';
  elements.winterTemp.style.width = '40.2rem';
  elements.winterTemp.style.position = 'absolute';
  elements.winterTemp.style.bottom = '0px';
  elements.winterTemp.style.zIndex = '0';
  

  //////////////////////////////

  elements.sunnySky = document.createElement('img');
  elements.sunnySky.src = 'ada-project-docs/assets/sky/sunny.gif';
  elements.sunnySky.alt = 'A gif image of sun in the sky';
  elements.sunnySky.style.height = '200px';
  elements.sunnySky.style.width = '200px';
  elements.sunnySky.style.position = 'absolute';
  elements.sunnySky.style.bottom = '430px';
  elements.sunnySky.style.left = '360px';

  elements.cloudySky = document.createElement('img');
  elements.cloudySky.src = 'ada-project-docs/assets/sky/cloudy.gif';
  elements.cloudySky.alt = 'A gif image of clouds in the sky';
  elements.cloudySky.style.height = '300px';
  elements.cloudySky.style.width = '300px';
  elements.cloudySky.style.position = 'absolute';
  elements.cloudySky.style.bottom = '350px';
  elements.cloudySky.style.left = '260px';

  elements.rainySky = document.createElement('img');
  elements.rainySky.src = 'ada-project-docs/assets/sky/rainy.gif';
  elements.rainySky.alt = 'A gif image of rain in the sky';
  elements.rainySky.style.height = '330px';
  elements.rainySky.style.width = '330px';
  elements.rainySky.style.position = 'absolute';
  elements.rainySky.style.bottom = '300px';
  elements.rainySky.style.left = '245px';

  elements.snowySky = document.createElement('img');
  elements.snowySky.src = 'ada-project-docs/assets/sky/snowy.gif';
  elements.snowySky.alt = 'A gif image of snow in the sky';
  elements.snowySky.style.height = '600px';
  elements.snowySky.style.width = '600px';
  elements.snowySky.style.position = 'absolute';
  elements.snowySky.style.bottom = '30px';
  elements.snowySky.style.right = '1px';
  elements.snowySky.style.zIndex = '0';

    // Initial UI sync with state
  elements.tempSlider.value = state.temp;
  elements.tempLabel.textContent = state.tempLabel;
  elements.cityInput.value = state.city;
  elements.cityHeader.textContent = state.city;

    // Make sure container is positioned for overlays
  elements.parentElementDoll.style.position = 'relative';
};

const registerEventHandlers = () => {

  const {
    tempSlider,
    realTimeButton,
    cityInput,
    resetButton,
    skyDropDownMenu,
    } = elements;

  tempSlider.addEventListener('input', handleTempSlider);
  realTimeButton.addEventListener('click', handleRealTimeTemp);
  cityInput.addEventListener('input', handleCityInput);
  resetButton.addEventListener('click', handleResetButton); 
  skyDropDownMenu.addEventListener('change', handleSkyChange);
};

const handleSkyChange = (event) => {
  state.sky = event.target.value;
  changeSky();
};

const handleCityInput = (event) => {
  elements.cityHeader.textContent = event.target.value;
  state.city = event.target.value;
};

const handleRealTimeTemp = async () => {

  try {
    const coords = await getCoordinates();
    state.lat = parseFloat(coords.lat);
    state.lon = parseFloat(coords.lon);
``
    const temp = await getTemperature(state.lat, state.lon);
    state.temp = temp;
    state.tempLabel = temp;
    // Update slider and label
    elements.tempSlider.value = Math.trunc(temp);
    elements.tempLabel.textContent = Math.trunc(temp);
    // Update background and landscape
    changeBackgroundColor();
    updateLandscape();
  } catch (error) {
    console.error('Error in realtime temperature fetch:', error);
    alert('An error occurred. Please try again.');
  }
};

const handleResetButton = () => {
  state.city = 'Seattle';
  elements.cityHeader.textContent = 'Seattle';
  elements.cityInput.value = 'Seattle';
};

const changeBackgroundColor = () => {
  const {
    parentElementDoll
    } = elements;
  const {
    RED_TEMP,
    ORANGE_TEMP,
    YELLOW_TEMP,
    GREEN_TEMP
  } = config;

  if (state.temp >= RED_TEMP){
    parentElementDoll.style.backgroundColor = '#c05252ff';
  } else if (state.temp >= ORANGE_TEMP){
    parentElementDoll.style.backgroundColor = '#edbc80ff';
  } else if (state.temp >= YELLOW_TEMP){
    parentElementDoll.style.backgroundColor = '#f5f48aff';
  } else if (state.temp >= GREEN_TEMP){
    parentElementDoll.style.backgroundColor = '#a1e387ff';
  } else {
    parentElementDoll.style.backgroundColor = '#70eaeaff';
  }
};

const clearSkyImages = () => {
  const {
    parentElementDoll,
    sunnySky,
    cloudySky,
    rainySky,
    snowySky,
    } = elements;

  if (sunnySky.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(sunnySky);
  } else if (cloudySky.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(cloudySky);
  } else if (rainySky.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(rainySky);
  } else if (snowySky.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(snowySky);
  }
};  

const changeSky = () => {
  const {
    parentElementDoll,
    skyDropDownMenu,
    sunnySky,
    cloudySky,
    rainySky,
    snowySky,
    } = elements;

  if (skyDropDownMenu.value === 'sunny'){
    clearSkyImages();
    parentElementDoll.appendChild(sunnySky);
  } else if (skyDropDownMenu.value === 'cloudy'){
    clearSkyImages();
    parentElementDoll.appendChild(cloudySky);
    } else if (skyDropDownMenu.value === 'rainy'){
      clearSkyImages();
      parentElementDoll.appendChild(rainySky);
  } else if (skyDropDownMenu.value === 'snowy'){
    clearSkyImages();
    parentElementDoll.appendChild(snowySky);
  }
};

const clearBackgroundElements = () => {
  const {
    parentElementDoll,
    gifFire,
    beachTemp,
    forestTemp,
    winterTemp,
    } = elements;

  if (gifFire.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(gifFire);
  } else if (beachTemp.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(beachTemp);
  } else if (forestTemp.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(forestTemp);
  } else if (winterTemp.parentNode === parentElementDoll) {
    parentElementDoll.removeChild(winterTemp);
  }
};

const updateLandscape = () => {
  const {
    parentElementDoll,
    gifFire, 
    beachTemp,
    forestTemp,
    winterTemp,
    } = elements;
    
  const {
    RED_TEMP,
    ORANGE_TEMP,
    GREEN_TEMP
  } = config;
  
  if (state.temp >= RED_TEMP) {
    clearBackgroundElements();
    parentElementDoll.appendChild(gifFire);
  } else if (state.temp >= ORANGE_TEMP) {
    clearBackgroundElements();
    parentElementDoll.appendChild(beachTemp);
  } else if (state.temp >= GREEN_TEMP) {
    clearBackgroundElements();
    parentElementDoll.appendChild(forestTemp);
  } else if (state.temp < GREEN_TEMP) {
    clearBackgroundElements();
    parentElementDoll.appendChild(winterTemp);
  } 
};

const updateTemp = (event) => {
  state.temp = event.target.value;
  state.tempLabel = event.target.value;
  elements.tempLabel.textContent = event.target.value;
};

const handleTempSlider = (event) => {
  updateTemp(event);
  changeBackgroundColor();
  updateLandscape();
}; 

///API HELPERS/////

// Function to get coordinates from city name using LocationIQ
const getCoordinates = async () => {
  const response = await axios.get('http://127.0.0.1:5000/location', {
    params: { q: `${state.city}`} });

  const {lat, lon} = response.data[0];
  return {
    lat: parseFloat(lat),
    lon: parseFloat(lon)
  };
};

// Function to get temperature from OpenWeather API
const getTemperature = async (lat, lon) => {
  const response = await axios.get('http://127.0.0.1:5000/weather', {
    params: { lat, lon }});

    const temp = response.data.main.temp;
    state.temp = convertKtoF(temp);
    return convertKtoF(temp);
};

document.addEventListener('DOMContentLoaded', () => {
  setupElements();
  registerEventHandlers();
  changeSky();
  changeBackgroundColor();
  updateLandscape();
});
