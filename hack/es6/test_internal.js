let BrushCustomPaper = paper.Item.extend(
    /** @lends Shape# */ {
        _class: "BrushCustom",
        _applyMatrix: false,
        _canApplyMatrix: false,
        _canScaleStroke: true,

        // copy of Shape
        initialize: function BrushCustom(props = {}, points = []) {
            let point =null
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
            var shape = new paper.Shape.Ellipse({
                point: [20, 20],
                size: [180, 60],
                fillColor: "black"
            });

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
            let starObject = new BrushCustomPaper({position:[40,80]}, [[34, 54], [50, 80]]); //global
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
    }
}

document.addEventListener('DOMContentLoaded', () => {

        var canvas = document.getElementById('canvas');
        // Create an empty project and a view for the canvas:
        paper.setup(canvas);
        $("#add_line_path").click(() => btn_handler('line'));
        $("#add_line_path_color").click(() => btn_handler('line_color'));
        $("#bound_rect").click(() => btn_handler('bound_rect'));
        $("#circle_shape").click(() => btn_handler('circle_shape'));
        $("#brush").click(() => btn_handler('brush'));

        // not yet
        $("#set_b").click(() => btn_handler('b'));

    }
)
