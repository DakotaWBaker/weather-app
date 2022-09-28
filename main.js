const container = document.getElementById("wrap");
//header
const header = document.createElement("h1");
header.innerHTML = "Weather App";
container.appendChild(header);
//form
const searchForm = document.createElement("form");
//input field
const zip = document.createElement("input");
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
container.appendChild(searchForm);
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
  try {
    const inputValue = searchForm.elements.query.value;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${inputValue},us&appid=1a925fe26c48d00ee3d76449f6a4a611`);
    updateState(response.data);
    console.log(response.data)
  } catch {
    alert("enter valid zip");
  }
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
  const city = document.createElement("p");
  city.innerHTML = state.city;
  document.body.appendChild(city);

  const condition = document.createElement("p");
  condition.innerHTML = state.condition;
  document.body.appendChild(condition);

  const tempK = document.createElement("p");
  tempK.innerHTML = state.temp.k;
  document.body.appendChild(tempK);

  const tempF = document.createElement("p");
  tempF.innerHTML = state.temp.f;
  document.body.appendChild(tempF);

  const tempC = document.createElement("p");
  tempC.innerHTML = state.temp.c;
  document.body.appendChild(tempC);

  
  const img = document.createElement('img');
img.src = `http://openweathermap.org/img/w/${state.image}.png`
console.log(img)
document.body.append(img);

}

