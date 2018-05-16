const fs = require('fs');
const jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM;


fs.readdir('./icons', (err, files) => {
  let result = files.map((item) => {
    return `
      <div class="container__grid-item">
        <svg class="customicons">
          <use xlink:href="../sprite/customicons.svg#${item.replace('.svg','')}"/>
        </svg>
      </div>`;
  });
  fs.readFile('./demo/index.html', 'utf8', (err, data) => {
    const dom = new JSDOM(data);
    const element = dom.window.document.getElementsByClassName('container')[0];
    element.innerHTML = result.join('');
    fs.writeFile('./demo/index.html', `<!DOCTYPE html>` + dom.window.document.documentElement.outerHTML)
  });
});
