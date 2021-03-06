let galleryElementMargin = parseInt(
  $("#gallery").children().css("margin-right")
);
let galleryElementWidth = parseInt($("#gallery").children().css("width"));
let galleryNextStep = galleryElementMargin + galleryElementWidth;
let galleryOffsetX = 0;
const galleryLength = 7;
console.log(galleryNextStep);
let activeCarInformation = "";

let scrollTop = $(window).scrollTop();
let documentHeight = $(document).height();
let pageOffset = $(window).height() + 200;
let galleryIndex = 0;

function calcAnimationOnScrollProgress() {
  return (
    (100 / (documentHeight - pageOffset)) *
    ($(window).scrollTop() - pageOffset + $(window).height() / 2)
  );
}

function toNextGallery() {
  if (galleryIndex > galleryLength * -1 + 1) {
    galleryIndex--;
    updateGallery();
  }
}

function toLastGallery() {
  if (galleryIndex <= -1) {
    console.log(galleryIndex);
    galleryIndex++;
    updateGallery();
  }
}

function updateGallery() {
  $("#gallery").css("left", galleryOffsetX + galleryNextStep * galleryIndex);
}

function calcGalleryValues() {
  galleryElementMargin = parseInt($("#gallery").children().css("margin-right"));
  galleryElementWidth = parseInt($("#gallery").children().css("width"));
  galleryNextStep = galleryElementMargin + galleryElementWidth;
  galleryOffsetX = 0;
}

$(window).scroll(function () {
  if ($(this).scrollTop() >= pageOffset / 2) {
    $("#car").css("offset-distance", calcAnimationOnScrollProgress() + "%");
  }

  if (calcAnimationOnScrollProgress() >= 6) {
    $("#Problem1").css("opacity", "1");
    $("#Problem1").css("visibility", "visible");
  } else {
    $("#Problem1").css("opacity", "0");
  }

  if (calcAnimationOnScrollProgress() >= 18) {
    $("#Problem2").css("opacity", "1");
    $("#Problem2").css("visibility", "visible");
  } else {
    $("#Problem2").css("opacity", "0");
  }

  if (calcAnimationOnScrollProgress() >= 30) {
    $("#Problem3").css("opacity", "1");
    $("#Problem3").css("visibility", "visible");
  } else {
    $("#Problem3").css("opacity", "0");
  }
  if (calcAnimationOnScrollProgress() >= 45.7) {
    $("#Problem4").css("opacity", "1");
    $("#Problem4").css("visibility", "visible");
  } else {
    $("#Problem4").css("opacity", "0");
  }
  if (calcAnimationOnScrollProgress() >= 63) {
    $("#Problem5").css("opacity", "1");
    $("#Problem5").css("visibility", "visible");
  } else {
    $("#Problem5").css("opacity", "0");
  }
  if ($(this).scrollTop() + $(window).height() === documentHeight) {
    $("#car").css("offset-distance", "100%");
  }
});

$(window).on("resize", function () {
  calcGalleryValues();
  updateGallery();
});

$(document).ready(function () {
  switchCarInformation();
  //setup Gallery
  $("#gallery_left").on("click", toLastGallery);
  $("#gallery_right").on("click", toNextGallery);

  updateGallery();
  $(".problem").click(function () {
    let ID = $(this).attr("id");
    console.log(ID);
    $(".nav_map").addClass(ID + "_answer");
    console.log("Öffne Problemn mit ID: " + ID);
  });

  $(".close").click(function () {
    let parent = $(this).parent().attr("id");
    console.log("Schließe Problemn mit parent: " + parent);
    $(".nav_map").removeClass(parent);
  });

  $("#Lenkrad").click(function () {
    activeCarInformation = "#Lenkrad";
    switchCarInformation("#Lenkrad");
  });
  $("#Bremse").click(function () {
    activeCarInformation = "#Bremse";
    switchCarInformation("#Bremse");
  });
  $("#Problem").click(function () {
    activeCarInformation = "#Problem";
    switchCarInformation("#Problem");
  });
});

