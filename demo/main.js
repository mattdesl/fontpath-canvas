var test = require('canvas-testbed');
// var TestFont = require('fontpath-test-fonts/lib/OpenBaskerville-0.0.53.otf');
// var TestFont = require('./Unisans.json');
// var TestFont = require('./Ubuntu.json');
// var TestFont = require('./ArialNarrow.json');
var TestFont = require('./Alex.json');
// var TestFont = require('./OB.json');

var text = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nPellentesque blandit dictum tortor,\nsed bibendum enim suscipit et.\nMauris magna sapien, pellentesque a\nauctor id, vulputate id enim.";
// var text = "g.";
// var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.';

// var text = "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit. \nPellentesque blandit dictum tortor, \nsed bibendum enim suscipit et. \nMauris magna sapien, pellentesque a \nauctor id, vulputate id enim.".replace(/\n/g, '');


var CanvasUtil = require('../index.js');
var util = require('../util');
console.log("Kern pairs", TestFont.kerning.length);

console.log(TestFont.units_per_EM, TestFont.resolution, TestFont.size);

// console.log(TestFont.glyphs['i'])

var GlyphIterator = require('../glyph-iterator');

var ctx;


var itr = new GlyphIterator(TestFont);

var time = 0;

function render(context, width, height) {
    ctx = context;
    time += 0.01;

    context.clearRect(0, 0, width, height);

    var scale = itr.fontScale;

    // var fontSize = util.pointToPixel(60); 
    var fontSize = 32; //+ ((Math.sin(time)/2+0.5)*30);
    var x = 10,
        y = 200;

    // context.font = "60px 'Arial Narrow'";
    // context.fillStyle = 'blue';
    // context.fillText(text, x, y);

    context.fillStyle = 'black';
    context.beginPath();
    CanvasUtil.drawText(context, TestFont, text, x, y, fontSize, 'center', 0, 0, 6);
    context.fill();

    context.fillStyle = 'blue';
    context.beginPath();
    CanvasUtil.drawText(context, TestFont, text, x, y, fontSize, 'center', 0, 6, 11, true);
    context.fill();

    context.fillStyle = 'black';
    context.beginPath();
    CanvasUtil.drawText(context, TestFont, text, x, y, fontSize, 'center', 0, 11, null, null);
    context.fill();

}

test(render, undefined, { once: true });

// test(render, undefined, { once: true });