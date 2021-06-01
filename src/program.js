"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "9Tp2XfVYOtuB36CZHDiPi";

const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=individualArtist`;

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

// function showData(data) {
//   console.log(data);
// }

// scener: live, urban, rave, Tekno tunnel, disco,

function showData(data) {
  console.log(data);
  const container = document.querySelector(".program-container");
  const template = document.querySelector("template");
  container.innerHTML = "";

  const scener = ["Live", "Urban", "Rave", "Tekno Tunnel", "Disco"];

  scener.forEach((scene) => {
    let clone = template.cloneNode(true).content;
    clone.querySelector(".scene-title").textContent = scene;

    data.items.forEach((artist) => {
      // first only select the artists that correspond to the right scene
      if (artist.fields.scene.toLowerCase() === scene.toLowerCase()) {
        // then check which day they're playing

        // Artists for friday
        if (artist.fields.day === "Friday") {
          let name = document.createElement("li");
          let time = document.createElement("li");

          name.textContent = artist.fields.artistName;
          time.textContent = artist.fields.time;

          name.addEventListener("click", () => {
            location.href = "artist.html?id=" + artist.sys.id;
          });

          clone.querySelector(".friday .artists").append(name);
          clone.querySelector(".friday .time").append(time);

          // Artists for Saturday
        } else if (artist.fields.day === "Saturday") {
          let name = document.createElement("li");
          let time = document.createElement("li");

          name.textContent = artist.fields.artistName;
          time.textContent = artist.fields.time;

          name.addEventListener("click", () => {
            location.href = "artist.html?id=" + artist.sys.id;
          });

          clone.querySelector(".saturday .artists").append(name);
          clone.querySelector(".saturday .time").append(time);
        }
      }
    });

    container.appendChild(clone);
  });
}
