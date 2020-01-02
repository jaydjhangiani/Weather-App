//import { isContext } from "vm";

window.addEventListener('load', ()=> {
    let long;
    let lat;                                            
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`

            const api = `${proxy}https://api.darksky.net/forecast/c3ae6117be2fe2b851d243e68d1f88b5/${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature,summary,icon} = data.currently;
                //set DOM elements from api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;         
                locationTimezone.textContent = data.timezone;  
                setIcons(icon, document.querySelector(".icon"))     

                //change temp to celcius
                
                let celcius = (temperature - 32) * (5/9);

                temperatureSection.addEventListener('click',() =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    }
                    else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });

            });
       
        });
        
    }
    else{
        h1.textContent = "This isnt working as your browser doesnt support the function or you hva edeclined to share location"
    }

    function setIcons(icon,iconId){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }

});

//#leftsidebar {width: 200px; float: left;}
//#main {margin-left: 216px;}