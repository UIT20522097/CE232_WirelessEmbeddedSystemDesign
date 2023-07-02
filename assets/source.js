// IP Server Address:
const IP_SERVER = "http://http://35.198.193.139:3001/";

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

const getTemp = async () => {
  try {
    const url = URL_AIR_TEMPERATURE;
    const res = await fetch(url);
    const data = await res.json();
    return data.feeds;
  } catch (error) {
    console.log("error", error);
  }
};

const renderTemp = async () => {
  document.querySelector("#temp").value = "";
  let res;
  try {
    const dataTemp = await getTemp();
    const temp = document.getElementById("temp");
    for (let i = dataTemp.length - 1; i >= 0; i--) {
      if (/^\d+$/.test(dataTemp[i].field1)) {
        res = dataTemp[i];
        i = -1;
      }
    }
    temp.innerHTML = res?.field1 + "&deg;C" || 30 + "&deg;C";
  } catch (err) {
    console.log("err", err);
  }
};

const getAirHudmity = async () => {
  try {
    const url = URL_AIR_HUMIDITY;
    const res = await fetch(url);
    const data = await res.json();
    return data.feeds;
  } catch (error) {
    console.log("error", error);
  }
};

const renderAirHumidity = async () => {
  document.querySelector("#air-humidity").value = "";
  let res;
  try {
    const dataHumidity = await getAirHudmity();
    const humidity = document.getElementById("air-humidity");
    for (let i = dataHumidity.length - 1; i >= 0; i--) {
      if (/^\d+$/.test(dataHumidity[i].field1)) {
        res = dataHumidity[i];
        i = -1;
      }
    }
    humidity.innerHTML = res?.field1 + " %" || 30 + " %";
  } catch (err) {
    console.log("err", err);
  }
};

const getSoilMoisture = async () => {
  try {
    const url = URL_SOIL_MOISTURE;
    const res = await fetch(url);
    const data = await res.json();
    return data.feeds;
  } catch (error) {
    console.log("error", error);
  }
};

const renderSoilMoisture = async () => {
  document.querySelector("#soil-moisture").value = "";
  let res;
  try {
    const dataSoilMoisture = await getSoilMoisture();
    const soilMoisture = document.getElementById("soil-moisture");
    for (let i = dataSoilMoisture.length - 1; i >= 0; i--) {
      if (/^\d+$/.test(dataSoilMoisture[i].field1)) {
        res = dataSoilMoisture[i];
        i = -1;
      }
    }
    soilMoisture.innerHTML = res?.field1 + " %" || 30 + " %";
  } catch (err) {
    console.log("err", err);
  }
};

const getLightIntensity = async () => {
  try {
    const url = URL_LIGHT_INTENSITY;
    const res = await fetch(url);
    const data = await res.json();
    return data.feeds;
  } catch (error) {
    console.log("error", error);
  }
};

const renderLightIntensity = async () => {
  document.querySelector("#light-intensity").value = "";
  let res;
  try {
    const dataLightIntensity = await getLightIntensity();
    const lightIntensity = document.getElementById("light-intensity");
    for (let i = dataLightIntensity.length - 1; i >= 0; i--) {
      if (/^\d+$/.test(dataLightIntensity[i].field1)) {
        res = dataLightIntensity[i];
        i = -1;
      }
    }
    lightIntensity.innerHTML = res?.field1 + " Lux" || 30 + " Lux";
  } catch (err) {
    console.log("err", err);
  }
};

renderTemp();
renderAirHumidity();
renderSoilMoisture();
renderLightIntensity();

setInterval(() => {
  renderTemp();
  renderAirHumidity();
  renderSoilMoisture();
  renderLightIntensity();
}, 2000);

const changeFanState = async (input) => {
  try {
    const response = await fetch(URL_FAN, {
      method: "post",
      body: {
        state: input,
      },
    });
    console.log("Completed!", response);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const changeWaterState = async (input) => {
  try {
    const response = await fetch(URL_WATER_PUMP, {
      method: "post",
      body: {
        state: input,
      },
    });
    console.log("Completed!", response);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const changeLightState = async (input) => {
  try {
    const response = await fetch(URL_LIGHT, {
      method: "post",
      body: {
        state: input,
      },
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
