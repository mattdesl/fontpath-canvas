var util = require('fontpath-util');

/**
 * Converts a pt size to px size, namely useful for matching
 * size with CSS styles. If no DPI is specified, 96 is assumed
 * (as it leads to correct rendering in all browsers).
 * 
 * @param  {[type]} font     [description]
 * @param  {[type]} fontSize [description]
 * @param  {[type]} dpi      [description]
 * @return {[type]}          [description]
 */
module.exports.pointToPixel = function(fontSize, dpi) {
    dpi = dpi||dpi===0 ? dpi : (96);
    fontSize = fontSize * dpi / 72;
    return Math.round(fontSize);
};

/**
 * 
 * @param  {[type]} font     [description]
 * @param  {[type]} fontSize [description]
 * @param  {[type]} dpi      [description]
 * @return {[type]}          [description]
 */
module.exports.getPxScale = function(font, fontSize) {
    //If no fontSize is specified, it will just fall back to using the font's own size with 96 DPI.
    fontSize = typeof fontSize === "number" ? fontSize : this.pointToPixel(font.size);

    //Takes in a font size in PIXELS and gives us the expected scaling factor
    var sz = font.units_per_EM/64;
    sz = (sz/font.size * fontSize);

    return ((font.resolution * 1/72 * sz) / font.units_per_EM);
};

/**
 * 
 * @param  {[type]} font     [description]
 * @param  {[type]} fontSize [description]
 * @return {[type]}          [description]
 */
module.exports.getPtScale = function(font, fontSize) {
    fontSize = typeof fontSize === "number" ? fontSize : font.size;
    fontSize = this.pointToPixel(fontSize);
    return this.getPxScale(font, fontSize);
};


// pixel_coordinate = em_coordinate * ppem /upem

// pointSize * resolution / ( 72 points per inch * units_per_EM )