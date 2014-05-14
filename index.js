var util = require('fontpath-util');



var funcs = {
    'm': 'moveTo',
    'l': 'lineTo',
    'q': 'quadraticCurveTo',
    'c': 'bezierCurveTo'
};

module.exports.scaleToFont = function(context, font, fontSize) {
    fontSize = fontSize||fontSize===0 ? fontSize : font.size;

    var pxSize = util.pointsToPixels(fontSize, font.resolution);
    var pointScale = (32/font.size) * pxSize / font.units_per_EM;
    // context.scale(pointScale, -pointScale);
    context.transform(pointScale, 0, 0, -pointScale, 0, 0);
    return pointScale;
};


/**
 * 
 */
module.exports.drawGlyph = function(context, glyph) {
    if (!glyph.path || glyph.path.length===0)
        return;

    var path = glyph.path;
    for (var i=0; i<path.length; i++) {
        var p = path[i];
        var args = p.slice(1);
        var fkey = funcs[ p[0] ];
        // console.log(fkey, args);
        context[fkey].apply(context, args);
    }
};