var test = require('canvas-testbed');
var TestFont = require('fontpath-test-fonts/lib/OpenBaskerville-0.0.53.otf');
// var TestFont = require('./Unisans.json');
// var TestFont = require('./Ubuntu.json');
// var TestFont = require('./Arial.json');
// var TestFont = require('./Serif1.json');

var text = "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit. \nPellentesque blandit dictum tortor, \nsed bibendum enim suscipit et. \nMauris magna sapien, pellentesque a \nauctor id, vulputate id enim.";

var CanvasUtil = require('../index.js');
console.log("Kern pairs", TestFont.kerning.length);



// console.log(TestFont.glyphs['i'])

var GlyphIterator = require('../glyph-iterator');

var ctx;


var itr = new GlyphIterator(TestFont);

function render(context, width, height) {
    ctx = context;

    context.clearRect(0, 0, width, height);

    var scale = itr.fontScale;

    var fontSize = 32; 

    context.fillStyle = 'black';
    context.beginPath();
    CanvasUtil.drawText(context, TestFont, text, 250, 250, fontSize, 0, 5);
    context.fill();

    context.fillStyle = 'red';
    context.beginPath();
    CanvasUtil.drawText(context, TestFont, text, 250, 250, fontSize, 5, 12);
    context.fill();

    context.fillStyle = 'black';
    context.beginPath();
    CanvasUtil.drawText(context, TestFont, text, 250, 250, fontSize, 12, text.length);
    context.fill();
}

test(render, undefined, { once: false });

// test(render, undefined, { once: true });