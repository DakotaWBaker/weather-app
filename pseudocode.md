## HTML ELEMENTS
---
* h1 weather app (init)
* search form  (init)
* button for search form (init)
* div container
    - div row
    - div col = 'city'
    - div row
    - div col = city value from api
* div container
    - div row
    - div col =  'temperature'
    - div row
    - div col = temp k value from api
    - div col = temp c value from api
    -div col = temp f value from api
* div container
    - div row
    - div col =  'condition'
    - div row
    - div col =condition value from api
* div container
    - div row
    - div col =  'Other Info'
    - div row
    - div col = image value from api

## VARIABLES
---
* state object
    - city:
    - temp
        * k:
        * f:
        * c:
    - condition: 
    -image: 

## FUNCTIONS
--- 
#### getData()
- aync function with click listener for submit from search form
- prevent default submit
- set variable for search field value
- await function use axios to call api
- template literal for api link
- wrap all in try and set a catch after to alert if invalid zip code
- call update state function and pass response and data values from api as parameters

#### updateState()
- city = data.name
- temp
    * k = data.main.temp 
    * f = data.main.temp (k-273.15) * 1.8 + 32)
    *c = data.main.temp (k-273.15)
- condition = data.weather [0].condition.main
- image: data.weather [0].icon
call update elements function 

#### updateElements()
- set city inner html to state.city
- set temp k inner html to state.temp.k
- set temp f inner html to state.temp.f
- set temp c inner html to state.temp.c
- set img src to state.image

#### getGeoLocation()
- event listener listening for click from location button
- use navigator.geolocation.getCurrentPosition((position) to get user location
- pass to a do something if works function (geo)
- pass parameters of position.coords.lat and position.coords.long to function

#### geo()
- catch latitude and longitude parameters
- call api with lat and long as peremeters of api and use template literal to pass lat and long perameters from geoLocation function 
- call updateState function and pass response and data as parameters

## Other pseudo
--- 
#### setting background image to change based on condition
- else if statements each one checking if data.weather[0].main is equal to possible conditions (Rain, Clouds, Clear, Thunderstorms, Drizzle)
- if true change background image to appropriate image
