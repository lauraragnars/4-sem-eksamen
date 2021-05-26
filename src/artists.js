"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "6URuJ3VZ8sEaX4JN4z9DDk";
// const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?/${entryID}?access_token=${accessToken}`;

const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=individualArtist`;

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
  const list = document.querySelector("#all-artists");
  const allArtists = data.items;

  // sort the artists, so the headliners are first
  allArtists.sort(function (a, b) {
    return b.fields.isHeadliner - a.fields.isHeadliner;
  });

  allArtists.forEach((artist) => {
    let li = document.createElement("li");
    li.textContent = artist.fields.artistName;

    // Checks if artist is headliner
    if (artist.fields.isHeadliner === true) {
      li.classList.add("headliner");
    }
    // add the <li> to the html list
    list.append(li);
  });
}

// function showArtists(data) {
//   console.log(data);
//   // const allArtists = data.allArtists;
//   const container = document.querySelector("#all-artists");
//   // container.innerHTML = "";

//   // let listTemplate = document.querySelector("template");

//   // allArtists.forEach((artist) => {
//   //   if (filter == "lineup") {
//   //     let klon = listTemplate.cloneNode(true).textContent;
//   //     klon.querySelector("h2").textContent =
//   //       artist.allArtists.individualArtist.artistName;
//   //     container.appendChild(klon);

//   //     // container.lastElementChild.addEventListener("click", () => {
//   //     //     location.href = "single.html?id=" + artist.;
//   //     // })
//   //   }
//   // });
// }
