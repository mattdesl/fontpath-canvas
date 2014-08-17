var TextRenderer = require('fontpath-renderer');
var decomposeGlyph = require('fontpath-draw-glyph')

function CanvasRenderer(font, fontSize) {
	TextRenderer.call(this, font, fontSize);
	this.context = null;
	this.strokeUnderline = false;
}

//inherits from TextRenderer
CanvasRenderer.prototype = Object.create(TextRenderer.prototype);
CanvasRenderer.constructor = CanvasRenderer;

//export static members..
CanvasRenderer.Align = TextRenderer.Align;
CanvasRenderer.decomposeGlyph = decomposeGlyph;

CanvasRenderer.prototype.renderGlyph = function(chr, glyph, scale, x, y) {
	decomposeGlyph(this.context, glyph, scale, x, y);
};

CanvasRenderer.prototype.renderUnderline = function(x, y, width, height) {
	this.context.rect(x, y, width, height);
	//Styling the underline a different colour might be a bit tricky.
	//ideally we want to submit all the paths in a single fill...
};

CanvasRenderer.prototype.fill = function(context, x, y, start, end) {
	if (!context)
		throw "fill() must be specified with a canvas context";
	this.context = context;
	this.strokeUnderline = false;
	context.beginPath();
	this.render(x, y, start, end);
	context.fill();
};

CanvasRenderer.prototype.stroke = function(context, x, y, start, end) {
	if (!context)
		throw "stroke() must be specified with a canvas context";
	this.context = context;
	this.strokeUnderline = true;
	context.beginPath();
	this.render(x, y, start, end);
	context.stroke();
};


module.exports = CanvasRenderer;