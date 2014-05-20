var funcs = {
    'm': 'moveTo',
    'l': 'lineTo',
    'q': 'quadraticCurveTo',
    'c': 'bezierCurveTo'
};

var GlyphIterator = require('fontpath-glyph-iterator');

var itr = new GlyphIterator();
var tmpBounds = { x: 0, y: 0, width: 0, height: 0, glyphs: 0 };

/**
 * Draws a glyph as a series of path operations (moveTo, bezierCurveTo, etc),
 * with the optional translation and scaling applied. 
 */
module.exports.drawGlyph = function(context, glyph, scale, x, y) {
    if (!glyph.path || glyph.path.length===0)
        return;

    x = x||0;
    y = y||0;
    scale = typeof scale === "number" ? scale : 1;

    var path = glyph.path;
    for (var i=0; i<path.length; i++) {
        var p = path[i];
        var f = p[0];
        if (f==='m') 
            context.moveTo(p[1]*scale+x, p[2]*-scale+y);
        else if (f==='l') 
            context.lineTo(p[1]*scale+x, p[2]*-scale+y);
        else if (f==='q') 
            context.quadraticCurveTo(p[1]*scale+x, p[2]*-scale+y, p[3]*scale+x, p[4]*-scale+y);
        else if (f==='c') 
            context.bezierCurveTo(p[1]*scale+x, p[2]*-scale+y, p[3]*scale+x, p[4]*-scale+y, p[5]*scale+x, p[6]*-scale+y);
    }
};

module.exports.drawUnderline = function(context, x, y, width, height) {
    context.fillRect(x, y, width, height);
};
