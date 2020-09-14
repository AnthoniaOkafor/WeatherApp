const firstForm = document.querySelector(".first-form");
const apiKey = 'a33ec5059bb874db8076287c5a7a5819';
const apisection = document.querySelector(".api-section");
const form = document.querySelector(".first-form");


firstForm.addEventListener("submit", e => {
//firstForm.onsubmit= (e) => {
    e.preventDefault();
    
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    
    let inputValue = document.querySelector(".location").value;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;
    console.log(inputValue);
    let msg = document.querySelector(".msg");

    //fetching goes here
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const {main, name, sys, weather} = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        //const icon = 'https://openweathermap.org/img/wn/' + weather[0]["icon"] + '@2x.png';
        
        
        const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup> | ${Math.round((main.temp - 32) * (5/9))} <sup>°C</sup>
            </div>
            <figure>
                <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
            <div class="details">
            </div>`;

        apisection.innerHTML = markup;

        //localstorage starts here
        const key = inputValue;
        const value = apisection.innerHTML;

        if (key && value) {
            localStorage.setItem(key, value);
        }  
        
    })

    .catch(() => {

        const key = inputValue;

        if (key in localStorage) {
            apisection.innerHTML = localStorage.getItem(key)
        }
        else {
            msg.innerHTML = "Please search for a valid city or connect to the internet 😩";
        }

    });



    msg.textContent = "";
    apisection.innerHTML = "";
    form.reset();
    //input.focus();
});