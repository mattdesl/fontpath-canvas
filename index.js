var TextRenderer = require('fontpath-simple-renderer');
var decomposeGlyph = require('fontpath-draw-glyph')
var inherits = require('inherits')

function CanvasRenderer(options) {
    if (!(this instanceof CanvasRenderer))
        return new CanvasRenderer(options)
    TextRenderer.call(this, options);

    this.fill = draw.bind(this, true)
    this.stroke = draw.bind(this, false)
}

inherits(CanvasRenderer, TextRenderer)

function draw(fill, context, x, y, start, end) {
    if (!context)
        throw (fill?"fill":"stroke") + "() must be specified with a canvas context"
    var result = this.render(x, y, start, end)

    //first we will draw the underlines
    context.beginPath()
    for (var i=0; i<result.underlines.length; i++) {
        var u = result.underlines[i]
        context.rect(u.position[0], u.position[1], u.size[0], u.size[1])
    }
    if (fill)
        context.fill()
    else
        context.stroke()

    //now we draw the glyphs
    context.beginPath()
    for (i=0; i<result.glyphs.length; i++) {
        var gData = result.glyphs[i]
        var glyph = gData.glyph,
            scale = gData.scale[0],
            px = gData.position[0],
            py = gData.position[1]
        decomposeGlyph(context, glyph, scale, px, py)
    }
    if (fill)
        context.fill()
    else
        context.stroke()
}

module.exports = CanvasRenderer;