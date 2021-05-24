"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "7k6leOigNpIaVOJ3Nf9Mrb";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;

window.addEventListener("load", start);

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, showData);

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
}

function animateText() {
  const elem = document.querySelector(".splash-text");
  const text = new Blotter.Text("DISTORTION Ø", {
    family: "pilowlava-regular",
    weight: 100,
    size: 100,
    fill: "white",
  });

  let material = new Blotter.RollingDistortMaterial();

  material.uniforms.uSineDistortAmplitude.value = 0.04;

  let blotter = new Blotter(material, {
    texts: text,
  });

  let scope = blotter.forText(text);

  scope.appendTo(elem);
}
