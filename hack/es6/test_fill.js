function init_drawing(paper) {
    let style = {
        fillColor: new paper.Color(1, 1, 0),
        strokeColor: 'black',
        strokeWidth: 2
    };

    let start_pt = [50, 50]
    let start = new paper.Point(start_pt);
    // Move to start and draw a line from there
    let path = new paper.Path();
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([100, 150]));
    path.lineTo(start.add([150, 30]));
    path.closed = true
    path.applyMatrix = false
    path.style = style  // necessary?


    let bounds = path.getBounds()
}

function move(object) {
    let pos = object.position

    object.position = pos.add([5, 0])
}

function fillPaper(style = 1) {
    var circle = new paper.Path.Circle(new paper.Point(100, 170), 30);
    // circle.fillColor = 'red'
    // circle.fillColor = {pattern: {url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', repeat: 'repeat'}}


    // var img = new Image();
    // img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
    // img.onload = function () {
    //     var pattern = ctx.createPattern(img, 'repeat');
    //     ctx.fillStyle = pattern;
    //     ctx.fillRect(0, 0, 300, 300);
    // };

    switch (style) {
        case 1:
            circle.fillColor = {
                pattern:
                    {
                        url: 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png',
                        repeat: 'repeat'
                    }
            }
            break
        case 2:
            circle.fillColor = {
                pattern: {
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
                    repeat: 'repeat'
                }
            }
            circle.position = [80, 30]
            break
    }


    return circle
}
let offsetX = 5
var mozimg = new Image();
mozimg.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';

function app_init(paper) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    $("#fillnative").click(() => {
        if (mozimg.complete) {
            ctx.clearRect( 0, 0, canvas.width, canvas.height );
            var pattern = ctx.createPattern(mozimg, 'repeat');


            // ctx.save();
            ctx.translate(offsetX,0)
            ctx.fillStyle = pattern;
            ctx.fillRect(10, 10, 300, 300);
            ctx.translate(-offsetX,0)
            offsetX += 7
            // ctx.restore();
            console.log("offset",offsetX)

        };

    })
    $("#fillpaper1").click(() => {
        testObj = fillPaper(1)
    })
    $("#fillpaper2").click(() => {
        testObj = fillPaper(2)
    })

    $("#move").click(() => {
        move(testObj)
    })

    $("#gradient").click(() => {
        var topLeft = [10, 40];
        var bottomRight = [80, 70];

// Create a rectangle shaped path between
// the topLeft and bottomRight points:
        var path = new paper.Path.Rectangle({
            topLeft: topLeft,
            bottomRight: bottomRight,
            // Fill the path with a gradient of three color stops
            // that runs between the two points we defined earlier:
            fillColor: {
                gradient: {
                    stops: ['yellow', 'red', 'blue']
                },
                origin: topLeft,
                destination: bottomRight
            }
        });
    })


    $("#fillsvg").click(() => {

        var i = new Image();
        i.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'><circle cx='10' cy='10' r='10' fill='green' /></svg>";
        i.onload = function () {

            var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

            var pattern = ctx.createPattern(i, "repeat");
            ctx.fillStyle = pattern;
            ctx.translate(10, 10);
            ctx.strokeRect(0, 0, 150, 150);
            ctx.fillRect(0, 0, 150, 150);

            var patternX = ctx.createPattern(i, "repeat-x");
            ctx.fillStyle = patternX;
            ctx.translate(0, 160);
            ctx.strokeRect(0, 0, 150, 150);
            ctx.fillRect(0, 0, 150, 150);

            var patternN = ctx.createPattern(i, "no-repeat");
            ctx.fillStyle = patternN;
            ctx.translate(160, 0);
            ctx.strokeRect(0, 0, 150, 150);
            ctx.fillRect(0, 0, 150, 150);

            var patternY = ctx.createPattern(i, "repeat-y");
            ctx.fillStyle = patternY;
            ctx.translate(0, -160);
            ctx.strokeRect(0, 0, 150, 150);
            ctx.fillRect(0, 0, 150, 150);
        };

    })
    $("#b_dump").click(() => {
        let value = paper.project.exportJSON({asString: false})
        $("#textinput").val(JSON.stringify(value, undefined, 2))
    })
}

var testObj
document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)

    // init_drawing(paper)

    // testObj = fillPaper(paper)
})
