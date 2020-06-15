// import paper from "paper";
// import Change from "./ChangeFlag.js"; // from paperjs
var kappa = Numerical.KAPPA

var ellipseSegments = [
    new Segment([-1, 0], [0, kappa], [0, -kappa]),
    new Segment([0, -1], [-kappa, 0], [kappa, 0]),
    new Segment([1, 0], [0, -kappa], [0, kappa]),
    new Segment([0, 1], [kappa, 0], [-kappa, 0])
];
function createEllipse(center, radius) {
    var segments = new Array(4);
    for (var i = 0; i < 4; i++) {
        var segment = ellipseSegments[i];
        segments[i] = new Segment(
            segment._point.multiply(radius).add(center),
            segment._handleIn.multiply(radius),
            segment._handleOut.multiply(radius)
        );
    }
    return segments
}

let CircleCustomPaper = paper.Path.extend(
    {
        _class: "CircleCustom",
        initialize: function CircleCustom(circleOption) {
            var center = Point.readNamed(arguments, 'center'),
                radius = Base.readNamed(arguments, 'radius');

            CircleCustom.base.call(this, arguments);
            let segments = createEllipse(center,radius)
            this._add(segments); // call _add which can accept array
            this.closed = true

            this._radius = radius
            // filter out radius property
            this.set(circleOption,{radius:true}) // call set again so color option and other option get inited
            //which only work after path segemnts is created
        },


        setRadius: function (radius) {   //<---   prop change
            if (this._radius===radius) return //--->

            // reacreate segment position and curve
            this._radius = radius; // cache for getOptions call
            let position = this.position // cache as c.position is generated dynamicly
            for (var i = 0; i < 4; i++) {
                var segment = this.segments[i]

                segment.point.set(ellipseSegments[i].point.multiply(radius).add(position))
                segment.handleIn.set(ellipseSegments[i].handleIn.multiply(radius))
                segment.handleOut.set(ellipseSegments[i].handleOut.multiply(radius))
            }
        },
        getRadius: function () {   //<---   prop getter
            return this._radius
        },

    })
/*  paperscript prototype

var myCircle = new Path.Circle(new Point(100, 70), 20);
myCircle.fillColor = 'black';
myCircle.fullySelected = true

var circle2 = myCircle.clone()
circle2.position += [60, 60]

var circle3 = new Path.Circle(new Point(400, 70), 50);
circle3.fillColor = 'blue';
circle3.fullySelected = true

var kappa = Numerical.KAPPA
//todo change to normal data
// this is the default 1,0 ellipse

var ellipseSegments = [
    new Segment([-1, 0], [0, kappa], [0, -kappa]),
    new Segment([0, -1], [-kappa, 0], [kappa, 0]),
    new Segment([1, 0], [0, -kappa], [0, kappa]),
    new Segment([0, 1], [kappa, 0], [-kappa, 0])
];


function changeradius(c, radius) {
    console.log(c.position, radius)
    let position = c.position // cache as c.position is generated dynamicly
    for (var i = 0; i < 4; i++) {
        var segment = c.segments[i]

        segment.point.set(ellipseSegments[i].point.multiply(radius).add(position))
        segment.handleIn.set(ellipseSegments[i].handleIn.multiply(radius))
        segment.handleOut.set(ellipseSegments[i].handleOut.multiply(radius))
    }
    // c.position = position
    // c.fillColor = 'red'

}

changeradius(circle2, 50)
*/
