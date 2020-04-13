const searchHistory = JSON.parse(localStorage.getItem('history')) || []

// API Key = 665b850992606953bf787b4769dc8f55

// search for city using weather API (ajax call)

function apiCall(city){
    $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=665b850992606953bf787b4769dc8f55`,
    method: "GET"
}).then(function(response){
    console.log(response)
    $('#city-name').text(response.name);
    $('#weather-icon').attr("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`)
    $('#temp-data').text(`Temperature - ${response.main.temp}`);
    $('#hum-data').text(response.main.humidity);
    $('#wind-data').text(response.wind.speed);
    $('#uvi-data').text(response.sys.country);
    
})
}

function apiForecast(city){
    const date = new Date();
    const currentHour = date.getHours();
    const ahead = Math.round((24-currentHour)/3);
    $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=665b850992606953bf787b4769dc8f55`,
    method: "GET"
}).then(function(response){
    console.log(response)
    for(let i = ahead; i< response.list.length; i+=8){
        console.log(response.list[i])
    }
})
}


// <div class="col-md-2dot4">
// <div id="five-day-1" class="card bg-primary text-white mb-1">
//     <div class="card-body">
//         <h6></h6>
//         <img class="weather-icon" height="auto" width="auto">
//         <p class="temp-5 small"></p>
//         <p class="hum-5 small"></p>
//     </div>
// </div>
// </div>

// on click function event listener
// take in city input and use API to find info
$("#city-search").on("click", function(){
    var city = $(".form-control").val().trim();
    apiCall(city);
    apiForecast(city)
    if(!searchHistory.includes(city) && city.length){
         searchHistory.push(city);
    localStorage.setItem('history', JSON.stringify(searchHistory));
    renderBtn()
    }
})

$(document).on('click', '.border',function(){
    var city = $(this).text();
    console.log(city)
    if(city.length){
        apiForecast(city);
        apiCall(city)
    }
})

function renderBtn(){
    for(var i = 0; i< searchHistory.length; i++){
         $('#results').append(`<button class='border btn btn-danger' style='width:90%;margin:auto;'>${searchHistory[i]}</button>`)
    }
}

renderBtn()

// store search history below search bar

// display current weather in top section


// display 5 day weather forecast in bottom section 