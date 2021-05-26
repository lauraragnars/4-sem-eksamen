"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "6URuJ3VZ8sEaX4JN4z9DDk";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;

window.addEventListener("load", start);

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, showData);

  // animateText();
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

  document.querySelector(".splash-text").textContent = data.fields.title;
}
