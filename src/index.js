"strict mode";

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
}

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
  sunnySky: null,
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

  elements.gifFire = document.createElement('img');
  elements.gifFire.src = 'ada-project-docs/assets/landscape/fire.gif';
  elements.gifFire.alt = 'A gif image of fire';
  elements.gifFire.style.height = '400px';
  elements.gifFire.style.width = '35.2rem';
  elements.gifFire.style.position = 'absolute';
  elements.gifFire.style.bottom = '100px';
  elements.gifFire.style.zIndex = '0';
  elements.doll.style.zIndex = '1';

  elements.sunnySky = document.createElement('img');
  elements.sunnySky.src = 'ada-project-docs/assets/sky/sunny.gif';
  elements.sunnySky.alt = 'A gif image of sun in the sky';
  elements.sunnySky.style.height = '200px';
  elements.sunnySky.style.width = '200px';
  elements.sunnySky.style.position = 'absolute';
  elements.sunnySky.style.bottom = '450px';
  elements.sunnySky.style.left = '450px';

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
    realTimeButton,
    resetButton,
    tempSlider,
    skyDropDownMenu,
    tempLabel,
    cityInput,
    cityHeader,
  } = elements;

  tempSlider.addEventListener('input', (event) => {
    state.temp = event.target.value;
    state.tempLabel = event.target.value;
    tempLabel.textContent = event.target.value;
    changeBackgroundColor();
    updateLandscape();
  });

  // Add event listener to the button
  realTimeButton.addEventListener('click', async () => {
    const cityName = cityInput.value.trim();
    if (!cityName) {
      alert('Please enter a city name');
      return;
    }
    // Show loading state
    realTimeButton.textContent = 'Loading...';
    realTimeButton.disabled = true;
    try {
      // Get coordinates for the city
      const coords = await getCoordinates(cityName);
      if (coords) {
        // Update state with new coordinates
        state.lat = coords.lat;
        state.lon = coords.lon;
        state.city = cityName;
        // Get temperature
        const temp = await getTemperature(coords.lat, coords.lon);
  
        if (temp !== null) {
          // Update state and UI
          state.temp = Math.round(temp);
          state.tempLabel = Math.round(temp).toString();
  
          // Update slider and label
          tempSlider.value = Math.round(temp);
          tempLabel.textContent = Math.round(temp);
  
          // Update background and landscape
          changeBackgroundColor();
          updateLandscape();
  
          // Update city header
          document.getElementById('city-header').textContent = cityName;
        }
      }
    } catch (error) {
      console.error('Error in realtime temperature fetch:', error);
      alert('An error occurred. Please try again.');
    } finally {
      realTimeButton.textContent = 'Get Realtime Temperature';
      realTimeButton.disabled = false;
    }
  });
  
  ///////////////////////////////city name change and reset button///////////////////////
  
  cityInput.addEventListener('input', (event)=>{
    cityHeader.textContent = event.target.value;
    state.city = event.target.value;
  });
  
  resetButton.addEventListener('click', () => {
    state.city = 'Seattle';
    cityHeader.textContent = 'Seattle';
    cityInput.value = 'Seattle';
  });
  
  ////////////////////////////////sky change////////////////////////////////////
  
  skyDropDownMenu.addEventListener('change', (event) =>{
    state.sky = event.target.value;
    changeSky();
  });
  
};


const convertKtoF = e => {
  return 1.8 * (e - 273.15) + 32;
};

/////////temp slider change and background and landscape change///////////////////////

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
    parentElementDoll.style.backgroundColor = '#cb4949ff';
  } else if (state.temp >= ORANGE_TEMP){
    parentElementDoll.style.backgroundColor = '#f6a612ff';
  } else if (state.temp >= YELLOW_TEMP){
    parentElementDoll.style.backgroundColor = '#d7b16aff';
  } else if (state.temp >= GREEN_TEMP){
    parentElementDoll.style.backgroundColor = '#81ce62ff';
  } else {
    parentElementDoll.style.backgroundColor = '#008080';
  }
};

const changeSky = () => {
  const {
    parentElementDoll,
    skyDropDownMenu,
    sunnySky
    } = elements;

  if (skyDropDownMenu.value === 'sunny'){
    parentElementDoll.appendChild(sunnySky);
  }
};

const updateLandscape = () => {
  const {
    parentElementDoll,
    gifFire
    } = elements;
  const {
    RED_TEMP,
    ORANGE_TEMP,
    YELLOW_TEMP,
    GREEN_TEMP
  } = config;
  
  if (state.temp >= RED_TEMP) {
    parentElementDoll.appendChild(gifFire);
    gifFire.style.display = 'block';
  } else {
    if (gifFire.parentNode === parentElementDoll) {
      parentElementDoll.removeChild(gifFire);
    } }
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
};


///API HELPERS/////

// Function to get coordinates from city name using LocationIQ
const getCoordinates = async (cityName) => {
  try {
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
  } catch (error) {
    console.error('Error getting coordinates:', error);
    alert('Could not find that city. Please try another name.');
    return null;
    //maybe we should return this catch ouside of 
  }
};

// Function to get temperature from OpenWeather API
const getTemperature = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`
    );
    const data = await response.json();
    
    if (data && data.main && data.main.temp) {
      return convertKtoF(data.main.temp);
    } else {
      throw new Error('Temperature data not available');
    }
  } catch (error) {
    console.error('Error getting temperature:', error);
    alert('Could not get temperature data. Please try again.');
    return null;
  }
};


document.addEventListener('DOMContentLoaded', () => {
  setupElements();
  registerEventHandlers();
  changeSky();
  changeBackgroundColor();
  updateLandscape();
});
