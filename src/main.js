"use strict";

window.addEventListener("load", start);

// burger menu
function start() {
  console.log("start");

  blotter();

  // let fontFaceSet = document.fonts;
  // console.log(fontFaceSet);

  // document.fonts.ready.then(function () {
  //   // Any operation that needs to be done only after all the fonts
  //   // have finished loading can go here.
  //   console.log(fontFaceSet);
  // });

  // event listeners
  // burger menu
  document.querySelector(".burger-menu-icon").addEventListener("click", toggleBurgerMenu);

  // custom cursor
  document.addEventListener("mousemove", customCursorMove);
  document.querySelectorAll(".cursor-link").forEach((elm) => {
    elm.addEventListener("mouseover", onMouseOver);
    elm.addEventListener("mouseleave", onMouseLeave);
  });

  document.querySelectorAll(".cursor-link-big").forEach((elm) => {
    elm.addEventListener("mouseover", onMouseOverB);
    elm.addEventListener("mouseleave", onMouseLeaveB);
  });
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

function customCursorMove(event) {
  console.log("customCursor");
  const x = event.pageX - 10;
  const y = event.pageY - 10;
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
}

function onMouseOver() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(2)";
}

function onMouseLeave() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(1)";
}

function onMouseOverB() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(3)";
}

function onMouseLeaveB() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(1)";
}