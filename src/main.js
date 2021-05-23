"use strict";

window.addEventListener("DOMContentLoaded", start);

// burger menu
function start() {
  console.log("start");

  blotter();

  document
    .querySelector(".burger-menu")
    .addEventListener("click", toggleBurgerMenu);
}

function toggleBurgerMenu() {
  const burgerMenu = document.querySelector(".burger-menu");

  if (burgerMenu.classList.contains("open")) {
    burgerMenu.classList.remove("open");
  } else {
    burgerMenu.classList.add("open");
  }
}

function toggle(elm) {
  if (elm) {
    elm = false;
  } else if (elm === false) {
    elm = true;
  }

  return elm;
}

function blotter() {
  let text = new Blotter.Text("Ø", {
    family: "pilowlavaa",
    size: 70,
    fill: "white",
  });
  let material = new window.Blotter.LiquidDistortMaterial();
  let blotter = new Blotter(material, { texts: text });
  material.uniforms.uSpeed.value = 0.1;
  material.uniforms.uVolatility.value = 0.1;
  let scope = blotter.forText(text);
  scope.globalCompositeOperation = "difference";
  scope.appendTo(document.querySelector(".header-logo"));
}
