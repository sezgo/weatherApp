 window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        '.temperature-description'
    );
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let proxy = 'http://cors-anywhere.herokuapp.com/';
            proxy = "";
            const api = `https://api.darksky.net/forecast/6b4df6443e11843b161fc446a86ac317/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon} = data.currently;
                    //SET DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;
                    // formula for celsius
                    let celsius = (temperature - 32) * ( 5 /9 );
                    //set icons
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Fahreneit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
 });