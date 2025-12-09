'strict mode';

const state = {
  temp: 70,
  tempLabel: '70',
  city: 'Seattle',
  sky: 'sunny',
  skyDropDownMenu: 'sunny',
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
  // Clothing items
  sunnyHat: null,
  sunnyTop: null,
  sunnyBottom:null,
  sunnyShoe1: null,
  sunnyShoe2: null,
  winterHat: null,
  winterTop: null,
  winterBoot1: null,
  winterBoot2: null,
  rainBoot1: null,
  rainBoot2: null,
  rainCoat: null,
  rainHat: null,
  cloudyTop: null,
  cloudyBottom: null,
  cloudyShoe1: null,
  cloudyShoe2: null,
};

// Drag-and-drop state
const dragState = {
  element: null,
  newX: 0,
  newY: 0,
  startX: 0,
  startY: 0
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

  // Clothing items
  elements.sunnyHat = document.getElementById('sunny-hat');
  elements.sunnyTop = document.getElementById('sunny-top');
  elements.sunnyBottom = document.getElementById('sunny-bottom');
  elements.sunnyShoe1 = document.getElementById('sandle-1');
  elements.sunnyShoe2 = document.getElementById('sandle-2');
  elements.winterHat = document.getElementById('winter-hat');
  elements.winterTop = document.getElementById('winter-top');
  elements.winterBoot1 = document.getElementById('winter-boot-1');
  elements.winterBoot2 = document.getElementById('winter-boot-2');
  elements.rainBoot1 = document.getElementById('rain-boot-1');
  elements.rainBoot2 = document.getElementById('rain-boot-2');
  elements.rainCoat = document.getElementById('rain-top');
  elements.rainHat = document.getElementById('rain-hat');
  elements.cloudyTop = document.getElementById('cloudy-top');
  elements.cloudyBottom = document.getElementById('cloudy-bottom');
  elements.cloudyShoe1 = document.getElementById('sneaker-1');
  elements.cloudyShoe2 = document.getElementById('sneaker-2');

  elements.doll.style.zIndex = '2';
  elements.parentElementDoll.style.position = 'relative';

  /////////////////////////////background elements/////////////////////////////
  elements.gifFire = document.createElement('img');
  elements.gifFire.src = 'ada-project-docs/assets/landscape/fireTemp.gif';
  elements.gifFire.alt = 'A gif image of fire';
  elements.gifFire.style.display = 'block';
  elements.gifFire.style.height = '400px';
  elements.gifFire.style.width = '43.1rem';
  elements.gifFire.style.position = 'absolute';
  elements.gifFire.style.bottom = '90px';
  elements.gifFire.style.zIndex = '0';

  elements.beachTemp = document.createElement('img');
  elements.beachTemp.src = 'ada-project-docs/assets/landscape/beachTemp.png';
  elements.beachTemp.alt = 'A gif image of beach landscape';
  elements.beachTemp.style.display = 'block';
  elements.beachTemp.style.height = '400px';
  elements.beachTemp.style.width = '44.2rem';
  elements.beachTemp.style.position = 'absolute';
  elements.beachTemp.style.bottom = '0px';
  elements.beachTemp.style.zIndex = '0';

  elements.forestTemp = document.createElement('img');
  elements.forestTemp.src = 'ada-project-docs/assets/landscape/forestTemp.png';
  elements.forestTemp.alt = 'A gif image of forest landscape';
  elements.forestTemp.style.display = 'block';
  elements.forestTemp.style.height = '400px';
  elements.forestTemp.style.width = '44.2rem';
  elements.forestTemp.style.position = 'absolute';
  elements.forestTemp.style.bottom = '0px';
  elements.forestTemp.style.zIndex = '0';

  elements.winterTemp = document.createElement('img');
  elements.winterTemp.src = 'ada-project-docs/assets/landscape/winterTemp.png';
  elements.winterTemp.alt = 'A gif image of winter landscape';
  elements.winterTemp.style.display = 'block';
  elements.winterTemp.style.height = '400px';
  elements.winterTemp.style.width = '44.2rem';
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
  elements.sunnySky.style.left = '450px';

  elements.cloudySky = document.createElement('img');
  elements.cloudySky.src = 'ada-project-docs/assets/sky/cloudy.gif';
  elements.cloudySky.alt = 'A gif image of clouds in the sky';
  elements.cloudySky.style.height = '300px';
  elements.cloudySky.style.width = '300px';
  elements.cloudySky.style.position = 'absolute';
  elements.cloudySky.style.bottom = '350px';
  elements.cloudySky.style.left = '390px';

  elements.rainySky = document.createElement('img');
  elements.rainySky.src = 'ada-project-docs/assets/sky/rainy.gif';
  elements.rainySky.alt = 'A gif image of rain in the sky';
  elements.rainySky.style.height = '330px';
  elements.rainySky.style.width = '330px';
  elements.rainySky.style.position = 'absolute';
  elements.rainySky.style.bottom = '340px';
  elements.rainySky.style.left = '380px';

  elements.snowySky = document.createElement('img');
  elements.snowySky.src = 'ada-project-docs/assets/sky/snowy.gif';
  elements.snowySky.alt = 'A gif image of snow in the sky';
  elements.snowySky.style.height = '600px';
  elements.snowySky.style.width = '700px';
  elements.snowySky.style.position = 'absolute';
  elements.snowySky.style.bottom = '30px';
  elements.snowySky.style.right = '1px';
  elements.snowySky.style.zIndex = '1';

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

  setupDraggableClothes();
};

