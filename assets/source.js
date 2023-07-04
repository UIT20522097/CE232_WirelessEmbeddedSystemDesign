// IP Server Address:
const IP_SERVER = "http://35.198.193.139:3001/";

/*
    @ URL - Values(A number) of the sensors:
    * Air Temperature: IP_SERVER + 'air_temperature'
    * Air Humidity: IP_SERVER + 'air_humidity'
    * Soil Moisture: IP_SERVER + 'soil_moisture'
    * Light Intensity: IP_SERVER + 'light_intensity'
*/
const URL_AIR_TEMPERATURE = IP_SERVER + "air_temperature";
const URL_AIR_HUMIDITY = IP_SERVER + "air_humidity";
const URL_SOIL_MOISTURE = IP_SERVER + "soil_moisture";
const URL_LIGHT_INTENSITY = IP_SERVER + "light_intensity";

/*
    @ URL - state("True/False") of the engines:
    * Fan: IP_SERVER + 'fan'
    * Water Pump: IP_SERVER + 'water_pump'
    * Light: IP_SERVER + 'light'
*/
const URL_FAN = IP_SERVER + "fan";
const URL_WATER_PUMP = IP_SERVER + "water_pump";
const URL_LIGHT = IP_SERVER + "light";

const URL_NOW = "/now";

const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");

function updateClock() {
  let currentTime = new Date();
  let h = currentTime.getHours();
  let m = currentTime.getMinutes();
  let s = currentTime.getSeconds();
  let ampm = "AM";

  if (h > 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hourEl.innerHTML = h;
  minuteEl.innerHTML = m;
  secondEl.innerHTML = s;
  ampmEl.innerText = ampm;

  setTimeout(updateClock, 1000);
}

updateClock();

const getNow = async () => {
  try {
    const res = await fetch(URL_NOW);
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const renderNow = async () => {
  document.querySelector("#temp").value = "";
  document.querySelector("#air-humidity").value = "";
  document.querySelector("#soil-moisture").value = "";
  document.querySelector("#light-intensity").value = "";
  try {
    const data = await getNow();

    const temp = document.getElementById("temp");
    const humidity = document.getElementById("air-humidity");
    const soilMoisture = document.getElementById("soil-moisture");
    const lightIntensity = document.getElementById("light-intensity");

    temp.innerHTML = data.air_temperature + "&deg;C" || 30 + "&deg;C";
    humidity.innerHTML = data.air_humidity + " %" || 30 + " %";
    soilMoisture.innerHTML = data.soil_moisture + " %" || 30 + " %";
    lightIntensity.innerHTML = data.light_intensity + " Lux" || 30 + " Lux";

  } catch (err) {
    console.log("err", err);
  }
};

// const getTemp = async () => {
//   try {
//     const res = await fetch(URL_AIR_TEMPERATURE);

//     const data = await res.json();
//     return data.value;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const renderTemp = async () => {
//   document.querySelector("#temp").value = "";
//   try {
//     const dataTemp = await getTemp();
//     const temp = document.getElementById("temp");

//     temp.innerHTML = dataTemp + "&deg;C" || 30 + "&deg;C";
//   } catch (err) {
//     console.log("err", err);
//   }
// };

// const getAirHudmity = async () => {
//   try {
//     const res = await fetch('/air_humidity');
//     const data = await res.json();
//     return data.value;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const renderAirHumidity = async () => {
//   document.querySelector("#air-humidity").value = "";
//   try {
//     const dataHumidity = await getAirHudmity();
//     const humidity = document.getElementById("air-humidity");

//     humidity.innerHTML = dataHumidity + " %" || 30 + " %";
//   } catch (err) {
//     console.log("err", err);
//   }
// };

// const getSoilMoisture = async () => {
//   try {
//     const res = await fetch('/soil_moisture');
//     const data = await res.json();
//     return data.value;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const renderSoilMoisture = async () => {
//   document.querySelector("#soil-moisture").value = "";
//   try {
//     const dataSoilMoisture = await getSoilMoisture();
//     const soilMoisture = document.getElementById("soil-moisture");

//     soilMoisture.innerHTML = dataSoilMoisture + " %" || 30 + " %";
//   } catch (err) {
//     console.log("err", err);
//   }
// };

// const getLightIntensity = async () => {
//   try {
//     const res = await fetch('/light_intensity');
//     const data = await res.json();
//     return data.value;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const renderLightIntensity = async () => {
//   document.querySelector("#light-intensity").value = "";
//   try {
//     const dataLightIntensity = await getLightIntensity();
//     const lightIntensity = document.getElementById("light-intensity");

//     lightIntensity.innerHTML = dataLightIntensity + " Lux" || 30 + " Lux";
//   } catch (err) {
//     console.log("err", err);
//   }
// };

// renderTemp();
// renderAirHumidity();
// renderSoilMoisture();
// renderLightIntensity();
renderNow();

setInterval(() => {
  // renderTemp();
  // renderAirHumidity();
  // renderSoilMoisture();
  // renderLightIntensity();
  renderNow();
}, 20000);

const changeFanState = async (input) => {
  try {
    const response = await fetch(URL_FAN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: input,
      }),
    });
    console.log("Completed!", response);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const changeWaterState = async (input) => {
  try {
    const response = await fetch(URL_WATER_PUMP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: input,
      }),
    });
    console.log("Completed!", response);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const changeLightState = async (input) => {
  try {
    const response = await fetch(URL_LIGHT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: input,
      }),
    });
    console.log("Completed!", response);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

function handleFan(checkbox) {
  if (checkbox.checked) {
    changeFanState(false);
  } else {
    changeFanState(true);
  }
  console.log(checkbox.checked);
}

function handleWater(checkbox) {
  if (checkbox.checked) {
    changeWaterState(false);
  } else {
    changeWaterState(true);
  }
}

function handleLight(checkbox) {
  if (checkbox.checked) {
    changeLightState(false);
  } else {
    changeLightState(true);
  }
}
