export default {
  getAllRidesFromUser,
  getRideData,
  getProblems,
  getAllProblems,
};

// Klasse von der selbstgeschriebenen Karten

// overviewMap.addRoute(newCoords);
// overviewMap.addMarker(newCoords[0], "Start");
// overviewMap.addMarker(newCoords[newCoords.length - 1], "End");
// overviewMap.addEventMarker(newCoords[200], "Problem 5", switchSite, {
//   id: 5,
// });

// Seite mit Situationswerten von der jeweiligen Problemstelle öffnet sich

function getRideData(id) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/car_rides/" + id).then((res) => {
      // wandelt die Response Daten in ein Javascript objekt um.
      res.json().then((data) => {
        resolve(data.data);
      });
    });
  });
}

//getRideData(1);
//getProblems(1);
function getProblems(ride_id) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/situations/" + ride_id).then((res) => {
      // wandelt die Response Daten in ein Javascript objekt um.
      res.json().then((data) => {
        resolve(data.data);
      });
    });
  });
}

//getAllRidesFromUser(1);
function getAllRidesFromUser(userId) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/car_rides/all/" + userId).then((res) => {
      // wandelt die Response Daten in ein Javascript objekt um.
      res.json().then((data) => {
        resolve(data.data);
      });
    });
  });
}

function getAllProblems(userId) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/situations/all/" + userId).then((res) => {
      // wandelt die Response Daten in ein Javascript objekt um.
      res.json().then((data) => {
        resolve(data.data);
      });
    });
  });
}
