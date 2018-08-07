"use strict";

const fs = require("fs");
const path = require("path");
const xmldom = require("xmldom");
const DOMParser = xmldom.DOMParser;
const XMLSerializer = xmldom.XMLSerializer;

const spritesheetsName = "custom-icons.svg";
const srcToSpritesheets = "./sprite/"
const srcToSpritesheetsTemplate = path.join(__dirname, "../templates/custom-icons-template.svg")
const iconsDirectory = path.join(__dirname, "../icons");



module.exports = (params)=>{
    const options = params || getOptions(process.argv)

    const DocumentTemplate = new DOMParser().parseFromString(
        fs.readFileSync(srcToSpritesheetsTemplate).toString("utf-8")
    );
    const DocumentTemplateSvgTag = DocumentTemplate.getElementsByTagName("svg")["0"]

    const selectedSvgs = options.selectedSvgs ? options.selectedSvgs : fs.readdirSync("./icons")
    selectedSvgs.forEach((name)=>{
        DocumentTemplateSvgTag.appendChild(createSymbolElement(options, name, DocumentTemplate))
    })

    if(options.save){
        fs.writeFileSync(
            srcToSpritesheets + spritesheetsName,
            new XMLSerializer().serializeToString(DocumentTemplate)
        );

        return srcToSpritesheets + spritesheetsName
    }

    return new XMLSerializer().serializeToString(DocumentTemplate)
}



function createSymbolElement(options, name, DocumentTemplate){
    const svgDoc = new DOMParser().parseFromString(
        fs.readFileSync(iconsDirectory + "/" + name).toString("utf-8"),
        "text/xml"
    ).childNodes["0"];

    const symbol = DocumentTemplate.createElement("symbol")
    const viewBoxAtt = svgDoc.getAttribute("viewBox")//Get value of viewBox attribute of SVG tag
    symbol.setAttribute("viewBox", viewBoxAtt)

    symbol.setAttribute("id", name.replace(".svg", ""))

    Object.keys(svgDoc.childNodes).forEach((i)=>{
        const tagName = svgDoc.childNodes[i].tagName
        const isLabelTag = (tagName === "title" || tagName === "desc")

        if( tagName && (!options.removeLabelTags || !isLabelTag)){
            symbol.appendChild(svgDoc.childNodes[i])
        }
    })

    return symbol
}


function getOptions(args){
    const obj = {}

    args.forEach(i => {
        obj[i] = true;
    })

    return obj
}
