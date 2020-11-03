let WeightedPathCustomPaper = paper.Path.extend(
    {
        _class: "WeightedPath",


        lineWeight: function (w) {
            let segmentLast = this._segments.length - 1
            if (segmentLast > 0)
                this._segments[segmentLast].weight = w
        },
        _draw: function WeightedPathCustom_draw(ctx, param, viewMatrix, strokeMatrix) {
            // if editing
            if (this._selection) {
                WeightedPathCustom_draw.base.call(this, ctx, param, viewMatrix, strokeMatrix)
                return
            }
            var dontStart = param.dontStart,
                dontPaint = param.dontFinish || param.clip,
                style = this.getStyle(),
                hasFill = style.hasFill(),
                hasStroke = style.hasStroke(),
                hasWeight = this._segments.filter(s => s.weight).length

            if (!dontStart)
                ctx.beginPath();

            if (hasFill || (hasStroke && !hasWeight) || dontPaint) {
                // Prepare the canvas path if we have any situation that
                // requires it to be defined.
                drawSegments(ctx, this, strokeMatrix);
                if (this._closed)
                    ctx.closePath();
            }


            if (!dontPaint && (hasFill || hasStroke)) {
                // If the path is part of a compound path or doesn't have a fill
                // or stroke, there is no need to continue.
                this._setStyles(ctx, param, viewMatrix);
                var bounds = null
                if (hasFill) {
                    if (style.fillColor._type === 'pattern' || style.fillColor._type === 'itempattern') {
                        bounds = this._getBounds(null, {});

                        ctx.translate(bounds.x, bounds.y); 	// Prevents pattern to appear moving when path is dragged
                    }

                    ctx.fill(style.getFillRule());
                    if (bounds !== null) {
                        ctx.translate(-bounds.x, -bounds.y); 	// Prevents pattern to appear moving when path is dragged
                    }
                    // If shadowColor is defined, clear it after fill, so it
                    // won't be applied to both fill and stroke. If the path is
                    // only stroked, we don't have to clear it.
                    ctx.shadowColor = 'rgba(0,0,0,0)';
                }
                if (hasStroke) {
                    if (hasWeight) {
                        ctx.beginPath();
                        drawSegments(ctx, this, strokeMatrix, true);
                        ctx.stroke();

                    } else {
                        if (style.strokeColor._type === 'pattern' || style.strokeColor._type === 'itempattern') {
                            if (!bounds)
                                bounds = this._getBounds(null, {});

                            ctx.translate(bounds.x, bounds.y); 	// Prevents pattern to appear moving when path is dragged
                        }

                        ctx.stroke();
                    }
                }
            }
        }
    }
)

function drawSegments(ctx, path, matrix, checkWeight = false) {
    var segments = path._segments,
        length = segments.length,
        coords = new Array(6),
        first = true,
        curX, curY,
        prevX, prevY,
        inX, inY,
        outX, outY;

    function drawSegment(segment) {
        // Optimise code when no matrix is provided by accessing segment
        // points hand handles directly, since this is the default when
        // drawing paths. Matrix is only used for drawing selections and
        // when #strokeScaling is false.
        if (matrix) {
            segment._transformCoordinates(matrix, coords);
            curX = coords[0];
            curY = coords[1];
        } else {
            var point = segment._point;
            curX = point._x;
            curY = point._y;
        }
        if (first) {
            ctx.moveTo(curX, curY);
            first = false;
        } else {
            if (matrix) {
                inX = coords[2];
                inY = coords[3];
            } else {
                let handle = segment._handleIn;
                inX = curX + handle._x;
                inY = curY + handle._y;
            }
            if (inX === curX && inY === curY
                && outX === prevX && outY === prevY) {
                ctx.lineTo(curX, curY);
            } else {
                ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
            }
            //set the next one
            if (checkWeight && segment.weight !== undefined) {
                ctx.stroke();
                ctx.beginPath()
                ctx.moveTo(curX, curY)
                ctx.lineWidth = segment.weight
            }
        }
        prevX = curX;
        prevY = curY;
        if (matrix) {
            outX = coords[4];
            outY = coords[5];
        } else {
            let handle = segment._handleOut;
            outX = prevX + handle._x;
            outY = prevY + handle._y;
        }
    }

    for (var i = 0; i < length; i++)
        drawSegment(segments[i]);
    // Close path by drawing first segment again
    if (path._closed && length > 0)
        drawSegment(segments[0]);
}
