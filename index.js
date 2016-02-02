"use strict";
import co from "co";
import Viz from "viz.js";
import "babel-polyfill";

function viz(code) {
  return new Promise(function(resolve){
    const svg = Viz(code, { format: "svg", engine: "dot" });
    resolve(svg);
  });
}

window.addEventListener("load", () => {
  const parser = new DOMParser();
  const elements = document.querySelectorAll("pre.viz");

  for(let i=0; i<elements.length; i++) {
    co(function* (){
      //console.log(elements[i].innerText);
      const element = elements[i];
      const xml = yield viz(element.innerText);
      const svg = parser.parseFromString(xml, "image/svg+xml");
      //要素の直後に追加
      element.parentNode.insertBefore(svg.documentElement, element.nextSibling);
    });
  }
});
