var util = require('fontpath-util');
var getScale = require('./util').getScale;


var funcs = {
    'm': 'moveTo',
    'l': 'lineTo',
    'q': 'quadraticCurveTo',
    'c': 'bezierCurveTo'
};


var GlyphIterator = require('./glyph-iterator');
var itr = new GlyphIterator();

module.exports.scaleToFont = function(context, font, fontSize) {
    var pointScale = getScale(font, fontSize);
    context.transform(pointScale, 0, 0, -pointScale, 0, 0);
    return pointScale;
};


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

module.exports.drawText = function (context, font, text, x, y, fontSize, start, end) {
    //setup the iterator for our desired font...
    itr.font = font;
    itr.fontSize = fontSize;
    itr.lineHeight = fontSize+0;
    // itr.kerning = false;

    start = start||0;
    end = typeof end === "number" ? end : text.length;

    var scale = itr.fontScale;

    //At this point we may want to grab the bounds using the iterator
    //Then determine alignment and so forth.

    //set the origin and pen position
    itr.begin(x, y);

    for (var i=0; i<text.length; i++) {
        //Step the iterator; determines new line position
        var glyph = itr.step(text, i);

        if (!glyph)
            continue;

        if (i >= start && i < end) {
            var tx = itr.pen.x;
            var ty = itr.pen.y;

            var hbx = Math.round(glyph.hbx*scale);
            this.drawGlyph(context, glyph, scale, tx - hbx, ty);
        }            

        //Advance the iterator to the next glyph in the string
        itr.advance(glyph);
    }

    //finish the iterator...
    itr.end();
};