// copied most code from ps_object_test
async function btn_load_handler(filename='particle_script.js') {

    let response = await axios.get(`particle_script.js`)


    let script =response.data
    let ret = paper.execute(script,{customApp:true,props:{}})

}
function app_init(paper) {
    $("#btn_load").click(()=>btn_load_handler());

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

document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)

    init_drawing(paper)

})
