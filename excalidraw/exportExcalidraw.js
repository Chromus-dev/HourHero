const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const { Excalidraw } = require('@excalidraw/excalidraw');

// Folder where Excalidraw JSON files are located
const inputFolder = './';
const outputFolder = './img/';

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
	fs.mkdirSync(outputFolder);
}

// Function to render Excalidraw data to an image
const renderExcalidrawToImage = (data, outputPath) => {
	const canvasWidth = 1200;
	const canvasHeight = 800;
	const canvas = createCanvas(canvasWidth, canvasHeight);
	const context = canvas.getContext('2d');

	const excalidrawInstance = new Excalidraw();
	excalidrawInstance.setCanvasSize({
		width: canvasWidth,
		height: canvasHeight,
	});
	excalidrawInstance.setZoom(1);
	excalidrawInstance.renderData(data);
	excalidrawInstance.renderToCanvas(context);

	// Write the canvas to a PNG file
	const out = fs.createWriteStream(outputPath);
	const stream = canvas.createPNGStream();
	stream.pipe(out);

	out.on('finish', () => {
		console.log(`Exported: ${outputPath}`);
	});
};

// Read all JSON files from the input folder
fs.readdirSync(inputFolder).forEach((file) => {
	const filePath = path.join(inputFolder, file);
	if (path.extname(filePath) === '.json') {
		const jsonData = require(filePath); // Load Excalidraw JSON data
		const outputPath = path.join(
			outputFolder,
			`${path.basename(file, '.json')}.png`
		);
		renderExcalidrawToImage(jsonData, outputPath);
	}
});
