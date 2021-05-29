"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "7k6leOigNpIaVOJ3Nf9Mrb";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;

if ("fonts" in document) {
  let font = new FontFace(
    "Pilowlava-Regular",
    "url(https://lauraragnars.dk/fonts/Pilowlava-Regular.woff2) format('woff2'), url(https://lauraragnars.dk/fonts/Pilowlava-Regular.woff2) format('woff')"
  );

  Promise.all([font.load()]).then(function (loadedFonts) {
    // Render them at the same time
    loadedFonts.forEach(function (font) {
      document.fonts.add(font);
    });
  });
}

window.addEventListener("load", start);

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, showData);

  countdown();
  animateText();
}

// loads data
function loadJSON(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      callback(jsonData);
    });
}

function showData(data) {
  console.log(data);

  document.querySelector(".about-text-header").textContent = data.fields.aboutHeader;
  document.querySelector(".about-text").textContent = data.fields.aboutText;
}

function countdown() {
  const countDownDate = new Date("Jun 4, 2021 16:00:00").getTime();

  const myfunc = setInterval(function () {
    let now = new Date().getTime();
    let timeleft = countDownDate - now;

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    document.querySelector(".days").textContent = days + "d ";
    document.querySelector(".hours").textContent = hours + "h ";
    document.querySelector(".mins").textContent = minutes + "m ";
    document.querySelector(".secs").textContent = seconds + "s";
  }, 1000);
}

function animateText() {
  document.fonts.ready.then(function () {
    const elem = document.querySelector(".splash-text");
    const text = new Blotter.Text("DISTORTION Ø", {
      family: "Pilowlava-Regular",
      weight: 100,
      size: 150,
      fill: "white",
    });

    let material = new Blotter.RollingDistortMaterial();

    material.uniforms.uSineDistortAmplitude.value = 0.04;

    let blotter = new Blotter(material, {
      texts: text,
    });

    let scope = blotter.forText(text);

    scope.appendTo(elem);

    adjustCanvas();
  });
}

function adjustCanvas() {
  const canvas = document.querySelector(".splash-text .b-canvas");
  canvas.setAttribute("height", "400");
  canvas.setAttribute("width", "800");
  console.log(canvas);
}
