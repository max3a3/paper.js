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

document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    let style = {
        fillColor: new paper.Color(1, 1, 0),
        strokeColor: 'black',
        strokeWidth: 2
    };

    let start_pt = [70, 5]
    let start = new paper.Point(start_pt);
    // Move to start and draw a line from there
    let path = new paper.Path();
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([200, 250]));

    path.style = style  // necessary?


    let star_tool = ObjectCreationTool(paper, star_object)
    let circletool = CircleTool(paper)
    let select_tool = SelectTool(paper, star_object)
    let transform_tool = TransformTool(paper)

    console.log("select_tool")
    circletool.activate()

    $("#t_star").click(() => {console.log("star_tool");star_tool.activate()});
    $("#t_circle").click(() => {console.log("circletool");circletool.activate()});
    $("#t_select").click(() => {console.log("select_tool");select_tool.activate()});
    $("#t_transform").click(() => {console.log("transform_tool");transform_tool.activate()});
})

