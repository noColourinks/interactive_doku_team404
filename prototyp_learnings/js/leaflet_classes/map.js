import DotIcon from "./dotIcon.js";

export default class Map {
  constructor(mapid) {
    this.mapid = mapid;
    // L = library Leaflet; Box von Leaflet, um die eigenen Strecken abzubilden (ermöglicht Zoomen, sinnvolle Anzeige der Koordinaten auf der Karte)
    this.map;
    // maptiler Api wird hier verwendet; hier wird der Box gesagt, dass eine Karte angezeigt werden soll
    // L."Funktionen" kommen von der Library Leaflet; siehe https://leafletjs.com/examples/quick-start/
    this.tileLayer = L.tileLayer(
      "https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=oDMVjeHn0MSvjzCPq7Rv",
      {
        // im rechten Rand geben wir den Namen der maptiler Api an
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a></a>',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1,
      }
    );

    this.icons = {
      problem: new DotIcon({
        iconUrl: "assets/img/red_dot.png",
      }),
      start: new DotIcon({
        iconUrl: "assets/img/blue_dot.png",
      }),
    };
  }

  newMap(viewCoords, zoom) {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map(this.mapid).setView(
      [viewCoords[0].lat, viewCoords[0].lng],
      zoom
    );
    this.tileLayer.addTo(this.map);
  }
  //points = [[a,b],[a,b],[a,b],[a,b],[a,b],[a,b],[a,b],[a,b]]
  // zeichnet blaue Linie zwischen den Koordinaten
  addRoute(points) {
    L.polyline([points], { color: "rgba(15, 81, 89,0.7)" }).addTo(this.map);
  }
  addRoutePerLine(pointA, pointB) {
    L.polyline([pointA, pointB]).addTo(this.map);
  }

  // z.B. Start- & Endpunkt
  addMarker(coord, text, iconKey) {
    let marker = L.marker([coord.lat, coord.lng], {
      icon: this.icons[iconKey],
    }).addTo(this.map);
    marker.bindPopup(text);
    return marker;
  }

  // Problemsituationen; ourEventOptions: die Id des Problems
  addEventMarker(coord, text, iconKey, events, ourEventOptions) {
    let eventMarker = this.addMarker(coord, text, iconKey);
    eventMarker.ourEventOptions = ourEventOptions;
    eventMarker.on("click", () => {
      events(eventMarker.ourEventOptions);
    });
  }
  setView(point, zoom) {
    console.log(point, zoom);
    this.map.setView(point, zoom);
  }

  fitBounds(route) {
    this.map.fitBounds(getBounds(route));
  }
}

function getBounds(route) {
  let bounds = [
    [10000, 10000],
    [-10000, -10000],
  ];
  //[[lat klein, lng klein],[lat hoch, lng hoch]]
  route.forEach((point) => {
    if (point.lat < bounds[0][0]) {
      bounds[0][0] = point.lat;
    }
    if (point.lng < bounds[0][1]) {
      bounds[0][1] = point.lng;
    }
    if (point.lat > bounds[1][0]) {
      bounds[1][0] = point.lat;
    }
    if (point.lng > bounds[1][1]) {
      bounds[1][1] = point.lng;
    }
  });
  return bounds;
}
