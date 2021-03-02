// Klasse von der selbstgeschriebenen Karten
import Map from "./map.js";
// Koordinaten von einner Strecke
import coords from "../demo_data/coords.js";
// Klasse Util
import Util from "./util.js";
// um die Static-Funktion hier aufzurufen, muss man keine neue Instanz mit "new" erstellen
// let newCoords = Util.convertPoints(coords);

import newCoord from "../../gpxParser/demoRouten/erste-route.js";

let newCoords = newCoord;
let overviewMap = new Map("overviewMap", newCoords, 15);
overviewMap.addRoute(newCoords);
overviewMap.addMarker(newCoords[0], "Start");
overviewMap.addMarker(newCoords[newCoords.length - 1], "End");
overviewMap.addEventMarker(newCoords[200], "Problem 5", switchSite, {
  id: 5,
});

// Seite mit Situationswerten von der jeweiligen Problemstelle öffnet sich
function switchSite(options) {
  console.log(options.id);
}