function switchCarInformation(id) {
  $(".carInformationOpen").removeClass(".carInformationOpen");
  $(activeCarInformation).addClass(".carInformationOpen");
  let h1 = "";
  let p = "";
  switch (id) {
    case "#Lenkrad":
      h1 = "Lenkrad";
      p =
        "Hier werden Daten zu der Lenkgeschwindigkeit und der Lenkwinkelkorrektur gemessen. Aus diesen entsteht das Lenkmuster. <br><br>Mit einem von der TU München und BMW entwickelten Lenkrad können durch weitere Sensoren auch vitale Parameter wie die Herzfrequenz oder der Hautwiderstand (Schweiß) gemessen werden.";
      break;
    case "#Bremse":
      h1 = "Bremspedal";
      p =
        "Durch einen Sensor bei der Bremse werden Daten über die Stärke des Bremspedaldrucks gesammelt. Diese Daten ergeben über einen gewissen Zeitraum betrachtet das Bremsdruckmuster.";
      break;
    case "#Problem":
      h1 = "Messgerät";
      p =
        "Bei dem Messgerät im Auto laufen alle Daten zusammen, die während der Fahrt gesammelt werden. Hierbei werden die Daten von dem Lenkradsensor, dem Bremsdruckmesser und der On-Board-Diagnose-Schnittstelle des Autos aufgezeichnet. Weiterhin sind in diesem Gerät auch noch eigene Sensoren, wie zum Beispiel der GPS-Tracker eingebaut.<br><br>Von diesem Messgerät werden die Daten dann an das Handy nach der Fahrt übertragen.";
      break;
    default:
      h1 = "Aufbau im Auto";
      p =
        "Für unsere Anwendung müssen verschiedene Messgeräte im Auto platziert werden. Durch das Auswählen der Elemente in dem Bild, werden hier weitere Informationen zu den einzelnen Geräten angezeigt.";
  }
  $("#carInformation").html(`<h1>${h1}</h1><p class="column_two">${p}</p>`);
}

// console.log(scrollTop);
// console.log(documentHeight);
// Our path string
const PATH =
  "M158.3,216.4C104.8,392,13.9,675,13.9,675l232.9,263.7L25.4,1625.9l48.1,57.7l105.3-34.7l140.6,94.8l-33.4,82.3l-37.4,96.6l-119.3,386.6l156.8,2.8l-63.4,219.6l43.5,29.6l-164.5,69l179.6,201.5L67,3516.6l237.7,264l21.7,120.2l54,27.8L344.4,4039h-75.3l75.3,190.1H238.1L177.5,4446l35.5,30.2l78.2-27.9l46.2,47.2l-103.5,253.8L128,4634.8L4.5,4863.5l124,216L15.7,5432.8l60.7,67.7l69.7,79.8l-55.4,99.4v23.4l-64.9,116l53.5,89.6l117.2-24.6l-19,53.4h142.2l72.1,190.1h-110L218.7,6347l35.6,31.3l-155.9,64.3";
// The bounds of our path
const WIDTH = 50;
const HEIGHT = 50;
const CONTAINER = document.getElementById("car");
// const CONTAINERCAR = document.getElementById("car");
// Generate a responsive path
const responsivePath = new Meanderer({
  path: PATH,
  width: WIDTH,
  height: HEIGHT,
});
// Generate a new scaled path when required. Here we are using ResizeObserver
// with a container that uses viewport units
const setPath = () => {
  const scaledPath = responsivePath.generatePath(
    CONTAINER.offsetWidth,
    CONTAINER.offsetHeight
  );
  // Here, we apply the path to an element through a CSS variable.
  // And then an element picks up on that. We could apply the motion path straight to the element though.
  CONTAINER.style.setProperty("--path", `"${scaledPath}"`);
};
// Set up our Resize Observer that will get the ball rolling
const SizeObserver = new ResizeObserver(setPath);
// Observe! Done!
SizeObserver.observe(CONTAINER);

$('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  var target = this.hash;
  var $target = $(target);
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $target.offset().top,
      },
      900,
      "swing",
      function () {
        window.location.hash = target;
      }
    );
});
