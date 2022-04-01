let header = document.getElementById("header");
let main = document.getElementById("main");
let mainDivSearch = document.getElementById("mainDivSearch");
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
    header.style.height = "min-content"
    console.log(array);
    mainDivSearch.setAttribute("class", "fixed-top");
    mainDivSearch.style.color = "black";
    mainDivSearch.style.backgroundColor= "white";
    console.log(array);
    let card = ``;
    for(let i = 0; i < array.length; i++)
    {
        let name = array[i].name;
        let closeApproachDate = array[i].close_approach_data[0].close_approach_date_full;
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
                        <h2 class="card-title">Name: ${name}</h2>
                        <h4 class="card-subtitle mb-2 text-muted">Close approach date: ${closeApproachDate}</h4>
                        <h4>Relative velocity: ${relativeVelocity} km/s</h4>
                        <h4>Estimated diameter: from ${estimatedDiameterMetersMin} meters to ${estimatedDiameterMetersMax} meters</h4>
                    </div>
                </div>
            </div>`;
    }
    mainDivResults.innerHTML = card;
}