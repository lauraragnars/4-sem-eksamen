!function(){if(window.addEventListener("load",(function(){console.log("start"),document.querySelector(".burger-menu-icon").addEventListener("click",e),document.addEventListener("mousemove",o),document.querySelectorAll(".cursor-link").forEach((e=>{e.addEventListener("mouseover",t),e.addEventListener("mouseleave",n)})),document.querySelectorAll(".cursor-link-big").forEach((e=>{e.addEventListener("mouseover",r),e.addEventListener("mouseleave",u)}))})),"fonts"in document){let e=new FontFace("Pilowlava-Regular","url(https://lauraragnars.dk/fonts/Pilowlava-Regular.woff2) format('woff2'), url(https://lauraragnars.dk/fonts/Pilowlava-Regular.woff2) format('woff')");Promise.all([e.load()]).then((function(e){e.forEach((function(e){document.fonts.add(e)}))}))}function e(){const e=document.querySelector(".burger-menu"),o=document.querySelector(".burger-menu-text");e.classList.contains("open")?(e.classList.remove("open"),o.textContent="Menu"):(e.classList.add("open"),o.textContent="Close")}function o(e){console.log("customCursor");const o=e.pageX-10,t=e.pageY-10,n=document.querySelector(".custom-cursor");n.style.left=o+"px",n.style.top=t+"px"}function t(){document.querySelector(".custom-cursor").style.transform="scale(2)"}function n(){document.querySelector(".custom-cursor").style.transform="scale(1)"}function r(){document.querySelector(".custom-cursor").style.transform="scale(3)"}function u(){document.querySelector(".custom-cursor").style.transform="scale(1)"}document.fonts.ready.then((function(){console.log(document.fonts);let e=new Blotter.Text("Ø",{family:"Pilowlava-Regular",size:70,fill:"#fff"}),o=new window.Blotter.LiquidDistortMaterial,t=new Blotter(o,{texts:e});o.uniforms.uSpeed.value=.1,o.uniforms.uVolatility.value=.1,t.forText(e).appendTo(document.querySelector(".header-logo"))}))}();
//# sourceMappingURL=tickets.090460bc.js.map