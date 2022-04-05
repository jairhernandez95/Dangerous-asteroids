let header = document.getElementById("header");
let main = document.getElementById("main");
let headerDivSearch = document.getElementById("headerDivSearch");
let mainDivResults = document.getElementById("mainDivResults");
let footer = document.getElementById("footer");
let auxiliarArray = [];

function searchAsteroids() 
{
    auxiliarArray = []
    let dateInput = document.getElementById("dateInput").value
    dateInput = dateInput.replace("/", "-");
    let config = {
    method: "get",
    url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateInput}&end_date=${dateInput}&api_key=eehUavXZofKgxSW7ewrkWpqdQ7s0JsNI7Syryp8U`,
    headers: {}
  }
    axios(config).then(response => 
        {
            let asteroids = response.data.near_earth_objects[dateInput];
            for(let i = 0; i < asteroids.length; i++)
            {
                auxiliarArray.push(asteroids[i]);
            }
            showAsteroids(auxiliarArray);
        })
}

function showAsteroids(array)
{
    headerDivSearch.setAttribute("class", "fixed-top");
    console.log(array);
    headerDivSearch.style.outline = "1px solid #CDCDCD"
    headerDivSearch.style.color = "black";
    headerDivSearch.style.backgroundColor= "white";
    console.log(array);
    let card = ``;
    for(let i = 0; i < array.length; i++)
    {

        let name = array[i].name;
        let closeApproachDate = array[i].close_approach_data[0].close_approach_date_full;
        closeApproachDate = closeApproachDate.slice(0,11);
        let closeApproachHour = array[i].close_approach_data[0].close_approach_date_full;
        closeApproachHour = closeApproachHour.slice(12,17);
        console.log(closeApproachHour);
        let relativeVelocity = parseFloat(array[i].close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2);
        let estimatedDiameterMetersMax =  array[i].estimated_diameter.meters.estimated_diameter_max.toFixed(2);
        let estimatedDiameterMetersMin =  array[i].estimated_diameter.meters.estimated_diameter_min.toFixed(2);
        // console.log(name);
        // console.log(closeApproachDate);
        // console.log(relativeVelocity);
        // console.log(estimatedDiameterMetersMax);
        // console.log(estimatedDiameterMetersMin);
        card += `
            <div class="card"  style="width: 18rem;">
                <div class="card-body">
                    <div class="titlesOfCard">
                        <h5>Name:</h5>
                        <h2 class="card-title">${name}</h2>
                        <!-- <h4 class="card-subtitle mb-2 text-muted">Close approach date: ${closeApproachDate}</h4> -->
                        <h4 class="card-subtitle mb-2 text-muted">Close approach hour: ${closeApproachHour}</h4>
                        <h4>Relative velocity: ${relativeVelocity} km/s</h4>
                        <h4>Estimated diameter: from ${estimatedDiameterMetersMin} meters to ${estimatedDiameterMetersMax} meters</h4>
                    </div>
                </div>
            </div>`;
    }
    mainDivResults.innerHTML = card;
}