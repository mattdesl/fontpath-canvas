var test = require('canvas-testbed');

//the font we want to render
var Font = require('fontpath-test-fonts/lib/Inconsolata.otf');

var CanvasRenderer = require('../index');

var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit dictum tortor, sed bibendum enim suscipit et. Mauris magna sapien, pellentesque a auctor id, vulputate id enim.'

var renderer = new CanvasRenderer();

var wrapWidth = 400;

//setup the text renderer
renderer.text = text;
renderer.font = Font;
renderer.fontSize = 32;

//underline if desired:
// renderer.underline = true
// renderer.underlineThickness = 2
// renderer.underlinePosition = 5
renderer.align = 'right';
renderer.layout(wrapWidth); 

var time = 0;
function render(context, width, height) {
	context.clearRect(0, 0, width, height);

	var bounds = renderer.getBounds();

	//center the text in the window
	var x = (window.innerWidth-bounds.width)/2,
		y = bounds.height + (window.innerHeight-bounds.height)/2;

	//the bounds fit tightly to the text glyphs. 
	//Often UI elements will include the descender in the bounds
	//to make it look more even along all edges.
	var descender = renderer.getDescender();

	//draw the card background with some padding
	var pad = 20;
	context.fillStyle = 'rgb(50,128,50)';
	context.fillRect(bounds.x + x - pad, bounds.y + y - pad,
					 pad*2 + bounds.width, pad*2 + bounds.height + descender);

	//now draw the text
	context.fillStyle = 'white';
	renderer.fill(context, x, y);
}

//render once to the canvas
test(render, { once: true });