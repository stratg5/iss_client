// Initialize and add the map
function initMap() {
  setInterval(fetchMap, 5000);
}

function fetchMap( )
{
  httpGetAsync('http://api.open-notify.org/iss-now.json', updateMap);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateMap(res) {
  const resParsed = JSON.parse(res);
  const lat = resParsed.iss_position.latitude;
  const long = resParsed.iss_position.longitude;

  const iss = { lat: lat, lng: long };
  // The map, centered at iss location
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: iss,
  });
  // The marker, positioned at iss location
  const marker = new google.maps.Marker({
    position: iss,
    map: map,
  });
}