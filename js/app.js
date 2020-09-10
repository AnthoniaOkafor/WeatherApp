const firstForm = document.querySelector(".first-form");
const apiKey = 'a33ec5059bb874db8076287c5a7a5819';




firstForm.addEventListener("submit", e => {
//firstForm.onsubmit= (e) => {
    e.preventDefault();
    
    //const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    
    let inputValue = document.querySelector(".location").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
    console.log(inputValue);
    let msg = document.querySelector(".msg");

    fetch(url)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(() => {
       // msg.innerHTML = "Please search for a valid city 😩";
       console.log('not working');
    });

    const {main, name, sys, weather} = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png}`;
    const apisection = document.querySelector(".api-section");
    const card = document.createElement("div");
    card.classList.add("city");
    const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
        </div>
        <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure>`;
    city.innerHTML = markup;
    apisection.appendChild(card);

    msg.textContent = "";
    form.reset();
    input.focus();
});