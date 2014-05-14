var test = require('canvas-testbed');
// var TestFont = require('fontpath-test-fonts/lib/OpenBaskerville-0.0.75.ttf');
// var TestFont = require('./Unisans.json');
// var TestFont = require('./Ubuntu.json');
// var TestFont = require('./ArialNarrow.json');
var TestFont = require('./Serif1.json');

var text = "the quick brown fox jumps";

var CanvasUtil = require('../index.js');
console.log(getKern(TestFont, 'e', 'k'));

function getKern(font, left, right){
    if (!font.kerning)
        return;

    for (var i=0; i<font.kerning.length; i++) {
        var k = font.kerning[i];

        if (k[0] === left && k[1] === right) {
            return k[2];
        }
    }
    return 0;
}


function render(context, width, height) {
    context.clearRect(0, 0, width, height);

    // context.fillRect(0, 0, 12, 12);

    context.save(); 

    context.translate(100, 300);

    var scale = CanvasUtil.scaleToFont(context, TestFont, 32);


    //Since the canvas scales the line thickness, we need
    //to accomodate for that...
    context.lineWidth = 2/scale;

    context.strokeStyle = 'black';

    for (var i=0; i<text.length; i++) {
        var chr = text.charAt(i);
        var glyph = TestFont.glyphs[chr];

        if (i > 0) {
            var kern = getKern(TestFont, text.charAt(i-1), chr);
            context.translate(kern, 0);
        }

        context.save();


        var descenderHeight = (glyph.height-glyph.hby);
        var charHeight = glyph.height + descenderHeight;


        //draw the font box
        // context.fillStyle = 'rgba(255,0,0,0.25)';
        // context.fillRect(0, 0, glyph.width, TestFont.height+TestFont.ascender);

        //draw the glyph box
        context.fillStyle = 'rgba(0,0,0,0.25)';
        // context.fillRect(0, 0, glyph.width, glyph.height);

        // context.fillStyle = 'rgba(0,160,160,1)';
        // context.fillRect(0, 0, glyph.width, TestFont.descender);
        

        //draw the descender space
        // context.fillStyle = 'rgba(160,0,0,0.5)';
        // context.fillRect(0, 0, glyph.width, glyph.hby);

        context.fillStyle = 'rgba(160,0,160,1)';
        // context.fillRect(0, 0, glyph.width, TestFont.descender);

        //Draw the glyph character
        context.translate(-glyph.hbx, 0);
        context.beginPath();
        CanvasUtil.drawGlyph(context, glyph);
        context.fillStyle = 'rgba(0,0,0,1)';
        context.fill();

        //Restore
        var xoff = glyph.xoff;
        context.restore();
        context.translate(xoff, 0);
    }

    context.restore();
}

test(render, undefined, { once: true });