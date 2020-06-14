let object_group
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
    path.applyMatrix = false
    let pathMatrix = new Matrix().translate([140,0])
    path.transform(pathMatrix)
    path.style = style  // necessary?

    object_group = new paper.Group()
    object_group.applyMatrix = false // initial setup has matrix at group
    object_group.addChild(path)
    console.log("object_group.position",object_group.position)

  //  object_group.position = [0,0] // move x,y
}
function app_init(paper) {

    $("#transform1").click(() => {
        console.log("scaling group matrix");
        let itemGroup = new paper.Group(object_group)


        let pivot = itemGroup.position
        itemGroup.scale(0.4,0.4,pivot)
        itemGroup.applyMatrix = true;
        itemGroup.layer.addChildren(itemGroup.children);
        itemGroup.remove();


    });
    $("#transform2").click(() => {
        console.log("scaling group should pass down to child matrix");

        object_group.applyMatrix = true;// this test should pass down

        let pivot = object_group.position
        object_group.scale(0.4,0.4,pivot)


    });
    $("#transform3").click(() => {
        console.log("moving group should pass down to child matrix");

        object_group.applyMatrix = true;// this test should pass down

        object_group.position = object_group.position.add([0,40])


    });
    $("#movegroup").click(() => {
        let position = object_group.position
        object_group.position = position.add(50,20)})
    $("#b_dump").click(()=>{
        let value = paper.project.exportJSON({asString: false})
        $("#textinput").val(JSON.stringify(value, undefined, 2))
    })
}
document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)

    init_drawing(paper)

})

let pg = {}  // global to hold other stuff
