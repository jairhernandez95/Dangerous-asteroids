let mainSection1 = document.getElementById("mainSection1");
let mainSection2 = document.getElementById("mainSection2");
let mainDivResults = document.getElementById("mainDivResults");

function searchAsteroids() 
{
    mainSection1.innerHTML = ``;
    let dateInput = document.getElementById("dateInput").value
    dateInput = dateInput.replace("/", "-");
    let config = {
    method: "get",
    url: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateInput}&end_date=${dateInput}&api_key=eehUavXZofKgxSW7ewrkWpqdQ7s0JsNI7Syryp8U`,
    headers: {}
  }
    axios(config).then(response => 
        {
            let objects = response.data.near_earth_objects[dateInput]
            console.log(objects)
        }).catch(error)
        {
            console.log(error);
        }
}