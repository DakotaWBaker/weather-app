const container = document.getElementById("wrap");
//header
const header = document.createElement("h1");
header.innerHTML = "Weather App";
container.appendChild(header);
//form
const searchForm = document.createElement("form");
const formDiv = document.createElement("div");
formDiv.classList.add("formDiv");
const zip = document.createElement("input");
formDiv.appendChild(zip);
zip.setAttribute("type", "text");
zip.setAttribute("placeholder", "Zip Code");
zip.setAttribute("name", "query");
//button
let btn = document.createElement("input");
btn.setAttribute("type", "submit");
btn.setAttribute("value", "Get Weather");
btn.setAttribute("class", "btn");
const locationButton = document.createElement("button");
locationButton.setAttribute("class", "bi bi-geo-alt-fill btn btn-success");
locationButton.setAttribute("id", "location");
container.appendChild(locationButton);

//append all
searchForm.append(zip);
searchForm.append(btn);
formDiv.appendChild(searchForm);
container.appendChild(formDiv);

const cityContainer = document.createElement("div");
cityContainer.setAttribute("class", "container");
container.appendChild(cityContainer);
const cityRow = document.createElement("div");
cityRow.innerHTML = "City";
cityRow.classList.add("row", "header");
cityContainer.appendChild(cityRow);
const secondRow = document.createElement("div");
secondRow.setAttribute("class", "row");
cityContainer.appendChild(secondRow);
let city = document.createElement("div");
city.setAttribute("class", "col");
secondRow.appendChild(city);

const tempContainer = document.createElement("div");
tempContainer.setAttribute("class", "container");
container.appendChild(tempContainer);
const tempRow = document.createElement("div");
tempRow.innerHTML = "Temperature";
tempRow.classList.add("row", "header");
tempContainer.appendChild(tempRow);
const tempRow2 = document.createElement("div");
tempRow2.setAttribute("class", "row");
tempContainer.appendChild(tempRow2);
let temperature = document.createElement("div");
temperature.setAttribute("class", "col");
tempRow2.appendChild(temperature);
let fCol = document.createElement("div");
fCol.setAttribute("class", "col");
tempRow2.appendChild(fCol);
let cCol = document.createElement("div");
cCol.setAttribute("class", "col");
tempRow2.appendChild(cCol);
//CONDITIONS
const condContainer = document.createElement("div");
condContainer.setAttribute("class", "container");
container.appendChild(condContainer);
const condRow = document.createElement("div");
condRow.classList.add("row", "header");
condRow.innerHTML = "Condition";
condContainer.appendChild(condRow);
const condRow2 = document.createElement("div");
condRow2.setAttribute("class", "row");
condContainer.appendChild(condRow2);
const condition = document.createElement("div");
condition.setAttribute("class", "col");
condRow2.appendChild(condition);
//IMAGE
const imgContainer = document.createElement("div");
imgContainer.setAttribute("class", "container");
container.appendChild(imgContainer);
const imgRow = document.createElement("div");
imgRow.innerHTML = "Other Info";
imgRow.classList.add("row", "header");
imgContainer.appendChild(imgRow);
const imgRow2 = document.createElement("div");
imgRow2.setAttribute("class", "row");
imgContainer.appendChild(imgRow2);
const image = document.createElement("img");
image.setAttribute("class", "col");
image.setAttribute("id", "image");
imgRow2.appendChild(image);
//state object
let state = {
  city: "",
  temp: {
    k: "",
    f: "",
    c: "",
  },
  condition: "",
  image: "",
};

if (localStorage !== null) {
  updateElements()
}
//function for getting geolocation from user
locationButton.addEventListener("click", function geoLocation() {  //listening for click on location button
  navigator.geolocation.getCurrentPosition((position) => {
    geo(position.coords.latitude, position.coords.longitude); //passing lat and long into geo function
  });
});

//function for calling api with lat and long. catching params lat and long
async function geo(latitude, longitude) {
  window.localStorage.removeItem('newState')
  const resp = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1a925fe26c48d00ee3d76449f6a4a611` //call api putting users lat and long in
  );
  updateState(resp.data); //calling update state function and sending resp and data from api as params
  // console.log(resp.data);
}

//function for calling api. event listener on search form listening for submit
searchForm.addEventListener("submit", async function (e) {
  e.preventDefault(); //preventing default form submission
  try {
    const inputValue = searchForm.elements.query.value;  //getting values from search form
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${inputValue},us&appid=1a925fe26c48d00ee3d76449f6a4a611` //calling api using input value as zip
    );
    updateState(response.data); //calling update state function passing response and data as parameters
    console.log(response.data);
  } catch {
    alert("enter valid zip"); //alert if api call fails bc user enter invalid zip
  }
  searchForm.elements.query.value = ""; //clearing search form after user submits zip code
});
//function to update the state object with new values from api
function updateState(data) {
  state.city = data.name;
  state.condition = data.weather[0].description;
  state.temp.k = Math.round(data.main.temp) + " k";
  state.temp.f = Math.round((data.main.temp - 273.15) * 1.8 + 32) + " f";
  state.temp.c = Math.round(data.main.temp - 273.15) + " c";
  state.image = data.weather[0].icon;
  //changing background images based on weather condition
  if (data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle") {
    document.body.style.backgroundImage = "url('images/rain.png')";
  } else if (data.weather[0].main === "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  } else if (data.weather[0].main === "Clouds") {
    document.body.style.backgroundImage = "url('images/cloudy1.jpg";
  } else {
    console.log(false);
  }
  window.localStorage.setItem('newState', JSON.stringify(state));
  updateElements(); //calling update elements function
}
//updating html with new state object values
function updateElements() {
  let storage = JSON.parse(window.localStorage.getItem('newState'));
  console.log(storage)
  city.innerHTML = storage.city
  temperature.innerHTML = storage.temp.k;
  fCol.innerHTML = storage.temp.f;
  cCol.innerHTML = storage.temp.c;
  condition.innerHTML = storage.condition;
  image.src = `https://openweathermap.org/img/w/${storage.image}.png`;
  
}
