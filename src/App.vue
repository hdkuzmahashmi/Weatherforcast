<template>
  <div id="app" :class="typeof  weather.avgtempdayone != 'undefined' && weather.avgtempdayone > 16 ?
  'warm' : ''">
  <main>
    <div class="search-box">
        <input 
        type="text" 
        class="search-bar" 
        placeholder="Search with the city name or zip code..."
        v-model="query"
        @keypress="fetchweather"
        />
        
    </div>

<div class="popup-div"><button id="openPopupOne" @click="historyweather" class="main-button"></button></div>

    <div class="weather-wrap" v-if="typeof weather.avgtempdayone != 'undefined'">
      <div class="location-box">
         <div class="location">{{weather.cityname}} ,{{weather.countryname}} </div>
         <div class="date"> {{dateBuilder()}}</div>
      </div>

      <div class="weather-box">
         <div class="temp">{{weather.avgtempdayone}}°c</div>
      </div>



<!-- avg temp ,wind and humidity boxes -->

<div class="container">
<div class="week-container">
<ul class="week-list">
<li class=""><i class="day-icon" data-feather="sun"></i><span class="day-name">{{weather.daytwo}}</span><span class="day-temp">{{weather.avgtempdaytwo}}°C</span></li>
<li><i class="day-icon" data-feather="cloud"></i><span class="day-name">{{weather.daythree}}</span><span class="day-temp">{{weather.avgtempdaythree}}°C</span></li>
<li><i class="day-icon" data-feather="cloud-snow"></i><span class="day-name">{{weather.dayfour}}</span><span class="day-temp">{{weather.avgtempdayfour}}°C</span></li>
<li><i class="day-icon" data-feather="cloud-rain"></i><span class="day-name">{{weather.dayfive}}</span><span class="day-temp">{{weather.avgtempdayfive}}°C</span></li>
</ul>
<div class="mainseg">
<div class="info">
<div class="four wide column">
<div class="weather-container"><i class="weather-icon" data-feather="sun"></i>
<h3 class="weather-desc">wind</h3>
<h1 class="weather-temp">{{weather.winddayone}} <span class="weather-desc">km/h</span></h1>
</div>
<div class="compass">
<img class="arrow" src="https://local-weather-app.netlify.com/images/arrow.svg" alt="arrow">
<img class="disc" src="https://local-weather-app.netlify.com/images/disc.svg" alt="disc">
</div>
</div>
</div>
</div>
<div class="info1">
<div class="four wide column">
<div class="weather-container"><i class="weather-icon" data-feather="sun"></i>
<h3 class="weather-desc">Humidity</h3>
<h1 class="weather-temp">{{weather.humiditydayone}} <span class="weather-desc">%</span></h1>
</div>
<div class="dis">
     
</div>
</div>
</div>
</div>

</div>
<!-- end boxes -->

  </div>
  </main>

<!-- Popup -->
<div class="overlay"></div>
<div class="popup one">
  <ul class="week-list-popup">
  <li class=""><i class="day-icon" data-feather="sun"></i><span  class="day-name">Date</span><span class="day-temp">{{historyweather("valdate")}}</span></li>
    <li class=""><i class="day-icon" data-feather="sun"></i><span  class="day-name">City</span><span class="day-temp">{{historyweather("valcity")}}</span></li>
    <li><i class="day-icon" data-feather="cloud"></i><span class="day-name">Temp</span><span class="day-temp">{{historyweather("valtemp")}}°C</span></li>
    <li><i class="day-icon" data-feather="cloud-snow"></i><span class="day-name">Wind</span><span class="day-temp">{{historyweather("valwind")}}</span></li>
    <li><i class="day-icon" data-feather="cloud-rain"></i><span class="day-name">Humidity</span><span class="day-temp">{{historyweather("valhumidity")}}</span></li>
    </ul>
   <ul>
      <li><button id="closePopUpOne">Close</button></li>
      
   </ul>
</div>
<!-- Popup -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        
        url_base:'https://localhost:44349/api/weatherforecast/', 
        query: '',
        weather: {}
    }
  },
  methods:
  {
        
    fetchweather(e)
    {
      if(e.key=="Enter")
      {
        var url="";
        var srctxt=`${this.query}`;

        if(isNaN(srctxt))
        url=`${this.url_base}city?name=${this.query}`;
        else
        url=`${this.url_base}zipcodes?code=${this.query}`;

        fetch(url)
        .then(res=> {
          if(res != null)
          return res.json();
        })
        .then(this.setResults)
        .catch((error) => {
          if(String(error) === "TypeError: Failed to fetch")
            alert("Api is not accessible");
          else
            alert("errorr "+ error);
          console.log('Error:', error);
        });
        
      }
    },
    setResults(results)
    {
      if(results!= null)
      {
      this.weather=results;
      if(this.weather.cityname == null)
      {
        alert("Only German cities are allowed"); 
        }
        else 
        {
                let d = new Date();
                localStorage.setItem("keycityname", this.weather.cityname);
                localStorage.setItem("keyavetempdayone", this.weather.avgtempdayone);
                localStorage.setItem("keywinddayone", this.weather.winddayone);
                localStorage.setItem("keyhumiditydayone", this.weather.humiditydayone);
                localStorage.setItem("keydate", d.getDate());
      }
      }
    },
    dateBuilder()
    {
      let d = new Date();
      let months =["January","February","March","April","May","June",
      "July","August","September","October","November","December"];
      let days =["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      
      return `${day} ${date} ${month} ${year}`;
    },
    historyweather(val)
    {
     var city= localStorage.getItem("keycityname");
     var temp= localStorage.getItem("keyavetempdayone");
     var wind= localStorage.getItem("keywinddayone");
     var humidity=localStorage.getItem("keyhumiditydayone");
     var date=localStorage.getItem("keydate");

      if(val==="valcity")
      return `${city}`;
      else if(val==="valtemp")
      return `${temp}`;
      else if(val==="valwind")
      return `${wind}`;
      else if(val==="valhumidity")
      return `${humidity}`;
      else if(val==="valdate")
      return `${date}`;




    }
  }
}
</script>

<style>
 #app{
	background-image:url('./assets/main.jpg');  
	background-size: cover;
	background-position: bottom;
	transition: 0.4s;
  }
  #app.warm
  {
	background-image: url('./assets/summer.jpg');
  }
</style>
