const fs = require('fs');
const xmldom = require('xmldom');

const { DOMParser } = xmldom;
const { XMLSerializer } = xmldom;

module.exports = (params) => {
	const args = params || parseArgv(process.argv);
	const options = Object.assign(args, {
		spriteDistName: args.spriteDistName || 'ikonate.svg',
		spriteDistCatalog: args.spriteDistCatalog || './build/sprite/',
		spriteTemplateSrc: args.spriteTemplateSrc || './templates/ikonate-template.svg',
		iconsCatalogSrc: args.iconsCatalogSrc || './icons',
	});

	const DocumentTemplate = new DOMParser().parseFromString(
		fs.readFileSync(options.spriteTemplateSrc).toString('utf-8')
	);
	const DocumentTemplateSvgTag = DocumentTemplate.getElementsByTagName('svg')['0'];

	const selectedSvgs = options.selectedSvgs || getSvgNamesFromDir('./icons');

	selectedSvgs
		.filter((i) => i.includes('.svg'))
		.forEach((name) => {
			DocumentTemplateSvgTag.appendChild(
				createSymbolElement(options, name, DocumentTemplate)
			);
		});

	if (options.save) {
		fs.writeFileSync(
			options.spriteDistCatalog + options.spriteDistName,
			new XMLSerializer().serializeToString(DocumentTemplate)
		);

		return options.spriteDistCatalog + options.spriteDistName;
	}

	return new XMLSerializer().serializeToString(DocumentTemplate);
};


function createSymbolElement(options, name, DocumentTemplate) {
	const svgDoc = new DOMParser().parseFromString(
		fs.readFileSync(`${options.iconsCatalogSrc}/${name}`).toString('utf-8'),
		'text/xml'
	).childNodes['0'];

	const symbol = DocumentTemplate.createElement('symbol');
	const viewBoxAtt = svgDoc.getAttribute('viewBox');// Get value of viewBox attribute of SVG tag
	symbol.setAttribute('viewBox', viewBoxAtt);

	symbol.setAttribute('id', name.replace('.svg', ''));

	Object.keys(svgDoc.childNodes).forEach((i) => {
		const { tagName } = svgDoc.childNodes[i];
		const isLabelTag = (tagName === 'title' || tagName === 'desc');

		if (tagName && !isLabelTag) {
			symbol.appendChild(svgDoc.childNodes[i]);
		}
	});

	return symbol;
}

function getSvgNamesFromDir(dirName) {
	return fs.readdirSync(dirName).filter((i) => i.includes('.svg'));
}

function parseArgv(args) {
	const obj = {};

	args.forEach(i => {
		if (i.includes('=')) {
			const param = i.split('=');
			obj[param[0]] = param[1];
		} else {
			obj[i] = true;
		}
	});

	return obj;
}
