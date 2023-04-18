let now = new Date();
let date = now.getDate();
let time = now.getHours();
let mins = now.getMinutes();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let cur = document.querySelector(".cur_date");
if (mins < 10) {
  cur.innerHTML = days[day] + " " + time + ":0" + mins;
} else {
  cur.innerHTML = days[day] + " " + time + ":" + mins;
}

let form_nm = document.querySelector("form");
form_nm.addEventListener("submit", submit_form);

function submit_form(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let city_val = city.value;
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let unit = "metric";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city_val}&appid=${apiKey}&units=${unit}`;
  axios.get(apiurl).then(show_temperature);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  axios.get(apiurl).then(show_temperature);
}

function call_cur() {
  let city_txt = document.querySelector("#city");
  city_txt.value = "";
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function show_temperature(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let city_val = response.data.name;
  let humidity_val = response.data.main.humidity;
  let wind_val = Math.round(response.data.wind.speed);
  let description_val = response.data.weather[0].description;
  let display_pic_val = response.data.weather[0].icon;
  let degree = document.querySelector(".degree");
  let degree_hid = document.querySelector(".degree_hid");
  let city_name = document.querySelector("h3");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let description = document.querySelector(".description");
  let display_pic = document.querySelector(".display_pic");
  city_name.innerHTML = city_val;
  degree.innerHTML = temp;
  humidity.innerHTML = humidity_val;
  wind.innerHTML = wind_val;
  description.innerHTML = description_val;
  degree_hid.value = temp;
  display_pic.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${display_pic_val}@2x.png`
  );
}

let cur_location = document.querySelector("#current");
cur_location.addEventListener("click", call_cur);

let centi = document.querySelector(".centi");
centi.addEventListener("mouseover", check_show);
centi.addEventListener("mouseout", check_hide);
centi.addEventListener(
  "click",
  function () {
    let D = document.querySelector(".degree_hid").value;
    to_centi(D);
  },
  false
);

let far = document.querySelector(".far");
far.addEventListener("mouseover", check_show);
far.addEventListener("mouseout", check_hide);
far.addEventListener(
  "click",
  function () {
    let D = document.querySelector(".degree_hid").value;
    to_far(D);
  },
  false
);

function to_centi(D) {
  if (D === NaN || D === "") {
    D = 54;
  }
  let degree = document.querySelector(".degree");
  let centi = document.querySelector(".centi");
  let far = document.querySelector(".far");
  let formula_C = Math.round((5 / 9) * (D - 32));
  degree.innerHTML = formula_C;
  centi.style.color = "black";
  far.style.color = "blue";
  centi.style.cursor = "default";
  far.style.cursor = "pointer";
}

function to_far(D) {
  if (D === NaN || D === "") {
    D = 12;
  }
  let degree = document.querySelector(".degree");
  let centi = document.querySelector(".centi");
  let far = document.querySelector(".far");
  let formula_F = Math.round((9 / 5) * D + 32);
  degree.innerHTML = formula_F;
  centi.style.color = "blue";
  far.style.color = "black";
  far.style.cursor = "default";
  centi.style.cursor = "pointer";
}

function check_show() {
  let centi = document.querySelector(".centi");
  let far = document.querySelector(".far");
  if (centi.style.color === "" || far.style.color === "") {
    centi.style.color = "black";
  }
  if (centi.style.color === "black") {
    centi.style.textDecoration = "none";
    far.style.textDecoration = "underline";
  } else {
    far.style.textDecoration = "none";
    centi.style.textDecoration = "underline";
  }
}

function check_hide() {
  far.style.textDecoration = "none";
  centi.style.textDecoration = "none";
}
