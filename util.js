var util = require('fontpath-util');

module.exports.getScale = function(font, fontSize) {
    fontSize = fontSize||fontSize===0 ? fontSize : font.size;

    var pxSize = util.pointsToPixels(fontSize, font.resolution);
    var pointScale = (32/font.size) * pxSize / font.units_per_EM;
    return pointScale;
};