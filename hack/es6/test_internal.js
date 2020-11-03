// test caching path point with simplify parameter prop


let PathCustomPaper = paper.Path.extend(
    {
        _class: "SimplifyPath",
        initialize: function PathCustom(arg) {
            // debugger // what happened with arg? not important as we don't use it to pass points normally?
            // call  super
            PathCustom.base.call(this, arg); //StarClass is the function name
            this._smoothVersion = 0
            this._smoothFactor = 0
            this._originalSegments = null
            this._drawSegments = null

        },
        // _draw: function (ctx, param, parentStrokeMatrix) {
        //     debugger
        // },
        draw: function PathCustomDraw(ctx, param, parentStrokeMatrix) {
            debugger
            if (!this._originalSegments) {
                this._originalSegments = _.clone(this._segments)  // need to create new array with same data pointer
            }
            if (this._smoothFactor && this.version !== this._smoothVersion) {
                this._smoothVersion = this.version // take note when it is simplified so any change to segments will resimplify

                this.simplify(this._smoothFactor) // take out the segments with smoothed one
                this._drawSegments = _.clone(this._segments) // cached it
            }

            if (!this._drawSegments)
                this._drawSegments = _.clone(this._segments)

            this._segments = this._drawSegments // change array pointer
            PathCustomDraw.base.call(this, ctx, param, parentStrokeMatrix); //StarClass is the function name
            this._segments = this._originalSegments  // change array pointer
        },
        setSmoothFactor: function (opt) {   //<---   prop change
            // pass down option object
            this._smoothFactor = opt; // cache for getOptions call
            this._smoothVersion = 0
            this._changed(/*#=*/ Change.SEGMENTS);
            // this._changed(/*#=*/ Change.GEOMETRY);
        },
        getSmoothFactor: function () {   //<---   prop getter
            return this._smoothFactor
        },
        lineWeight: function (w) {
            debugger
            let segmentLast = this._segments.length - 1
            if (segmentLast > 0)
                this._segments[segmentLast].weight = w
        },
        _draw: function PathCustom_draw(ctx, param, viewMatrix, strokeMatrix) {
            // if editing
            if (this._selection) {
                PathCustom_draw.base.call(this, ctx, param, viewMatrix, strokeMatrix)
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

            if (hasFill || (hasStroke && !hasWeight)  || dontPaint) {
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
                    if (style.fillColor._type === 'pattern' || style.fillColor._type === 'itempattern') {
                        ctx.translate(-bounds.x, -bounds.y); 	// Prevents pattern to appear moving when path is dragged
                    }
                    // If shadowColor is defined, clear it after fill, so it
                    // won't be applied to both fill and stroke. If the path is
                    // only stroked, we don't have to clear it.
                    ctx.shadowColor = 'rgba(0,0,0,0)';
                }
                if (hasStroke) {
                    debugger
                    if (hasWeight) {
                        ctx.beginPath();
                        drawSegments(ctx, this, strokeMatrix,true);
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
        },
    })

/*
            drawSimplify: function (tolerance) {

            if this._cc
            let ret =this.simplify(tolerance) // mucked with our segment
            return ret;

        },
        add() {

        }

        // when the path is drawn we want to simplify it first
    }

)*/


// just test the call sequence code in es6-brush project
let BrushCustomPaper = paper.Item.extend(
    /** @lends Shape# */ {
        _class: "BrushCustom",
        _applyMatrix: false,
        _canApplyMatrix: false,
        _canScaleStroke: true,

        // copy of Shape
        initialize: function BrushCustom(props = {}, points = []) {
            let point = null
            // point =   [40,80] // initial translate , has to pass in so it set the translate matrix
            this._initialize(props, point);
            //   this.brush = new BrushThin();
            this.setPoints(points);
        },

        setPoints: function (opt) {
            //<---   prop change
            // pass down option object
            this._points = opt; // cache for getOptions call

            this._changed(/*#=*/ Change.GEOMETRY);
        },
        getPoints: function () {
            //<---   prop getter
            return this._points;
        },

        _draw: function (ctx, param, viewMatrix, strokeMatrix) {
            let s = this._points; // the point array
            let brushColor = "green";
            let brushSize = 2; // todo get from style
            let transforms = []; // mirror
            /*
            this.brush.setContext(ctx);
            this.brush.beginStroke(
                this.brushColor,
                this.brushSize,
                transforms,
                s[0][0],
                s[0][1]
            );
            for (let i = 1; i < s.length; i++) {
                this.brush.doStroke(s[i][0], s[i][1]);
            }
            this.brush.endStroke();*/
        }
    }
);

function drawCustomCircle() {
    var shape = new CircleCustomPaper(
        {
            center: [40, 20],
            radius: 13,
            fillColor: "black",
            // fullySelected:"true"
        });

    var circle2 = shape.clone()

    circle2.position = [160, 160]
    circle2.radius = 50
    circle2.fillColor = "red"

}

let myCustomPath // global
function btn_handler(n) {
    console.log("btn_handler", n)
    paper.project.clear()
    switch (n) {
        case 'line': {
            console.log("line")

            let props = {
                "type": "LINE",
                "pathData": "M121.10098,78.4327l127,128",
                "strokeColor": [
                    "Color",
                    0.09804,
                    0.92549,
                    0.63922,
                    1
                ],
                "properties": {
                    "from": {
                        "x": 121.10098266601562,
                        "y": 78.43270111083984
                    },
                    "to": {
                        "x": 248.10098266601562,
                        "y": 206.43270111083984
                    }
                }

            }
            new paper.Path(props)
        }
            break
        case 'line_color': {
            // "strokeColor":new paper.Color([0.09804,
            //     0.92549,
            //     0.63922]),
            // "strokeColor":[0.09804,
            //     0.92549,
            //     0.63922],

            let props = {
                "type": "L33INE",
                "pathData": "M101.10098,78.4327l127,128",
                "strokeColor": "rgba(223,90,90,1)",
                "properties": {
                    "from": {
                        "x": 121.10098266601562,
                        "y": 78.43270111083984
                    },
                    "to": {
                        "x": 248.10098266601562,
                        "y": 206.43270111083984
                    }
                }

            }
            new paper.Path(props)
            break
        }
        case 'circle_shape':
            drawCustomCircle()
            break
        case 'bound_rect':
            // change bound see the path data, test in scratchpad

            var star = new paper.Path.Star({
                center: [40, 60],
                points: 3,
                radius1: 20,
                radius2: 40,
                fillColor: 'red'
            });
// star.scale(0.5, star.bounds.topRight);

            console.log('bound', star.bounds)
//und { x: 5.35898, y: 40, width: 69.28203, height: 60 }
            star.bounds.width = 10
            console.log('bound_after', star.bounds)

            break
        case 'brush':
            let starObject = new BrushCustomPaper({position: [40, 80]}, [[34, 54], [50, 80]]); //global
            /*let style = {
                // fillColor: new paper.Color(1, 0, 0),
                // strokeColor: 'black',
                strokeColor: new paper.Color(0, 0.9, 0.5),
                strokeWidth: 1
            };
            starObject.style = style;
            starObject.selected = true;
            starObject.position = [40, 80];
*/
            break

        case 'path_cache': {
            console.log('path_cache')
            let points = [[10, 10], [20, 15], [35, 40], [50, 50], [60, 40], [55, 30], [70, 10], [75, 30], [85, 50]]
            myCustomPath = new PathCustomPaper({project: paper.project}) //new paper.Path();
            myCustomPath.strokeColor = 'black';
            points.forEach(p =>
                myCustomPath.add(p))

            myCustomPath.smoothFactor = 2 //(simplify)
        }
            break
        case 'change_path_smooth' :
            myCustomPath.smoothFactor = myCustomPath.smoothFactor + 4
            break
        case 'path_weight': {
            let points = [[20, 15], [60, 20], [45, 40]]
            myCustomPath = new WeightedPathCustomPaper({project: paper.project}) //new paper.Path();
            myCustomPath.strokeColor = 'black';
            myCustomPath.strokeWidth = 1;
            // myCustomPath.fillColor = 'red';
            myCustomPath.moveTo([10, 10])
            myCustomPath.lineTo([15, 5])
            let weight = 2
            points.forEach(p => {
                myCustomPath.lineWeight(weight)
                myCustomPath.lineTo(p)
                weight+=2
            })
        }
            break
    }
}

function serialize() {

    /* create layer

 some object
    serialize the layer

    but when rerendered it is a group not a layer
    */
    let layer = new paper.Layer()
    let props = {
        "type": "L33INE",
        "pathData": "M101.10098,78.4327l127,128",
        "strokeColor": "rgba(223,90,90,1)",
        "properties": {
            "from": {
                "x": 121.10098266601562,
                "y": 78.43270111083984
            },
            "to": {
                "x": 248.10098266601562,
                "y": 206.43270111083984
            }
        }

    }
    let path = new paper.Path(props)

    drawCustomCircle()


    console.log("serialize")

    let value
    debugger

    /* test exporting group */ // same data as layer
    // let group = new paper.Group()
    // group.addChild(path)
    // value = group.exportJSON({asString:false,precision: 16})


    /* test exporting layer */
    value = Base.serialize(layer, {precision: 16})

    // value = paper.exportJSON({asString: false})

    let jsonString = JSON.stringify(value, undefined, 2)
    console.log(jsonString)

}

function deserialize() {
    let data
    // data = GROUP_SIMPLE
    data = GROUP_CUSTOM_CIRCLE

    debugger
    let group = new paper.Group()
    group.importJSON(data)
}

function jsongroup() {
    let data = GROUP_SIMPLE
    debugger
    let jsonData = {children: data[1].children}
    // need to delete all group specific field, just want the children?
    // delete jsonData['applyMatrix']

    //pass paper so group created has the same project
    var group = new JsonGroupClassPaper(
        {jsonData})

}

document.addEventListener('DOMContentLoaded', () => {

        var canvas = document.getElementById('canvas');
        // Create an empty project and a view for the canvas:
        paper.setup(canvas);
        $("#add_line_path").click(() => btn_handler('line'));
        $("#add_line_path_color").click(() => btn_handler('line_color'));
        $("#bound_rect").click(() => btn_handler('bound_rect'));
        $("#circle_shape").click(() => btn_handler('circle_shape'));
        $("#path_cache").click(() => btn_handler('path_cache'));
        $("#brush").click(() => btn_handler('brush'));
        $("#path_weight").click(() => btn_handler('path_weight'));
        $("#serialize").click(() => serialize());
        $("#deserialize").click(() => deserialize());
        $("#jsongroup").click(() => jsongroup());
        $("#dumppaper").click(() => {
            let value = paper.project.exportJSON({asString: false})
            let val = JSON.stringify(value, undefined, 2)
            console.log(val)
        })

        $("#change_path_smooth").click(() => {
            myCustomPath.smoothFactor = myCustomPath.smoothFactor + 6  //calling btn_handler will clear project
            console.log("myCustomPath.smoothFactor", myCustomPath.smoothFactor)
        });  // just test the skeleton
        // not yet

    }
)
