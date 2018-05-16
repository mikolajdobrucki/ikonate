const fs = require('fs');
const jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM;

const baseHTML = `
<html lang="en" dir="ltr"><head>
    <meta charset="utf-8">
    <title></title>
  <style>
    :root {
      /* Colour Palette */
      --grey--medium:   #9ea7c7;
      --grey--light:    #fafafd;
      --white:          #ffffff;
      --brand:          #0E3FF2;

      /* Dimensions */
      --border-radius:  4px;
    }
    body {
      background: var(--grey--light);
    }
    .container {
      display: grid;
      grid-template-columns: repeat(12,1fr);
      width: 1152px;
      grid-gap: 32px;
      margin: 0 auto;
      color: var(--brand);
    }
    .container__grid-item {
      background: var(--white);
      border-radius: var(--border-radius);
      padding: 20px;
    }
    .customicons {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }
  </style></head>

  <body>
    <div class="container"></div>
  </body>
</html>
`;

fs.readdir('./icons', (err, files) => {
  let result = files.map((item) => {
    return `
      <div class="container__grid-item">
        <svg class="customicons">
          <use xlink:href="../sprite/customicons.svg#${item.replace('.svg','')}"/>
        </svg>
      </div>`;
  });
  const dom = new JSDOM(baseHTML);
  const element = dom.window.document.getElementsByClassName('container')[0];
  element.innerHTML = result.join('');
  fs.mkdir('demo', () => {
    fs.writeFile('demo/index.html', `<!DOCTYPE html>` + dom.window.document.documentElement.outerHTML)
  });
});
