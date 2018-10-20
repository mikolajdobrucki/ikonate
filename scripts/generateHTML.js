"use strict";

const fs = require("fs");
const pretty = require("pretty");
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;


module.exports = (params) => {
    const args = params || parseArgv(process.argv)
    const options = Object.assign(args, {
        templateSrc: args.templateSrc || "./templates/index-template.html",
        iconsCatalogSrc: args.iconsCatalogSrc || "./icons",
        saveCatalog:  args.saveCatalog || "demo",
        saveName:  args.saveName || "index.html",
        xLinkHref: args.xLinkHref || "./ikonate.svg"
    })

    const DOM = new JSDOM(fs.readFileSync(options.templateSrc).toString("utf-8"));
    const Document = DOM.window.document;

    const iconsToRender = options.icons || fs.readdirSync(options.iconsCatalogSrc)

    if(options.inline)
        generateInline(options, iconsToRender, Document)
    if(options.sprite)
        generateSprite(options, iconsToRender, Document)

    const DOMstring = pretty(DOM.serialize())

    if(options.save){
        fs.mkdir(options.saveCatalog, () => {
            fs.writeFile(options.saveCatalog + "/" + options.saveName, DOMstring, err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    return DOMstring
}


function generateInline(options, icons, Document){
    // <div class="container__grid-item">
    //   <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="lockAltOpenIconTitle lockAltOpenIconDesc">
    //     <title id="lockAltOpenIconTitle">Lock</title>
    //     <desc id="lockAltOpenIconDesc">Icon of an opened lock</desc>
    //     <path d="M7,7.625 L7,7 C7,4.23857625 9.23857625,2 12,2 L12,2 C14.7614237,2 17,4.23857625 17,7 L17,11"></path>
    //     <rect width="14" height="10" x="5" y="11"></rect>
    //     <circle cx="12" cy="16" r="1"></circle>
    //   </svg>
    // </div>

    icons.map(item => {
        const svgFile = new JSDOM(
            fs.readFileSync(options.iconsCatalogSrc + "/" + item).toString("utf-8")
        ).window.document.getElementsByTagName("svg")["0"];

        const keywordsTag = svgFile.getElementsByTagName("keywords")["0"]

        if(keywordsTag)
            svgFile.removeChild(keywordsTag)

        const div = Document.createElement("div");
        div.classList.add("main__item");

        div.appendChild(svgFile);
        Document.getElementsByClassName("main")["0"].appendChild(div);
    });
}


function generateSprite(options, icons, Document){
    // <div class="container__grid-item">
    //   <svg class="ikonate">
    //     <title id="lockAltOpenIconTitle">Lock</title>
    //     <desc id="lockAltOpenIconDesc">Icon of an opened lock</desc>
    //     <use xlink:href="./ikonate.svg#lock-alt-open"></use>
    //   </svg>
    // </div>

    icons.map(item => {
        const svgFile = new JSDOM(
            fs.readFileSync(options.iconsCatalogSrc + "/" + item).toString("utf-8")
        ).window.document.getElementsByTagName("svg")["0"];

        const titleTag = svgFile.getElementsByTagName("title")["0"]
        const descTag = svgFile.getElementsByTagName("desc")["0"]

        const div = Document.createElement("div");
        div.classList.add("main__item");

        const svg = Document.createElement("svg");

        const use = Document.createElement("use");
        use.setAttribute("xlink:href", options.xLinkHref + "#" + item.replace(".svg", ""));
        use.setAttribute("href", options.xLinkHref + "#" + item.replace(".svg", ""));

        svg.appendChild(titleTag);
        svg.appendChild(descTag);
        svg.appendChild(use);
        div.appendChild(svg);
        Document.getElementsByClassName("main")["0"].appendChild(div);
    });
}


function parseArgv(args){
    const obj = {}

    args.forEach(i => {
        if(i.includes("=")){
            const param = i.split("=")
            obj[param[0]] = param[1]
        }else{
            obj[i] = true;
        }
    })

    return obj
}
