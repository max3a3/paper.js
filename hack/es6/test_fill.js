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

function itemfill(style = 1) {
    let ret

    switch (style) {
        case 1: {
            var grp = new Group([new paper.Path.Circle({
                fillColor: "red",
                radius: 13
            }), new paper.Path.Rectangle({fillColor: "green", size: [5, 10], position: [2, 18]})]);
            // var grp = new paper.Path.Circle({fillColor: "red", radius: 3})
            let pattern = new paper.ItemPattern(grp);


            ret = new Path.Rectangle({
                fillColor: pattern,
                position: [60, 100],
                size: [100, 100],
                strokeColor: "green"
            })
            break;
        }
        case 2: {
            let pattern = {itempattern: {item: new Path.Circle({fillColor: "green", radius: 5})}}
            pattern.itempattern.item.remove() // somehow this is not removed for stroke maybe timing issue
                                              // can be seen when first drawn, but subsequently it is fine,
                                              // not in the scene graph


            ret = new Path.Rectangle({
                fillColor: {
                    pattern:
                        {
                            url: 'http://www.w3schools.com/tags/img_lamp.jpg'
                        }
                },
                position: [60, 100],
                size: [100, 100],
                strokeColor: pattern,
                strokeWidth: 12,
            })
            break
        }
        case 3: {
            let pattern = {itempattern: {item: new Path.Circle({fillColor: "green", radius: 13})}}
            pattern.itempattern.item.remove() // somehow this is not removed maybe timing issue
                                              // can be seen when first drawn, but subsequently it is fine,
                                              // not in the scene graph


            ret = new Path.Rectangle({
                fillColor: 'red',//pattern,
                position: [60, 100],
                size: [100, 100],
                strokeColor: pattern,//"red",
                strokeWidth: 12,
            })
            break
        }
    }
    return ret
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
        case 3:
            circle.fillColor = new Pattern('https://icons.iconarchive.com/icons/martz90/circle/32/camera-icon.png')

            break
        case 'noise': {

            var texture = new TG.Texture(256, 256)
                .add(new TG.Noise())
                .toCanvas();

            circle.fillColor = {
                itempattern: {
                    item: texture
                }
            }
            circle.position = [180, 30]
            break
        }
        case 'pixelate': {
            var texture = new TG.Texture(256, 256)
                .set(new TG.Noise())
                .set(new TG.Pixelate().size(5, 5))
                .alpha()
                .toCanvas();
            circle.fillColor = {
                itempattern: {
                    item: texture
                }
            }
            circle.position = [180, 60]
        }
            break
    }


    return circle
}

let offsetX = 5
var mozimg = new Image();
mozimg.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
var mozimg2 = new Image();
mozimg2.src = 'https://www.dotabuff.com/assets/skills/silencer-last-word-5379-f67dc5cefa7335c3560e61ad050dda9e0db6c5865b82e5cb8b367a254c365f63.jpg';

function app_init(paper) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    $("#noisefill").click(() => {

        fillPaper('noise')
    })
    $("#pixelate").click(() => {

        fillPaper('pixelate')
    })
    $("#fillnative").click(() => {
        if (mozimg.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var pattern = ctx.createPattern(mozimg, 'repeat');


            // ctx.save();
            ctx.translate(offsetX, 0)
            ctx.fillStyle = pattern;
            ctx.fillRect(10, 10, 300, 300);
            ctx.translate(-offsetX, 0)
            offsetX += 7
            // ctx.restore();
            console.log("offset", offsetX)

        }
        ;

    })
    $("#fillnative2").click(() => {
        var texture = new TG.Texture(256, 256)
            .add(new TG.Noise())
            .set(new TG.Pixelate().size(5, 5))
            .alpha()
            .toCanvas();

        if (mozimg2.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var pattern = ctx.createPattern(mozimg2, 'repeat');
            var pattern2 = ctx.createPattern(texture, 'repeat');


            ctx.save();
            ctx.translate(offsetX, 0)
            ctx.fillStyle = pattern;
            ctx.fillRect(10, 10, 300, 300);
            ctx.translate(-offsetX, 0)
            offsetX += 7
            ctx.restore();


            // ctx.fillStyle = "#F00";
            ctx.fillStyle = pattern2;
            ctx.fillRect(60, 40, 160, 260);

            console.log("offset", offsetX)



        }
        ;

    })
    $("#fillpaper1").click(() => {
        testObj = fillPaper(1)
    })
    $("#fillpaper2").click(() => {
        testObj = fillPaper(2)
    })
    $("#fillpaper3").click(() => {
        testObj = fillPaper(3)
    })

    $("#itemfill").click(() => {
        testObj = itemfill(1)
    })
    $("#itemfill2").click(() => {
        testObj = itemfill(2)
    })
    $("#itemfill3").click(() => {
        testObj = itemfill(3)
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

    // testObj = fillPaper(1)
// testObj=    itemfill(1)
})