// Setup drag-and-drop for all clothing items with class 'draggable-clothing'
const setupDraggableClothes = () => {
  const draggableItems = document.querySelectorAll('.draggable-clothing');

  const initialPositions = {
    'sunny-hat': { top: '100px', left: '670px' },
    'sunny-top': { top: '130px', left: '-250px' },
    'sunny-bottom': { top: '400px', left: '-250px' },
    'sandle-1': { top: '450px', left: '750px' },
    'sandle-2': { top: '450px', left: '850px' },
    'winter-hat': { top: '100px', left: '650px' },
    'winter-top': { top: '110px', left: '-270px' },
    'winter-boot-1': { top: '450px', left: '750px' },
    'winter-boot-2': { top: '450px', left:'850px' },
    'rain-boot-1': { top: '450px', left: '750px' },
    'rain-boot-2': { top: '450px', left:'850px' },
    'rain-top': { top: '110px', left: '-290px' },
    'cloudy-top': { top: '130px', left: '-360px' },
    'cloudy-bottom': { top: '400px', left: '-350px' },
    'sneaker-1': { top: '450px', left: '750px' },
    'sneaker-2': { top: '450px', left:'850px' },
  };

  draggableItems.forEach(item => {
    // Ensure items use absolute positioning for proper dragging
    item.style.position = 'absolute';

    // Set initial position if specified
    const itemId = item.id;
    if (initialPositions[itemId]) {
      item.style.top = initialPositions[itemId].top;
      item.style.left = initialPositions[itemId].left;
    }

    item.addEventListener('mousedown', mouseDown);
  });
};

const mouseDown = (e) => {
  dragState.element = e.target;
  dragState.startX = e.clientX;
  dragState.startY = e.clientY;

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
};

const mouseMove = (e) => {
  if (!dragState.element) return;

  dragState.newX = dragState.startX - e.clientX;
  dragState.newY = dragState.startY - e.clientY;

  dragState.startX = e.clientX;
  dragState.startY = e.clientY;

  dragState.element.style.top = (dragState.element.offsetTop - dragState.newY) + 'px';
  dragState.element.style.left = (dragState.element.offsetLeft - dragState.newX) + 'px';
};

const mouseUp = () => {
  document.removeEventListener('mousemove', mouseMove);
  dragState.element = null;
};

