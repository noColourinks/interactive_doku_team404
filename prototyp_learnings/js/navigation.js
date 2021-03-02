import dataControll from "./data_controll.js";
import Map from "./leaflet_classes/map.js";
import Ride from "./ride.js";
import Problems from "./problems.js";
let mySessionMap = new Map("my_way_map");
let myProblemMap = new Map("my_problem_map");

let current_section = "my_session";
let charts = {};

$(document).ready(function () {
  updateNavigation();
  triggerLoad(current_section, 0);
});
//$(".") -> Punkt steht für die Suche nach CSS-Klassen
function updateNavigation() {}

//Klick auf ein Navigationselement (z.B. Buttons, die die Seite wechseln)

function triggerLoad(section, params) {
  switch (section) {
    //my_session -> eine Fahrt
    case "my_session":
      mySessionMap.newMap([{ lat: 49.902803, lng: 8.858634 }], 20);
      mySessionMap.addMarker(
        { lat: 49.902803, lng: 8.858634 },
        "Unser Cammpus <3",
        "start"
      );
      console.log(dataControll);
      let ride = Ride;
      // dataControll.getRideData(params).then((ride) => {

      // generateRoute(mySessionMap, ride);
      generateRideMetaData(ride);

      //Straßentypen Chart
      let contextMySessionsInformation = $(
        "#chart_my_sessions_road_information"
      );
      let contextGradientInformation = contextMySessionsInformation[0].getContext(
        "2d"
      );
      let my_gradientInformation = contextGradientInformation.createLinearGradient(
        100,
        0,
        320,
        0
      );
      my_gradientInformation.addColorStop(0, "rgba(0, 255, 246, 0.1)");
      my_gradientInformation.addColorStop(1, "rgba(0, 255, 246, 1)");

      if (charts["chartMySessionsRoadInformation"])
        charts["chartMySessionsRoadInformation"].destroy();
      let chartData = countObjectForChart(JSON.parse(ride.road_types));
      let chartSessionsInfromation = drawHorizontalBarChart(
        contextMySessionsInformation,
        chartData,
        "Straßentypen",
        my_gradientInformation,
        "Wochen"
        // "rgba(15, 81, 89, 1)"
      );
      charts["chartMySessionsRoadInformation"] = chartSessionsInfromation;
      // });

      //Probleme

      let problems = Problems;
      // dataControll.getProblems(params).then((problems) => {
      //Kartenproblemmarker generieren.
      // generateProblems(mySessionMap, problems);

      //ProblemChart
      let contextMySessionsProblems = $("#chart_my_sessions_problems");
      let contextGradient = contextMySessionsProblems[0].getContext("2d");
      let my_gradient = contextGradient.createLinearGradient(100, 0, 320, 0);
      my_gradient.addColorStop(0, "rgba(0, 255, 246, 0.1)");
      my_gradient.addColorStop(1, "rgba(0, 255, 246, 1)");

      if (charts["chartSessionsProblems"])
        charts["chartSessionsProblems"].destroy();
      let chartSessionsProblems = drawHorizontalBarChart(
        contextMySessionsProblems,
        countArrayObjectForChart(problems, "situation_tag"),
        "Probleme",
        my_gradient,
        "Anzahl"
        // "rgba(15, 81, 89, 1)"
      );
      charts["chartSessionsProblems"] = chartSessionsProblems;
      // });
      break;
  }
}

function generateRoute(map, ride) {
  let route = parseJSONinArray(ride.gps_track);
  map.addRoute(route);
  map.addMarker(route[0], "Start", "start");
  map.addMarker(route[route.length - 1], "Ende", "start");
  // map.setView(route[0], 25);
  map.fitBounds(route);
  console.log(route);
}

// function generateProblems(map, problems) {
//   problems.forEach((problem) => {
//     map.addEventMarker(
//       { lat: problem.latitude, lng: problem.longitude },
//       problem.situation_tag,
//       "problem",
//       switchProblenSection,
//       { newSection: "my_problem", parameter: problem }
//     );
//   });
// }

// Hier gehts richtig ab :)

function generateWeatherHtml(ride) {
  let weatherIcon;
  switch (ride.weather_type) {
    case 0:
      weatherIcon = "sonnig";
      break;
    case 1:
      weatherIcon = "wolkig";
      break;
    case 2:
      weatherIcon = "regen";
      break;
    case 3:
      weatherIcon = "hagel";
      break;
    case 4:
      weatherIcon = "schnee";
      break;
    case 5:
      weatherIcon = "nebel";
      break;
    case 6:
      weatherIcon = "hurricane";
      break;
    case 7:
      weatherIcon = "eis";
      break;
    case 8:
      weatherIcon = "meteor";
      break;
    default:
      weatherIcon = "wolkig";
      break;
  }
  return `<div class="icon ${weatherIcon}"></div><p><span>${ride.temperature}°C</span></p>`;
}

function generateLightConditionHtml(ride) {
  let lightConditions_icon;
  let lightConditions_text;
  const x = lightConditions(
    TimeInMinutes(ride.start_time),
    TimeInMinutes(ride.end_time)
  );

  switch (x) {
    case x < 8:
      lightConditions_icon = "dämmerlicht";
      lightConditions_text = "Sichtverhältnisse: eingeschränkt";
    case x > 8 && x < 18:
      lightConditions_icon = "tageslicht";
      lightConditions_text = "Sichtverhältnisse: optimal";
    case x > 18 && x < 20:
      lightConditions_icon = "leichte_dunkelheit";
      lightConditions_text = "Sichtverhältnisse: eingeschränkt";
    case x > 20 && x < 8:
      lightConditions_icon = "starke_dunkelheit";
      lightConditions_text = "Sichtverhältnisse: schlecht";
      break;

    default:
      lightConditions_icon = "leichte_dunkelheit";
      lightConditions_text = "Sichtverhältnisse: schwierig";
  }
  return `<div class="icon ${lightConditions_icon}"></div>
<p><span>${lightConditions_text}</span></p>
`;
}
function generateRideMetaData(ride) {
  $("#session_time").html(
    `<p>${ride.start_time} bis ${ride.end_time} Uhr</p><p>Dauer: 112 Tage</p>
    `
  );

  $("#session_weather").html(generateWeatherHtml(ride));

  $("#session_light_conditions").html(generateLightConditionHtml(ride));
}

