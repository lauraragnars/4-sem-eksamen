"use strict";

document.addEventListener("DOMContentLoaded", start);

import { accessToken, spaceID } from "../config/contentful";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const entryID = id;
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}&include=10`;

function start() {
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

  document.querySelector(".artist-name").textContent = data.fields.artistName;
  document.querySelector(".artist-info").textContent =
    data.fields.day + " / " + data.fields.scene + " / " + data.fields.time;
  //   https://open.spotify.com/embed/track/
  document.querySelector("iframe").src = data.fields.spotifyTrackLink;
  document.querySelector(".facebook a").href = data.fields.facebookLink;
  document.querySelector(".instagram a").href = data.fields.instagramLink;
  document.querySelector(".soundcloud a").href = data.fields.soundCloudLink;
  document.querySelector(".spotify a").href = data.fields.spotifyLink;

  const assetID = data.fields.artistPhoto.sys.id;

  const imgLink = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/assets/${assetID}?access_token=${accessToken}`;

  loadJSON(imgLink, showImage);
}

function showImage(data) {
  console.log(data);

  document.querySelector(
    ".artist-photo"
  ).style.backgroundImage = `url(${data.fields.file.url})`;
}
