"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "2leewETkIiBBffCNGNSQh5";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=ticketModule`;

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

  const allTickets = data.items;

  let container = document.querySelector("#tickets-container");
  container.innerHTML = "";
  let ticketTemplate = document.querySelector("template");

  allTickets.forEach((ticket) => {
    let klon = ticketTemplate.cloneNode(true).content;
    console.log(ticket);
    console.log(klon);
    klon.querySelector(".ticket-type").textContent = ticket.fields.ticketType;
    klon.querySelector("p").textContent = ticket.fields.description;
    klon.querySelector("h4").textContent = ticket.fields.ageLimit;
    klon.querySelector("p+p").textContent = ticket.fields.price;

    container.appendChild(klon);

    //Check if tickets are sold out
    // if (ticket.field.soldOut === true) {
    // }
  });
}
