A canvas implementation of [fontpath-renderer](https://github.com/mattdesl/fontpath-renderer), using HTML5 canvas paths.

Path rendering is pretty fast in most renderers, especially since we submit all the fill/stroke operations in a single call; but with complex glyphs and large chunks of text it may not be optimal. In either case; you should generally aim to cache the results to an off-screen canvas, until the next time the text changes.

For hinted and more optimized [fontpath](https://github.com/mattdesl/fontpath) rendering with 2D Canvas, bitmap fonts would be worth exploring.

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