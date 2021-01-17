var testObj

function init_drawing(paper) {
    let style = {
        // fillColor: new paper.Color(1, 1, 0),
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
    path.lineTo(start.add([180, 130]));
    // path.closed = true
    path.smooth()
    path.applyMatrix = false
    path.style = style  // necessary?


    let bounds = path.getBounds()
    return path
}

function move(object) {
    let pos = object.position

    object.position = pos.add([5, 0])
}


function move(object) {
    let pos = object.position

    object.position = pos.add([5, 0])
}

function testSymbol(type) {
    switch (type) {
        case 1:
            testStarSymbol()
            break

        case 2:
            testRasterSymbol()
            break

    }
}
let rasterDict  = {}
let imageDict = {}
function loadImage(url,entry) {

    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload=ev=>{
        rasterDict[entry]=new paper.Raster(img)
    }
    imageDict[entry] = img
    return img
}

// run http-server --cors
var gImage1
function testRasterSymbol() {

    var raster = new paper.Raster(gImage1);


// Create a symbol definition from the path:
    var definition = new paper.SymbolDefinition(raster);

// Place 100 instances of the symbol:
    for (var i = 0; i < 100; i++) {
        // Place an instance of the symbol in the project:
        var instance = new paper.SymbolItem(definition);

        // Move the instance to a random position within the view:
        instance.position = paper.Point.random().multiply(paper.project.view.size);

        // Rotate the instance by a random amount between
        // 0 and 360 degrees:
        instance.rotate(Math.random() * 360);

        // Scale the instance between 0.25 and 1:
        instance.scale(0.25 + Math.random() * 0.75);
    }
}
function testStarSymbol() {

    var path = new paper.Path.Star({
        center: new paper.Point(0, 0),
        points: 6,
        radius1: 5,
        radius2: 13,
        fillColor: 'white',
        strokeColor: 'black'
    });

// Create a symbol definition from the path:
    var definition = new paper.SymbolDefinition(path);

// Place 100 instances of the symbol:
    for (var i = 0; i < 100; i++) {
        // Place an instance of the symbol in the project:
        var instance = new paper.SymbolItem(definition);

        // Move the instance to a random position within the view:
        instance.position = paper.Point.random().multiply(paper.project.view.size);

        // Rotate the instance by a random amount between
        // 0 and 360 degrees:
        instance.rotate(Math.random() * 360);

        // Scale the instance between 0.25 and 1:
        instance.scale(0.25 + Math.random() * 0.75);
    }
}

let offsetX = 5
let gContext

function app_init(paper) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    gContext = ctx
    $("#move").click(() => {
        move(testObj)
    })
    $("#testSymbol2").click(() => {
        testSymbol(2)
    })
    $("#blur1").click(()=>{
        testBlur(1)
    })
}

function testBlur(style) {
    switch(style) {
        case 1:
        {
            const imgNone = new Image();
            gContext.filter = 'none';
            gContext.drawImage(imageDict['zigzag'],60, 50)
            gContext.filter = 'blur(2px)';
            gContext.drawImage(imageDict['zigzag'],90, 50)
        }
        break
    }
}
var testObj
document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)
    // rasterDict['zigzag'] has the Raster
    // imageDict['zigzag'] has the IMage
    gImage1 = loadImage('http://localhost:8080/zigzag.png','zigzag')

    testObj = init_drawing(paper)

    // createPathTool(paper)
    createStampTool(paper,rasterDict)
    // testSymbol(1)
    // testObj = fillPaper(1)
// testObj=    itemfill(1)
})
// need to run http-server --cors in D:\HaxeToolkit\projects\test_haxe\Assets\brushsettings
