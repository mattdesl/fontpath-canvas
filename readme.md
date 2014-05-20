A canvas implementation of [fontpath-renderer](https://github.com/mattdesl/fontpath-renderer), using path operations.

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