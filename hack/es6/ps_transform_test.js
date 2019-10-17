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

    path.style = style  // necessary?

    object_group = new paper.Group()
    object_group.applyMatrix = false
    object_group.addChild(path)
    console.log("object_group.position",object_group.position)

  //  object_group.position = [0,0] // move x,y
}
function app_init(paper) {

    $("#transform1").click(() => {
        console.log("star_tool");
        let itemGroup = new paper.Group(object_group)

        //todo necessary?
        itemGroup.applyMatrix = false;

        let pivot = itemGroup.position
        itemGroup.scale(0.4,0.4,pivot)
        itemGroup.applyMatrix = true;
        itemGroup.layer.addChildren(itemGroup.children);
        itemGroup.remove();


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
