var TextRenderer = require('fontpath-renderer');

var MOVETO = 'm',
	LINETO = 'l',
	QUADTO = 'q',
	CUBICTO = 'c';

/**
 * Draws a glyph as a series of path operations (moveTo, bezierCurveTo, etc),
 * with the optional translation and scaling applied. 
 */
 function decomposeGlyph(context, glyph, scale, x, y) {
    if (!glyph.path || glyph.path.length===0)
        return;

    x = x||0;
    y = y||0;
    scale = typeof scale === "number" ? scale : 1;

    var path = glyph.path;
    for (var i=0; i<path.length; i++) {
        var p = path[i];
        var f = p[0];
        if (f===MOVETO) 
            context.moveTo(p[1]*scale+x, p[2]*-scale+y);
        else if (f===LINETO) 
            context.lineTo(p[1]*scale+x, p[2]*-scale+y);
        else if (f===QUADTO) 
            context.quadraticCurveTo(p[1]*scale+x, p[2]*-scale+y, p[3]*scale+x, p[4]*-scale+y);
        else if (f===CUBICTO) 
            context.bezierCurveTo(p[1]*scale+x, p[2]*-scale+y, p[3]*scale+x, p[4]*-scale+y, p[5]*scale+x, p[6]*-scale+y);
    }
};

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