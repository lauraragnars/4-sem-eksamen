"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "7k6leOigNpIaVOJ3Nf9Mrb";

const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;

window.addEventListener("load", start);

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, showData);
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
