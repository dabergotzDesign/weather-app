window.addEventListener("load", function() {
  let long;
  let lat;
  let tempDescription = document.querySelector(".writtenWeather");
  let tempDegree = document.querySelector(".temperature");
  let locTimezone = document.querySelector(".location");
  let tempUnit = document.querySelector(".weather span");
  let switchButton = document.querySelector(".toggle");
  let wind = document.querySelector(".wind span");
  let humid = document.querySelector(".humidity span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/0dbeb5fc4447e6b6b19af35e543104a3/${lat},${long}`;

      fetch(api)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          const {
            temperature,
            summary,
            icon,
            windSpeed,
            humidity
          } = data.currently;
          //-------------Set Weather Info-------------------------

          tempDegree.textContent = `${temperature.toFixed(1)}`;
          tempDescription.textContent = summary;
          locTimezone.textContent = data.timezone;
          wind.textContent = windSpeed;
          humid.textContent = humidity;

          //Set Icon for current weather
          setIcons(icon, document.querySelector(".icon"));

          //Fahrenheit to Celsius
          let celsius = (temperature - 32) * (5 / 9);

          switchButton.addEventListener("change", function() {
            if (
              tempUnit.textContent === " °F" &&
              switchButton.checked === true
            ) {
              tempUnit.innerHTML = " °C";

              tempDegree.innerHTML = celsius.toFixed(1);
            } else {
              tempUnit.innerHTML = " °F";
              tempDegree.innerHTML = temperature.toFixed(1);
            }
          });

          //------------Weather forecast---------------------------

          //temperatures MIN
          for (let i = 0; i < data.daily.data.length; i++) {
            //console.log(data.daily.data[i].temperatureMax);
            document.querySelector(
              ".minDay1"
            ).textContent = `${data.daily.data[0].temperatureMin} °F`;
            document.querySelector(
              ".minDay2"
            ).textContent = `${data.daily.data[1].temperatureMin} °F`;
            document.querySelector(
              ".minDay3"
            ).textContent = `${data.daily.data[2].temperatureMin} °F`;
            document.querySelector(
              ".minDay4"
            ).textContent = `${data.daily.data[3].temperatureMin} °F`;
            document.querySelector(
              ".minDay5"
            ).textContent = `${data.daily.data[4].temperatureMin} °F`;
          }

          //temperatures MAX
          for (let i = 0; i < data.daily.data.length; i++) {
            //console.log(data.daily.data[i].temperatureMax);
            document.querySelector(
              ".maxDay1"
            ).textContent = `${data.daily.data[0].temperatureMax} °F`;
            document.querySelector(
              ".maxDay2"
            ).textContent = `${data.daily.data[1].temperatureMax} °F`;
            document.querySelector(
              ".maxDay3"
            ).textContent = `${data.daily.data[2].temperatureMax} °F`;
            document.querySelector(
              ".maxDay4"
            ).textContent = `${data.daily.data[3].temperatureMax} °F`;
            document.querySelector(
              ".maxDay5"
            ).textContent = `${data.daily.data[4].temperatureMax} °F`;
          }
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currrentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currrentIcon]);
  }
});

//--------------CLOCK-----------------
//Current time
const dateSection = async () => {
  let daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = new Date();
  let hour = new Date();

  function leadZero() {
    let minute = new Date();
    return (minute.getMinutes() < 10 ? "0" : "") + minute.getMinutes();
  }

  document.querySelector(".date").innerHTML = `${
    daysArr[day.getDay()]
  }, ${hour.getHours()}:${leadZero()}`;

  //Weather forecast days
  let daysNum = day.getDay() + 3;

  for (let i = 0; i < 6; i++) {
    //DAY1
    document.querySelector(".day1").textContent =
      daysArr[(daysNum + i) % daysArr.length];
    //DAY2
    document.querySelector(".day2").textContent =
      daysArr[(daysNum + i + 1) % daysArr.length];
    //DAY3
    document.querySelector(".day3").textContent =
      daysArr[(daysNum + i + 2) % daysArr.length];
    //DAY4
    document.querySelector(".day4").textContent =
      daysArr[(daysNum + i + 3) % daysArr.length];
    //DAY5
    document.querySelector(".day5").textContent =
      daysArr[(daysNum + i + 4) % daysArr.length];
  }
};

dateSection().then(res => {
  //console.log(res);
});
