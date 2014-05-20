A canvas implementation of [fontpath-renderer](https://github.com/mattdesl/fontpath-renderer), using HTML5 2D canvas.

This renders glyphs by decomposing their vector paths from [fontpath](https://github.com/mattdesl/fontpath) into `moveTo`, `lineTo`, etc. operations for the canvas context. This keeps it crisp for large sizes, but degrades at smaller sizes, and also presents a performance penalty. Generally this implementation is best suited for large fonts; and can be optimized by caching the paths to an off-screen canvas.

For more optimized rendering (with hinting), bitmap fonts would be worth exploring.

# usage

```js
var CanvasRenderer = require('fontpath-canvas');

var renderer = new CanvasRenderer();

//set the current font, text and pixel size
renderer.font = TestFont;
renderer.fontSize = fontSize;
renderer.text = text;

//optionally do some word wrapping
renderer.layout(wrapWidth);

//optionally set up align, underline settings, etc...
renderer.align = CanvasRenderer.Align.LEFT;


function render() {
	//...

	//fill the text at the specified x, y position
	context.fillStyle = 'red';
	renderer.fill(context, 25, 25);

	//...
}
```

# example

See the [demo](demo) folder for a simple example.

[![Demo](http://i.imgur.com/rkY0nBI.png)](demo)