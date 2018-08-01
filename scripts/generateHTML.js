const fs = require('fs');
const pretty = require('pretty')
const jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM;


const DOM = new JSDOM(fs.readFileSync("IndexTemplate.html").toString("utf-8"))
const Document = DOM.window.document


fs.readdir('./icons', (err, files) => {
  let result = files.map((item) => {
      const svg = new JSDOM(fs.readFileSync("./icons/" + item).toString("utf-8")).window.document.getElementsByTagName("svg")["0"]

      const div = Document.createElement("div")
      div.classList.add("container__grid-item")

      div.appendChild(svg)
      Document.getElementsByClassName("container")["0"].appendChild(div)
  });

   fs.mkdir('demo', () => {
    fs.writeFile('demo/index.html', pretty(DOM.serialize()) , (err) => {
      if (err) {
        console.log(err);
      }
    })
  });
});
