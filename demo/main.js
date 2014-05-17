var test = require('canvas-testbed');
// var TestFont = require('fontpath-test-fonts/lib/OpenBaskerville-0.0.53.otf');
// var TestFont = require('./Unisans.json');
// var TestFont = require('./Ubuntu.json');
var TestFont = require('./ArialNarrow.json');
// var TestFont = require('./Serif1.json');
// var TestFont = require('./OB.json');

// var text = "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit. \nPellentesque blandit dictum tortor, \nsed bibendum enim suscipit et. \nMauris magna sapien, pellentesque a \nauctor id, vulputate id enim.";
// var text = "this is some path text";
var text = 'Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit.';

var CanvasUtil = require('../index.js');
var util = require('../util');
console.log("Kern pairs", TestFont.kerning.length);

console.log(TestFont.units_per_EM, TestFont.resolution, TestFont.size);

// console.log(TestFont.glyphs['i'])

var GlyphIterator = require('../glyph-iterator');

var ctx;


var itr = new GlyphIterator(TestFont);

function render(context, width, height) {
    ctx = context;

    context.clearRect(0, 0, width, height);

    var scale = itr.fontScale;

    var fontSize = util.pointToPixel(60); 
    // var fontSize = 60;
    var x = 0,
        y = 68;

    context.fillStyle = 'red';
    context.beginPath();
    CanvasUtil.drawText(context, TestFont, text, x, y, fontSize);
    context.fill();

    // context.fillStyle = 'red';
    // context.beginPath();
    // CanvasUtil.drawText(context, TestFont, text, x, y, fontSize, 5, 12);
    // context.fill();

    // context.fillStyle = 'black';
    // context.beginPath();
    // CanvasUtil.drawText(context, TestFont, text, x, y, fontSize, 12, text.length);
    // context.fill();
}

test(render, undefined, { once: true });

// test(render, undefined, { once: true });