const realTempButton = document.getElementById('realtime-temp');
const resetButton = document.getElementById('reset-button');
const tempSlider = document.getElementById('temp');
const dropDownMenu = document.getElementById('drop-down-menu');
const tempLabel = document.getElementById('temp-label');
const cityName = document.getElementById('city');
const cityHeader = document.getElementById('city-header');
const redTemp = 80;
const orangeTemp = 70;
const yellowTemp = 60;
const greenTemp = 50;
const parentElementDoll = document.getElementById('doll');
const gifFire = document.createElement('img');
gifFire.src = 'ada-project-docs/assets/fire.gif';
gifFire.alt = 'A gif image of fire';
gifFire.style.height = '450px';

let BASE_URL = 'http://127.0.0.1:5500/';

const convertKtoF = e => 1.8 * (e- 273.15) + 32;


const state = {
  temp: 70,
  tempLabel: '70',
  city: 'Seattle',
  sky: 'Sunny',
  lat: 47.6038321,
  lon: -122.3300624
};

tempSlider.addEventListener('input', (event) => {
  state.temp = event.target.value;
  state.tempLabel = event.target.value;
  tempLabel.textContent = event.target.value;
  changeBackgroundColor();
  updateLandscape();
});

const changeBackgroundColor = (event) => {
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

// } else if (state.temp >= orangeTemp){
//     document.getElementById('doll-holder').style.backgroundColor = '#f6a612ff';
//   } else if (state.temp >= yellowTemp){
//     document.getElementById('doll-holder').style.backgroundColor = '#d7b16aff';
//   } else if (state.temp >= greenTemp){
//     document.getElementById('doll-holder').style.backgroundColor = '#81ce62ff';
//   } else {
//     document.getElementById('doll-holder').style.backgroundColor = '#008080';
//   }
}
}


const findLatAndLon = () => {
    axios.get(BASE_URL + '/location'), {
        params: {
            q: state.city
        }
    }.then(e => (console.log(e.data),
    state.lat = e.data[0].lat,
    state.lon = e.data[0].lon,
    getWeather())).catch(e => {
        console.log('Error finding the latitude and longitude:', e.response);
    });
};

const getWeather = () => {
    axios.get(BASE_URL + '/weather', {
        params: {
            lan: state.lan,
            lon: state.lon
        }
    }).then(e => {
        e = e.data;
        return state.temp = Math.round(convertKtoF(e.main.temp)),
        formatTemp();
    }
).catch(e => {
    console.log('Error getting the weather:', e);
});
};

realTempButton.addEventListener('click', () => {
    // change tempLabel to real time temp
    //   console.log('this button has been clicked');
    formatTemp();
});

const formatTemp = () => {
    let e = state.temp;
    e. document.getElementById('realtime-temp')
    e.textContent = String(state.temp);
};

// const cityNameUpdate = () => {
//     let e = cityName.value;
//     let t =  cityHeader;
    
//     state.city = e
//     t.textContent = state.city
// }

// cityName.addEventListener("input", () => {
//     cityNameUpdate();
// })


cityName.addEventListener('input', (event)=>{
    cityHeader.textContent = event.target.value;
    console.log(`${cityName}`);

});
