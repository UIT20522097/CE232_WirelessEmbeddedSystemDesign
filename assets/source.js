const getTemp = async () => {
  try {
    const url = `https://api.thingspeak.com/channels/2188986/fields/1.json?api_key=M79QI9F8V63EPJ35&results=10
      `;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    return data.feeds;
  } catch (error) {
    console.log("error", error);
  }
};

const renderTemp = async () => {
  document.querySelector("#temp").value = "";

  try {
    const dataTemp = await getTemp();
    const temp = document.getElementById("temp");
    temp.innerHTML = dataTemp[dataTemp.length - 1]?.field1 + "&deg;C";

    const date = document.getElementById("date");
    date.innerHTML = new Date(
      Date.parse(dataTemp[dataTemp.length - 1]?.created_at)
    );
  } catch (err) {
    console.log("err", err);
  }
};

renderTemp();
setInterval(() => {
  renderTemp();
}, 1111);