// Update clothing visibility based on weather
const updateClothingVisibility = () => {
  // Hide all draggable clothing first
  const allClothing = document.querySelectorAll('.draggable-clothing');
  allClothing.forEach(item => item.style.display = 'none');

  // Show clothing based on current sky condition
  switch(state.sky) {
    case 'sunny':
      elements.sunnyHat.style.display = 'block';
      elements.sunnyTop.style.display = 'block';
      elements.sunnyBottom.style.display = 'block';
      elements.sunnyShoe1.style.display = 'block';
      elements.sunnyShoe2.style.display = 'block';
      break;
    case 'cloudy':
      elements.cloudyTop.style.display = 'block';
      elements.cloudyBottom.style.display = 'block';
      elements.cloudyShoe1.style.display = 'block';
      elements.cloudyShoe2.style.display = 'block';
      break;
    case 'rainy':
      elements.rainBoot1.style.display = 'block';
      elements.rainBoot2.style.display = 'block';
      elements.rainCoat.style.display = 'block';
      elements.rainHat.style.display = 'block';
      break;
    case 'snowy':
      elements.winterHat.style.display = 'block';
      elements.winterTop.style.display = 'block';
      elements.winterBoot1.style.display = 'block';
      elements.winterBoot2.style.display = 'block';
      break;
  }
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
    const response = await getWeather(state.lat, state.lon);
    state.temp = response.temp;
    state.tempLabel = response.temp;
    // Update slider and label
    elements.tempSlider.value = Math.trunc(response.temp);
    elements.tempLabel.textContent = Math.trunc(response.temp);
    handleSkyChangeRealTime(response);
    // Update background and landscape
    changeBackgroundColor();
    updateLandscape();
  } catch (error) {
    console.error('Error in realtime temperature fetch:', error);
    alert('An error occurred. Please try again.');
  }
};

const updateSkyUI = () => {
  changeSky();
  updateClothingVisibility();
};

const handleSkyChange = (event) => {
  state.sky = event.target.value;
  updateSkyUI();
};

const handleSkyChangeRealTime = (response) => {
  if (response.weather.startsWith('Clea')) {
    state.sky = 'sunny';
    updateSkyUI();
  } else if (response.weather.startsWith('Clou')) {
    state.sky = 'cloudy';
    updateSkyUI();
  } else if (response.weather.startsWith('Rai') || response.weather.startsWith('Dri')) {
    state.sky = 'rainy';
    updateSkyUI();
  } else if (response.weather.startsWith('Sno')) {
    state.sky = 'snowy';
    updateSkyUI();
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
    parentElementDoll.style.backgroundColor = '#9adbdbff';
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
    sunnySky,
    cloudySky,
    rainySky,
    snowySky,
  } = elements;

  if (state.sky === 'sunny'){
    state.sky = 'sunny';
    clearSkyImages();
    parentElementDoll.appendChild(sunnySky);
  } else if (state.sky === 'cloudy'){
    state.sky = 'cloudy';
    clearSkyImages();
    parentElementDoll.appendChild(cloudySky);
  } else if (state.sky === 'rainy'){
    state.sky = 'rainy';
    clearSkyImages();
    parentElementDoll.appendChild(rainySky);
  } else if (state.sky === 'snowy'){
    state.sky = 'snowy';
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
  const response = await axios.get('https://weather-report-proxy-server-5mhf.onrender.com//location', {
    params: { q: `${state.city}`} });

  const {lat, lon} = response.data[0];
  return {
    lat: parseFloat(lat),
    lon: parseFloat(lon)
  };
};

// Function to get temperature from OpenWeather API
const getWeather = async (lat, lon) => {
  const response = await axios.get('https://weather-report-proxy-server-5mhf.onrender.com//weather', {
    params: { lat, lon }});

  const temp = response.data.main.temp;
  const weather = response.data.weather[0].main;

  return {temp: convertKtoF(temp), weather};
};

document.addEventListener('DOMContentLoaded', () => {
  setupElements();
  registerEventHandlers();
  changeSky();
  changeBackgroundColor();
  updateLandscape();
  updateClothingVisibility();
});
