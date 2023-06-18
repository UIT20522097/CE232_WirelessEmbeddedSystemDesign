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
    const url = `https://api.thingspeak.com/channels/2188986/fields/1.json?api_key=M79QI9F8V63EPJ35&results=10
      `;
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

renderTemp();
setInterval(() => {
  renderTemp();
}, 2000);

