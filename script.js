const cities = [
    { 
        city: "New York", 
        offset: -4,
        image: new Image(),
        loadImage: function() {
            this.image.src = this.previewImageURL;
        },
        previewImageURL: "images/nyc.png", 
    },
    { city: "Paris", offset: 1, image: new Image(), loadImage: function () { this.image.src = this.previewImageURL }, previewImageURL: "images/paris.png" },
    { city: "London", offset: 1, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/london.png" },
    { city: "Berlin", offset: 1, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/berlin.png" },
    { city: "Los Angeles", offset: -8, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/losangeles.png" },
    { city: "Istanbul", offset: 3, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/istanbul.png" },
    { city: "Sydney", offset: 11, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/sydney.png" },
    { city: "Mexico City", offset: -6, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/mexico-city.png" },
    { city: "Chicago", offset: -6, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/chicago.png" },
    { city: "Honolulu", offset: -10, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/honolulu.png" },
    { city: "Cape Town", offset: 1, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/cape-town.png" },
    { city: "Jakarta", offset: 7, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/jakarta.png" },
    { city: "Beijing", offset: 8, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/beijing.png" },
    { city: "Singapore", offset: 8, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/singapore.png" },
    { city: "Dubai", offset: 4, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/dubai.png" },
    { city: "New Dehli", offset: 5.5, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/new-dehli.png" },
    { city: "Rome", offset: 1, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/rome.png" },
    { city: "Tokyo", offset: 9, image: new Image(), loadImage: function() { this.image.src = this.previewImageURL }, previewImageURL: "images/tokyo.png" },
];

function displayTime(city, offset) {
    const now = new Date();
    const localTime = now.getTime();
    const localOffset = now.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const targetTime = utc + (3600000 * offset);
    const targetDate = new Date(targetTime);

    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    const seconds = targetDate.getSeconds().toString().padStart(2, '0');

    if (hours > 12) {
        const pmHours = hours - 12;
        const timeString = `${pmHours}:${minutes}:${seconds} PM`;
        return `${timeString}`;
    } else {
        const amHours = hours;
        const timeString = `${amHours}:${minutes}:${seconds} AM`;
        return `${timeString}`;
    }
}

function updateClocks() {
    const clocksContainer = document.getElementById("container");

    clocksContainer.innerHTML = '';

    cities.forEach(city => {
        const clockDiv = document.createElement('div');
        clockDiv.classList.add('clock');
        const clockDisplayText = displayTime(city.city, city.offset);
        clockDiv.innerHTML = `
            <div class="clock-text" id="clockDisplayText">
                <p class="offset">${city.offset} hrs</p>
                <p class="city">${city.city}</p>
                <p class="time">${displayTime(city.city, city.offset)}</p>
            </div>
            <div class="city-img-wrap">
                <img src=${city.previewImageURL} alt="Illustration of ${city.city}" class="city-img">
            </div>
        `

        if (city.offset > 1) {
            clockDiv.innerHTML = `
            <div class="clock-text" id="clockDisplayText">
            <p class="offset">+${city.offset} hrs</p>
            <p class="city">${city.city}</p>
            <p class="time">${displayTime(city.city, city.offset)}</p>
        </div>
        <div class="city-img-wrap">
            <img src=${city.previewImageURL} alt="Illustration of ${city.city}" class="city-img">
        </div>
            `
        }

        if (city.offset === 1) {
            clockDiv.innerHTML = `
            <div class="clock-text" id="clockDisplayText">
            <p class="offset">+${city.offset} hr</p>
            <p class="city">${city.city}</p>
            <p class="time">${displayTime(city.city, city.offset)}</p>
        </div>
        <div class="city-img-wrap">
            <img src=${city.previewImageURL} alt="Illustration of ${city.city}" class="city-img">
        </div>
            `
        }

        clocksContainer.appendChild(clockDiv);
    });
};

updateClocks();
setInterval(updateClocks, 1000);

function sortOrder() {
    const sortOptionsContainer = document.getElementById("sort-options");

    const sortButtonsHTML = '<h1>Global Clock</h1><div class="btn-grp"><button id="default-btn" class="default-btn">Back to default order</button><button id="ascending-btn" class="sort-btn inactive-btn">Ascending <img class="btn-icon" src="images/ascending.png"></button><button id="descending-btn" class="sort-btn inactive-btn">Descending <img class="btn-icon" src="images/descending.png"></button></div>';
    sortOptionsContainer.innerHTML = sortButtonsHTML;

    function sortAscending() {
        cities.sort((a, b) => a.offset - b.offset);
        updateClocks();
    };

    function sortDescending() {
        cities.sort((a, b) => b.offset - a.offset);
        updateClocks();
    }

    const ascendingBtn = document.getElementById("ascending-btn");
    const descendingBtn = document.getElementById("descending-btn");
    const defaultOrderBtn = document.getElementById("default-btn");
    defaultOrderBtn.style.display = 'none';

    ascendingBtn.addEventListener('click', function() {
        sortAscending();
        defaultOrderBtn.style.display = 'block';
    });

    descendingBtn.addEventListener('click', function() {
        sortDescending();
        defaultOrderBtn.style.display = 'block';
    });

    defaultOrderBtn.addEventListener('click', function() {
        revertToDefaultOrder();
    })
}

sortOrder();

function revertToDefaultOrder() {
    const defaultCitiesOrder = [
        "New York",
        "Paris",
        "London",
        "Berlin",
        "Los Angeles",
        "Istanbul",
        "Sydney",
        "Mexico City",
        "Chicago",
        "Honolulu",
        "Cape Town",
        "Jakarta",
        "Beijing",
        "Singapore",
        "Dubai",
        "New Dehli",
        "Rome",
        "Tokyo"
    ];

    cities.sort((a, b) => {
        return defaultCitiesOrder.indexOf(a.city) - defaultCitiesOrder.indexOf(b.city);
    });

    const defaultOrderBtn = document.getElementById("default-btn");
    defaultOrderBtn.style.display = 'none';

    updateClocks();
}