const fs = require("fs");
const pretty = require("pretty");
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;


module.exports = (params) => {
    const options = params || getOptions(process.argv) || "inline"

    const DOM = new JSDOM(fs.readFileSync("IndexTemplate.html").toString("utf-8"));
    const Document = DOM.window.document;

    const iconsToRender = options.icons || fs.readdirSync("./icons")

    if(options.inline)
        generateInline(iconsToRender, Document)
    if(options.sprite)
        generateSprite(iconsToRender, Document)

    const DOMstring = pretty(DOM.serialize())

    if(options.save){
        fs.mkdir("demo", () => {
            fs.writeFile("demo/index.html", DOMstring, err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    return DOMstring
}


function generateInline(icons, Document){
    console.log("Generating INLINE demo")
    // <div class="container__grid-item">
    //     <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="alignCenterIconTitle alignCenterIconDesc">
    //         <title id="alignCenterIconTitle">Align Center</title>
    //         <desc id="alignCenterIconDesc">Icon of four horizontal lines representing central alignment of text</desc>
    //         <path d="M8 10L16 10M6 6L18 6M6 14L18 14M8 18L16 18" />
    //     </svg>
    // </div>;

    icons.map(item => {
        const svgFile = new JSDOM(
            fs.readFileSync("./icons/" + item).toString("utf-8")
        ).window.document.getElementsByTagName("svg")["0"];

        const div = Document.createElement("div");
        div.classList.add("container__grid-item");

        div.appendChild(svgFile);
        Document.getElementsByClassName("container")["0"].appendChild(div);
    });
}


function generateSprite(icons, Document){
    console.log("Generating SPRITESHEETS demo")

    // <div class="container__grid-item">
    //     <svg class="custom-icons">
    //       <use xlink:href="../sprite/custom-icons.svg#activity"></use>
    //     </svg>
    // </div>

    icons.map(item => {
        const div = Document.createElement("div");
        div.classList.add("container__grid-item");

        const svg = Document.createElement("svg");
        svg.classList.add("custom-icons");

        const use = Document.createElement("use");
        use.setAttribute("xlink:href", "../sprite/custom-icons.svg#"+item.replace(".svg", ""))

        svg.appendChild(use);
        div.appendChild(svg);
        Document.getElementsByClassName("container")["0"].appendChild(div);
    });
}


function getOptions(args){
    const obj = {}

    args.forEach(i => {
        obj[i] = true;
    })

    return obj
}
