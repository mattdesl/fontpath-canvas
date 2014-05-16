var util = require('./util');

function GlyphIterator(font, fontSize) {
    this._fontSize = undefined;
    this._font = undefined;
    this.fontScale = 1.0;
    this.multiline = true;
    this.kerning = true;
    this.lineHeight = undefined;

    this.fontSize = fontSize;
    this.font = font;

    this.origin = { x: 0, y: 0 };
    this.pen = { x: 0, y: 0 };
}

Object.defineProperty(GlyphIterator.prototype, "font", {
    get: function() {
        return this._font;
    },

    set: function(font) {
        this._font = font;

        //Determine the new scaling factor...
        if (font) {
            this.fontScale = util.getScale(font, this.fontSize);
            this.lineHeight = Math.round(font.height*this.fontScale);
        }
    },
});

Object.defineProperty(GlyphIterator.prototype, "fontSize", {
    get: function() {
        return this._fontSize;
    },

    set: function(val) {
        this._fontSize = val;

        //If the font is already set, determine the new scaling factor
        if (this._font) {
            this.fontScale = util.getScale(this._font, this._fontSize);
            this.lineHeight = Math.round(this.font.height*this.fontScale);
        }
    },
});

GlyphIterator.prototype.getKerning = function(left, right) {
    var font = this.font;

    if (!font || !font.kerning)
        return 0;

    var table = this.kerningTable;

    for (var i=0; i<font.kerning.length; i++) {
        var k = font.kerning[i];
        if (k[0] === left && k[1] === right) 
            return k[2];
    }
    return 0;
};

GlyphIterator.prototype.begin = function(x, y) {
    this.origin.x = x||0;
    this.origin.y = y||0;

    this.pen.x = this.origin.x;
    this.pen.y = this.origin.y;
};

GlyphIterator.prototype.end = function() {
    //.. mainly for consistency with begin()
};

GlyphIterator.prototype.translate = function(x, y) {
    this.origin.x += x||0;
    this.origin.y += y||0;

    this.pen.x += x||0;
    this.pen.y += y||0;
};

GlyphIterator.prototype.step = function(text, index) {
    var scale = this.fontScale,
        font = this._font;

    var chr = text.charAt(index);

    //Jump down to next line
    if (this.multiline && chr === '\n') {
        this.pen.y += this.lineHeight;
        this.pen.x = this.origin.x;
        return;
    } 

    //Skip missing characters...
    if (!(chr in font.glyphs))
        return;
    
    var glyph = font.glyphs[chr];

    //If we have a char to the left, determine its kerning
    if (index > 0 && this.kerning) {
        var kern = this.getKerning(text.charAt(index-1), chr);
        this.pen.x += Math.round(kern*scale);
    }

    return glyph;
};

/**
 * Called after step. 
 * @param  {[type]} text  [description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
GlyphIterator.prototype.advance = function(glyph) {
    // Advance to next pen position
    this.pen.x += Math.round(glyph.xoff * this.fontScale);
};

module.exports = GlyphIterator;