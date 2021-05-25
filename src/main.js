"use strict";

window.addEventListener("load", start);

// burger menu
function start() {
  console.log("start");

  blotter();

  let fontFaceSet = document.fonts;
  console.log(fontFaceSet);

  document.fonts.ready.then(function () {
    // Any operation that needs to be done only after all the fonts
    // have finished loading can go here.
    console.log(fontFaceSet);
  });

  document.querySelector(".burger-menu-icon").addEventListener("click", toggleBurgerMenu);
}

function toggleBurgerMenu() {
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerMenuText = document.querySelector(".burger-menu-text");

  if (burgerMenu.classList.contains("open")) {
    burgerMenu.classList.remove("open");
    burgerMenuText.textContent = "Menu";
  } else {
    burgerMenu.classList.add("open");
    burgerMenuText.textContent = "Close";
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
    family: "pilowlava-regular",
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
