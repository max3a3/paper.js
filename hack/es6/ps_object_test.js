/*
 test settting color to a object that is created by csutom tool

first define a rect then create a custom object


 */

function btn_exec_handler() {
    console.log("btn_1")
    // console.log($("#textinput").val())
    let paper = window.paper
    paper.customApp = true
    let script = $("#textinput").val()

    let ret = paper.execute(script,{customApp:true})
    console.log("result", ret)
}

async function btn_load_handler() {

    let response = await axios.get('es6/ps_object_1.js')
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

}
function app_init(paper) {

    $("#btn_exec").click(()=>btn_exec_handler());
    $("#btn_load").click(()=>btn_load_handler());

    $("#clear").click(()=>    paper.project.clear());


    $("#btn_print").click(()=>{
        let value = paper.project.exportJSON({asString: false})
        $("#textinput").val(JSON.stringify(value, undefined, 2))
    })
    btn_load_handler()
}
document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)

    init_drawing(paper)

})

let pg = {}  // global to hold other stuff