function TimeInMinutes(time) {
  let splitingTime = time.split(":");
  return parseInt(splitingTime[0]) * 60 + parseInt(splitingTime[1]);
}

function substractTime(start, end) {
  let diff = end - start;
  let hours = Math.floor(diff / 60);
  let minutes = diff % 60;
  if (minutes.length <= 1) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}
function substractDateFromDate(dateOne, dateTwo) {
  const date1 = new Date(dateOne);
  const date2 = new Date(dateTwo);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays);
  return diffDays;
}

function substractDate(date, sub) {
  let result = new Date(date);
  return result.setDate(result.getDate() - sub);
}

function lightConditions(start, end) {
  let diff = end - start;
  let hours = Math.floor(diff / 60);
  return hours;
}

function parseJSONinArray(json) {
  return JSON.parse(json).array;
}

function roundToNumber(value, offset, number) {
  return value + offset + (number - (value % number));
}

function countProblemsPerRide(data) {
  let dataArray = [];
  let result = { data: [], strings: [], highestValue: 0 };
  data.forEach((element) => {
    if (dataArray[element.ride_id] !== undefined) {
      dataArray[element.ride_id]++;
    } else {
      dataArray[element.ride_id] = 1;
    }
  });
  result.data = dataArray.filter((element) => {
    return element !== undefined;
  });
  result.data.forEach((element, index) => {
    result.strings.push("Fahrt " + (index + 1));
    if (element > result.highestValue) result.highestValue = element;
  });
  return result;
}

function getDataPerRide(rideArray, key) {
  let result = { data: [], strings: [], highestValue: 0 };
  let preResult = [];

  rideArray.forEach((element) => {
    preResult.push({ data: element[key], date: element.date });
  });

  let preResultSorted = preResult.sort(sortDateAsc);
  preResultSorted.forEach((element) => {
    result.data.push(element.data);
    result.strings.push("Fahrt: " + formatDateToString(element.date));
  });
  result.highestValue = preResultSorted[0].data;
  return result;
}

function sortDateAsc(a, b) {
  return new Date(a.date).valueOf() - new Date(b.date).valueOf();
}

function sortDateDesc(a, b) {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
}

function countArrayObjectForChart(dataObjectArray, field) {
  let countObject = [];
  let result = { data: [], strings: [], highestValue: 0 };
  dataObjectArray.forEach((element) => {
    let indexCountObject = indexObjectInArray(
      countObject,
      "tag",
      element[field]
    );
    if (indexCountObject >= 0) {
      countObject[indexCountObject].count++;
    } else {
      countObject.push({
        count: 1,
        tag: element[field],
      });
      console.log(countObject);
    }
  });
  let countObjectSorted = countObject.sort((a, b) => {
    return b.count - a.count;
  });
  countObjectSorted.forEach((element) => {
    result.data.push(element.count);
    result.strings.push(element.tag);
  });
  result.highestValue = countObjectSorted[0].count;
  return result;
}

function countObjectForChart(dataObject) {
  let countObject = [];
  let result = { data: [], strings: [], highestValue: 0 };
  Object.keys(dataObject).forEach((element) => {
    countObject.push({ count: dataObject[element], tag: element });
  });
  let countObjectSorted = countObject.sort((a, b) => {
    return b.count - a.count;
  });
  countObjectSorted.forEach((element) => {
    result.data.push(element.count);
    result.strings.push(element.tag);
  });
  result.highestValue = countObjectSorted[0].count;
  console.log(result);
  return result;
}

function indexObjectInArray(arrayWithObjects, key, value) {
  let index = -1;
  arrayWithObjects.forEach((element, i) => {
    if (element[key] === value) {
      index = i;
    }
  });
  return index;
}

function filterProblemsTroughDate(earliestDate, latestDate, problemRideArray) {
  let result = [];
  console.log(earliestDate);
  problemRideArray.forEach((element) => {
    let elementDate = new Date(element.date);
    if (
      elementDate.valueOf() > earliestDate.valueOf() &&
      elementDate.valueOf() < latestDate.valueOf()
    ) {
      result.push(element);
    }
  });
  return result;
}

function drawHorizontalBarChart(context, chartData, title, color, label) {
  let barChart = new Chart(context, {
    type: "horizontalBar",
    data: {
      labels: chartData.strings,
      datasets: [
        {
          label: label,
          data: chartData.data,
          backgroundColor: color,
          borderWidth: 0,
          fill: false,
        },
      ],
    },
    options: {
      layout: { padding: { right: 20 } },
      legend: false,
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "rgba(255,255,255,0.1)",
            },
            ticks: {
              fontColor: "#ffffff",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              color: "rgba(255,255,255,0.1)",
            },
            ticks: {
              display: false,
              fontColor: "#ffffff",
              beginAtZero: true,
              max: chartData.highestValue,
              stepSize: 5,
            },
          },
        ],
      },
    },
  });
  return barChart;
}

function formatDateToString(dateString) {
  let charakter = dateString.split("-");
  return `${charakter[2]}.${charakter[1]}.${charakter[0]}`;
}
