

document.addEventListener('DOMContentLoaded', () => {
    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    let style = {
        fillColor: new paper.Color(1, 0.3, 0),
        strokeColor: 'black',
        strokeWidth: 2
    };

    let path = path1()
    path.style = style  // necessary?

    turtle.x = 350;
    turtle.y = 30;
    turtle.penDown = true;
    turtle.forward(50)
    turtle.left(90).forward(80)
    path = turtle.path
    
    demo()  // test consoloe
});

function path1(){
    let start_pt=[10, 55]
    let start = new paper.Point(start_pt);
    // Move to start and draw a line from there

    let path = new paper.Path(start);
    // path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:

    // add return new point
    start = start.add([50, 250])
    path.lineTo(start);
    start = start.add([20, -300])
    path.lineTo(start);
    return path
}
