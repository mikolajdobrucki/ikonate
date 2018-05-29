# Custom Icons

[![npm version](https://badge.fury.io/js/custom-icons.svg)](https://badge.fury.io/js/custom-icons)

Fully customisable open-source icons.

## Installation

## Git repository

You can clone this repository to manually install Custom Icons in your project…

```bash
git clone https://github.com/eucalyptuss/custom-icons.git
```
### Install with npm

…or you can download the icons using [npm](http://npmjs.com/) package manager.

```bash
npm install ucreate-icons
```

### Build

To generate demo files and SVG sprites run a build command from the main repo directory.
```bash
npm run build
```

## Demo

The generated demo is available under `./custom-icons/demo/index.html`.

**IT DOESN't WORK!** If you open the file directly in your browser, it may not display the icons correctly. To fix it, open it using a http server such as [http-server](https://www.npmjs.com/package/http-server).

## Usage

### As `<img>` or `background-image`.

Reference: [CSS Tricks: Using SVG as an `<img>`](https://css-tricks.com/using-svg/#article-header-id-2)

All the icons are available as separate files at `./custom-icons/icons`.
Remember that using icons as `<img>` or `background-image`, you can't customise them with CSS.

### As inline SVG.

Reference: [CSS Tricks: Using "inline" SVG](https://css-tricks.com/using-svg/#article-header-id-7)

Import the icons you need using a technique appropriate for your project from `./custom-icons/icons`.

### As SVG sprite.

Reference: [CSS Tricks: SVG `use` with External Reference](https://css-tricks.com/svg-use-with-external-reference-take-2/)

If you successfully [run the build command](https://github.com/eucalyptuss/custom-icons/blob/master/README#Build) you will find the SVG sprite in `./custom-icons/sprite`.



If you'd like to learn more about different ways of using SVG in your project please take a look at the following articles:
* [A Practical Guide by svgontheweb.com](https://svgontheweb.com/#implementation)
* [Using SVG Tutorial by CSS-Tricks](https://css-tricks.com/using-svg/)

## Customisation

To customise icons with CSS you need to use the icons as either inline SVG or SVG sprite.

You can use the following CSS parameters to customise the icons:
* `width`
* `height`
* `stroke`
* `stroke-width`
* `stroke-linecap`
* `stroke-linejoin`

e.g.:

```css
width: 24px;
height: 24px;
stroke: currentColor;
stroke-width: 2;
stroke-linecap: round;
stroke-linejoin: round;
```

## License

Ucreate icons are available under the [MIT](https://github.com/eucalyptuss/custom-icons/blob/master/LICENSE). Feel free to use the set in both personal and commercial projects. Attribution in much appreciated but not required.

Do not resell the icons. If you share the set on the web, always link to the project's page, not directly to the file. Do not repost the file on other websites and services.
