const container = document.getElementById("wrap");
//header
const header = document.createElement("h1");
header.innerHTML = "Weather App";
container.appendChild(header);
//form
const searchForm = document.createElement("form");
const formDiv = document.createElement('div');
formDiv.classList.add('formDiv');
const zip = document.createElement("input");
formDiv.appendChild(zip);
zip.setAttribute("type", "text");
zip.setAttribute("placeholder", "Zip Code");
zip.setAttribute("name", "query");
//button
let btn = document.createElement("input");
btn.setAttribute("type", "submit");
btn.setAttribute("value", "Get Weather");
//append all
searchForm.append(zip);
searchForm.append(btn);
formDiv.appendChild(searchForm);
container.appendChild(formDiv);
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

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const inputValue = searchForm.elements.query.value;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?zip=${inputValue},us&appid=1a925fe26c48d00ee3d76449f6a4a611`
  );
  updateState(response.data);
  console.log(response.data);
  // } catch {
  //   alert("enter valid zip");
  // }
  searchForm.elements.query.value = "";
});

function updateState(data) {
  state.city = data.name;
  state.condition = data.weather[0].description;
  state.temp.k = Math.round(data.main.temp) + " k";
  state.temp.f = Math.round((data.main.temp - 273.15) * 1.8 + 32) + " f";
  state.temp.c = Math.round(data.main.temp - 273.15) + " c";
  state.image = data.weather[0].icon;
  createElements();
}

function createElements() {
  //CITY
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
  const city = document.createElement("div");
  city.setAttribute("class", "col");
  city.innerHTML = state.city;
  secondRow.appendChild(city);
  //TEMPERATURE
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
  const temperature = document.createElement("div");
  temperature.setAttribute("class", "col");
  temperature.innerHTML = state.temp.k;
  tempRow2.appendChild(temperature);
  //f col
  let fCol = document.createElement("div");
  fCol.setAttribute("class", "col");
  fCol.innerHTML = state.temp.f;
  tempRow2.appendChild(fCol);
  //celcius col
  let cCol = document.createElement("div");
  cCol.setAttribute("class", "col");
  cCol.innerHTML = state.temp.c;
  tempRow2.appendChild(cCol);

  //CONDITIONS
  const condContainer = document.createElement("div");
  condContainer.setAttribute("class", "container");
  container.appendChild(condContainer);
  const condRow = document.createElement("div");
  condRow.innerHTML = "Condition";
  condRow.classList.add("row", "header");
  condContainer.appendChild(condRow);
  const condRow2 = document.createElement("div");
  condRow2.setAttribute("class", "row");
  condContainer.appendChild(condRow2);
  const condition = document.createElement("div");
  condition.setAttribute("class", "col");
  condition.innerHTML = state.condition;
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
  image.src = `https://openweathermap.org/img/w/${state.image}.png`;
  imgRow2.appendChild(image);
}
