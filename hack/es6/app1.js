/*
test calling execute to pass in scoope specific script

btn_load will load from es6/app1_embed.js
btn_exec will exec the script
*/
function btn_exec_handler() {
    console.log("btn_1")
    // console.log($("#textinput").val())
    let paper = window.paper

    let ret = paper.execute($("#textinput").val())
    console.log("result",ret)

}
async function btn_load_handler() {
    const script_text = "a\nb\nc\n\nd"
    $("#textinput").val(script_text)

    let response = await axios.get('es6/app1_embed.js')
    $("#textinput").val(response.data)

}
function turtleArrow() {
    turtle.pd()
    turtle.forward(50);
    turtle.left(150);
    turtle.forward(7);
    turtle.backward(7);
    turtle.right(150);
    turtle.right(150);
    turtle.forward(7);
    turtle.backward(7);
    turtle.left(150);
};

function btn_logo_handler(n) {
    switch (n) {
        case 1:
            turtle.x = 350;
            turtle.y = 30;
            turtle.pd().forward(50)
            turtle.left(90).forward(80)

            turtle.pu().forward(80).right(20)
            turtle.pd().forward(20).right(90).forward(80)
            break
        case 2:
            turtle.x = 350;
            turtle.y = 30;
            turtleArrow()
            break
        case 'group':
            let bound = turtle.group.bounds
            console.log("bound",bound)
            break
        case 'size':
            break

    }
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

    $("#btn_exec").click(()=>btn_exec_handler());
    $("#btn_load").click(()=>btn_load_handler());
    $("#btn_logo_1").click(()=>btn_logo_handler(1));
    $("#btn_logo_2 ").click(()=>btn_logo_handler(2));

    $("#logo_group").click(()=>btn_logo_handler('group'));
    $("#logo_size").click(()=>btn_logo_handler('size'));

})

