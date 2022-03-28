let header = document.getElementById("header");
let main = document.getElementById("main");
let mainDivSearch = document.getElementById("mainDivSearch");
let mainDivResults = document.getElementById("mainDivResults");
let footer = document.getElementById("footer");
let auxiliarArray = [];

function searchAsteroids() 
{
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
    header.setAttribute("position", "fixed")
    console.log(array);
    for(let i = 0; i < array.length; i++)
    {
        let card = `${array[i].name}`;
        console.log(card);
    }
}