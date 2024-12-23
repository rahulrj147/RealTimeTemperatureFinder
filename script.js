
let yourweather = document.querySelector(".yourWeather");
let searchweather = document.querySelector(".searchWeather");
let cityname = document.querySelector(".nameOfcity");
let weathertype = document.querySelector(".WeatherType");
let typeemoji = document.querySelector(".typeEmoji");
let realtemp = document.querySelector(".realTemp");
let windspeed = document.querySelector(".windspeeddata");
let humidity = document.querySelector(".humiditydata");
let clouds = document.querySelector(".cloudsdata");
let showcase = document.querySelector(".showcase");
let searchbox = document.querySelector(".searchBox");
let searchbutton = document.querySelector("[searchbutton]")
let inputcity = document.querySelector(".searchCity");
let loader = document.querySelector(".loader");
let API_KEY = "761d3f82b1a0d0f42a2a1fb4d4cf7162";
let currentTab = 0;
modifytab();
let langitute = 0;
let latitude = 0;

if(navigator.geolocation){
    
    navigator.geolocation.getCurrentPosition((position)=>{
        langitute = position.coords.longitude;
        latitude = position.coords.latitude;
        getCurrentDetails();
    });
}
async function UpdateAllDetails(data){
   try{
    let citynamefound =data?.name;
    let tempfound = data?.main?.temp;
    let humidityfound = data?.main?.humidity;
    let windspeedfound = data?.wind?.speed;
    let weatherfound = data?.weather[0]?.main;
    let typeemojifound = data?.weather[0]?.icon;
    let cloudfound = data?.clouds?.all;
    cityname.textContent = citynamefound;
    realtemp.textContent = `${(tempfound - 273.15).toFixed(2)} °C`;
    humidity.textContent = `${humidityfound}%`;
    windspeed.textContent = `${windspeedfound} m/s`;
    weathertype.textContent = weatherfound;
    clouds.textContent = `${cloudfound}%`;
    typeemoji.src = `http://openweathermap.org/img/wn/${typeemojifound}@2x.png`; 
    
   }catch(er){
    alert("please enter valid name");
    showcase.classList.remove("active");
    loader.classList.remove("active");
    
   }
    
}
async function getCurrentDetails(){
  try{
    loader.classList.add("active");
    let fetchcurrentdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${langitute}&appid=${API_KEY}`);
    let currentdata = await fetchcurrentdata.json();
    loader.classList.remove("active");
    UpdateAllDetails(currentdata);
  }catch(err){
      console.log("here it fails");
      
  }
}
async function getCityDetails(){
    loader.classList.add("active");

    let citys = await inputcity.value;
    try{
        let fetchcitydata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citys}&appid=${API_KEY}`);
        let citydata = await fetchcitydata.json();
    
        loader.classList.remove("active");
        UpdateAllDetails(citydata);
        showcase.classList.add("active");
    }catch(err){
        
    }
}
searchweather.addEventListener("click", ()=>{
    
    currentTab = 1;
    modifytab();

})
yourweather.addEventListener("click", ()=>{
    currentTab = 0;
    modifytab();
})
searchbutton.addEventListener("click",()=>{
    
    getCityDetails();
    inputcity.value = "";
})
function modifytab() {
    if (currentTab == 1) {
        
        searchbox.classList.add("active");
        showcase.classList.remove("active");
        console.log("searchbox active");
    } else {
        getCurrentDetails();
        showcase.classList.add("active");
        searchbox.classList.remove("active");
        console.log("showcase active");

    }
}

