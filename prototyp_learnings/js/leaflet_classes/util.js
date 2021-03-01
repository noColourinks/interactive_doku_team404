export default class Util {
  // static ist nicht veränderbar; man kann nur noch static-Funktionen in die Klasse einbauen; constructor kann dann nicht mehr mitgegeben werden
  // Funktion wandelt Koordinaten (die einzelnen Array-Elemente) in Objekte um; die Latitude und longitude haben
  static convertPoints(coords) {
    let points = [];

    coords.forEach((element) => {
      points.push({ lat: element[1], lng: element[0] });
    });
    return points;
  }
}
