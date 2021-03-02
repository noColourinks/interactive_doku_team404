// Klasse von der selbstgeschriebenen Karten
import Map from "../leaflet_classes/map.js";

let overviewMap = new Map("routen_map", [{ lat: 49, lng: 8 }], 15);
// overviewMap.addRoute(newCoords);
// overviewMap.addMarker(newCoords[0], "Start");
// overviewMap.addMarker(newCoords[newCoords.length - 1], "End");
// overviewMap.addEventMarker(newCoords[200], "Problem 5", switchSite, {
//   id: 5,
// });

// Seite mit Situationswerten von der jeweiligen Problemstelle öffnet sich
function switchSite(options) {
  console.log(options.id);
}

function getRideData(id) {
  fetch("http://localhost:3000/car_rides/" + id).then((res) => {
    // wandelt die Response Daten in ein Javascript objekt um.
    res.json().then((data) => {
      console.log(data);
      const track = parseJSONinArray(data.data[0].gps_track);
      console.log(track);
      for (let i = 1; i < track.length; i++) {
        overviewMap.addRoutePerLine(track[i], track[i - 1]);
      }
    });
  });
}

getRideData(1);
getProblems(1);
function getProblems(ride_id) {
  fetch("http://localhost:3000/situations/" + ride_id).then((res) => {
    // wandelt die Response Daten in ein Javascript objekt um.
    res.json().then((data) => {
      data.data.forEach((element) => {
        console.log(element);
        overviewMap.addMarker(
          { lat: element.latitude, lng: element.longitude },
          element.situation_tag
        );
      });
    });
  });
}

// Wandelt ein json string in Array um. (Im string der Db sollte immer ein JSON string mit dem Feld 'array' liegen, welches das eigentliche array enthält).
function parseJSONinArray(json) {
  return JSON.parse(json).array;
}
