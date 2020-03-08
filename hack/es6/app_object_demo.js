/*
 test settting color to a object that is created by csutom tool

first define a rect then create a custom object


 */

function btn_exec_handler() {
    console.log("btn_1")
    // console.log($("#textinput").val())
    let paper = window.paper

    let ret = paper.execute($("#textinput").val())
    console.log("result", ret)

}

async function btn_load_handler() {
    const script_text = "a\nb\nc\n\nd"
    $("#textinput").val(script_text)

    let response = await axios.get('es6/app1_embed.js')
    $("#textinput").val(response.data)

}
function init_drawing(paper) {
    let style = {
        fillColor: new paper.Color(1, 1, 0),
        strokeColor: 'black',
        strokeWidth: 2
    };

    let start_pt = [70, 35]
    let start = new paper.Point(start_pt);
    // Move to start and draw a line from there
    let path = new paper.Path();
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([100, 150]));

    path.style = style  // necessary?

// second path
    path = new paper.Path();
    start = start.add([90,30])
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([100, 150]));
    path.style = style
    path.strokeColor = 'red'


}
function btn_handler(n) {
    paper.project.clear()
    switch (n) {
        case 'test_bone': {
            console.log("test_bone")
        }
            break
    }
}
function app_init(paper) {

    let star_tool = ObjectCreationTool(paper, star_object)
    let circletool = CircleTool(paper)
    let select_tool = SelectTool(paper, star_object)
    let transform_tool = TransformTool(paper)
    let bone_tool = BoneTool(paper)

    select_tool.props = {
        onNewSelection:(items)=>transform_tool.activate()
    }
    console.log("select_tool")
    select_tool.activate()

    $("#t_star").click(() => {console.log("star_tool");star_tool.activate()});
    $("#t_circle").click(() => {console.log("circletool");circletool.activate()});
    $("#t_select").click(() => {console.log("select_tool");select_tool.activate()});
    $("#t_transform").click(() => {console.log("transform_tool");transform_tool.activate()});
    $("#bone_tool").click(() => {console.log("bone_tool");bone_tool.activate()});
    $("#clear").click(() => btn_handler('clear'));

    $("#b_dump").click(()=>{
        let value = paper.project.exportJSON({asString: false})
        $("#textinput").val(JSON.stringify(value, undefined, 2))
    })
    pg.layer.setup()
}
document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)

    init_drawing(paper)

})

let pg = {}  // global to hold other stuff
