const realTimeButton = document.getElementById('realtime-temp');
const resetButton = document.getElementById('reset-button');
const tempSlider = document.getElementById('temp');
const skyDropDownMenu = document.getElementById('sky-drop-down-menu');
const tempLabel = document.getElementById('temp-label');
const cityInput = document.getElementById('city');
const cityHeader = document.getElementById('city-header');
const doll = document.getElementById('doll-image');
const redTemp = 80;
const orangeTemp = 70;
const yellowTemp = 60;
const greenTemp = 50;
const parentElementDoll = document.getElementById('doll-holder');
const gifFire = document.createElement('img');
gifFire.src = 'ada-project-docs/assets/landscape/fire.gif';
gifFire.alt = 'A gif image of fire';
gifFire.style.height = '400px';
gifFire.style.width = '35.2rem';
gifFire.style.position = 'absolute';
gifFire.style.bottom = '300px';
gifFire.style.zIndex = '0';
doll.style.zIndex = '1';
// sunnySky = {}

//add eventlistener for DOM content loaded
//set up the document.get elements
//function registerEventHandlers
//load page function - > is calling load elements and regist evevents
//  inside load elements function - then do document.get 
    //set up all elements
//  set up documents, set up functions
//  create register events 

///const registerEventHandlers = (event) => {
//   const crabButton = document.querySelector('#addCrabButton');
//   crabButton.addEventListener('click', addCrab);
// };

// document.addEventListener('DOMContentLoaded', registerEventHandlers);



// here for testing //
const LOCATION_KEY = 'your_actual_key_here';
const WEATHER_KEY = 'your_actual_key_here';

const convertKtoF = e => {
  return 1.8 * (e - 273.15) + 32;
};

const state = {
  temp: 70,
  tempLabel: '70',
  city: 'Seattle',
  sky: 'Sunny',
  lat: 47.6038321,
  lon: -122.3300624
};

/////////temp slider change and background and landscape change///////////////////////
tempSlider.addEventListener('input', (event) => {
  state.temp = event.target.value;
  state.tempLabel = event.target.value;
  tempLabel.textContent = event.target.value;
  changeBackgroundColor();
  updateLandscape();
});

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
  state.sky = skyDropDownMenu.value;
  changeSky(event);
});

// const SkyBLabla(skyObj){

// }

const changeSky = () => {

  if (skyDropDownMenu.value === 'sunny'){
    // skyblablaa(sunny);
    const sunnySky = document.createElement('img');
    parentElementDoll.appendChild(sunnySky);
    sunnySky.src = 'ada-project-docs/sky/sunny.gif';

    /////////ask instructors whats thebest approach here
    //create and update outside of a function
    //or inside
    sunnySky.alt = 'A gif image of fire';
    sunnySky.style.height = '200px';
    sunnySky.style.width = '200px';
    sunnySky.style.position = 'absolute';
    sunnySky.style.bottom = '650px';
    sunnySky.style.left = '700px';
  }

}