var test = require('canvas-testbed');
// var TestFont = require('fontpath-test-fonts/lib/OpenBaskerville-0.0.53.otf');
// var TestFont = require('./Unisans.json');
// var TestFont = require('./Ubuntu.json');
// var TestFont = require('./ArialNarrow.json');
// var TestFont = require('./Alex.json');
// var TestFont = require('./OB.json');
var TestFont = require('./Serif1.json');

// var text = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nPellentesque blandit dictum tortor,\nsed bibendum enim suscipit et.\nMauris magna sapien, pellentesque a\nauctor id, vulputate id enim.";
// var text = "Lorem\nipsum dolor";
// var text = 'Lorem ipsum dolor\nsit amet,\nconsectetur adipiscing elit.';

// var text = "Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit. \nPellentesque blandit dictum tortor, \nsed bibendum enim suscipit et. \nMauris magna sapien, pellentesque a \nauctor id, vulputate id enim.";
var text = "Lorem\nipsum dolor sit amet,";

var text = 'var c=document.getElementById("myCanvas");\n \
\tvar ctx=c.getContext("2d");\n \
\tctx.beginPath();\n \
\tctx.moveTo(20,20);\n \
\tctx.bezierCurveTo(20,100,200,100,200,20);\n \
ctx.stroke();\n';

var CanvasUtil = require('../index.js');
var util = require('../util');
console.log("Kern pairs", TestFont.kerning.length);

console.log(TestFont.units_per_EM, TestFont.resolution, TestFont.size);

// console.log(TestFont.glyphs['i'])

var GlyphIterator = require('../glyph-iterator');

var ctx;

var CanvasRenderer = require('../CanvasRenderer');
var TriangleRenderer = require('../TriangleRenderer');


// var textRenderer = new TextRenderer();
// textRenderer.renderGlyph = function(chr, glyph, scale, tx, ty) {
//     if (ctx) {
//         CanvasUtil.drawGlyph(ctx, glyph, scale, tx, ty);
//     }
// };
// textRenderer.renderUnderline = function(x, y, width, height) {
//     if (ctx) ctx.fillRect(x, y, width, height);
// };

// var fontSize = util.pointToPixel(60); 
var fontSize = 32; //+ ((Math.sin(time)/2+0.5)*30);
var wrapWidth = undefined;

var textRenderer = new TriangleRenderer();
textRenderer.font = TestFont;
textRenderer.fontSize = fontSize;
textRenderer.text = text;
textRenderer.layout(wrapWidth);
textRenderer.align = CanvasRenderer.Align.LEFT;

// var pathRenderer = new CanvasRenderer();
// pathRenderer.font = TestFont;
// pathRenderer.fontSize = fontSize;
// pathRenderer.text = text;
// pathRenderer.layout();
// pathRenderer.align = CanvasRenderer.Align.CENTER;


var itr = new GlyphIterator(TestFont);

var time = 0;

// 1. Vector font rendering for large sizes. User can set a threshold
// 2. Fall back to bitmap fonts at a certain size.
//      (flag to "lock" to nearest bitmap font size)

//TEXT LAYOUT
//  Multiple styles (italics, bold)
//  Multiple sizes, all snapped to baseline

//TODO: Render at (x, y) correctly, lower left origin for text

var mouse = {x:0, y:0};

window.addEventListener("mousemove", function(ev) {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
});

function render(context, width, height) {
    ctx = context;
    time += 0.01;

    context.clearRect(0, 0, width, height);

    var scale = itr.fontScale;

    var x = 0,
        y = textRenderer.getBounds().height+100;

    context.fillRect(x, y, wrapWidth, 10);
    // context.strokeRect(x, y, , 5);

    context.fillStyle = 'black';
    context.lineWidth = 1;

    // textRenderer.animation = 0.75
    // textRenderer.animationOrigin.set(mouse.x, mouse.y);
    // var bounds = textRenderer.getBounds(true);
    
    // context.fillStyle = 'black';
    // textRenderer.stroke(context, x, y, 0, 3);

    // context.fillStyle = 'red';
    // textRenderer.fill(context, x, y, 3, 6);

    // context.fillStyle = 'black';
    // textRenderer.fill(context, x, y, 6, 11);

    // context.fillStyle = 'gray';
    // pathRenderer.fill(context, x, y, 11, 14);

    // context.lineWidth = 2;
    // context.lineJoin = 'round';
    textRenderer.fill(context, x, y);
}

test(render, undefined, { once: true });

// test(render, undefined, { once: true });