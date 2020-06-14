/*
 test settting color to a object that is created by csutom tool

first define a rect then create a custom object


 */

function btn_exec_handler() {
    console.log("btn_1")
    // console.log($("#textinput").val())
    let paper = window.paper
    paper.customApp = false // this is in the scope, set to true when passing props in btn_object_handler
    let script = $("#textinput").val()

    let ret = paper.execute(script);  // the script has

    // let ret = paper.execute(script,{customApp:true,props:{STAR_POINTS:10,STAR_LAYER:4,STAR_COLOR:'yellow'}})
    console.log("btn_exec_handler result", ret)
    // let obj = ret.createObject() // execute function declared in the script
}

function btn_object_handler(pos, props) {
    let script = $("#textinput").val()
    let ret = paper.execute(script,{customApp:true,props})
    console.log("result", ret)

    let obj = ret.createObject() // execute function declared in the script
    obj.position = pos
}

async function btn_load_handler(filename='ps_object_1.js') {

    let response = await axios.get(`es6/${filename}`)
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
    $("#obj_1").click(()=>btn_object_handler([80,40],{STAR_LAYER:2}));
    $("#obj_2").click(()=>btn_object_handler([140,120],{STAR_COLOR:'yellow',STAR_POINTS:10}));


    $("#btn_print").click(()=>{
        let value = paper.project.exportJSON({asString: false})
        $("#textinput").val(JSON.stringify(value, undefined, 2))
    })
    btn_load_handler()//('ps_ast_test.js')//()
}
document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)

    init_drawing(paper)

})

let pg = {}  // global to hold other stuff
