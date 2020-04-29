

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
    start = start.add([90, 30])
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([100, 150]));
    path.style = style
    path.strokeColor = 'red'


}

let AppState = {}
let COLORS = {0: "blue", 4: "brown", 1: "red", 2: "green", 3: "yellow"};
let ColorIndex = 0

function btn_handler(n) {
    switch (n) {
        case 'clear': {
            paper.project.clear()
            break
        }
            break
       case 'svgimport': {
            paper.project.clear()
           // let svgfile = 'cap.svg'
           let svgfile = 'cap_stitches_problem.svg'
           // let svgfile = 'gradient_eye.svg'
            fetch(`./${svgfile}`).then(resp => {
                    resp.text().then(data => {
                        debugger
                        console.log("data")
                        paper.project.importSVG(data)
                    })
                },
                err => console.log('**fetch err ' + err))
           break
        }
    }
}


function app_init(paper) {


    // console.log("select_tool")
    // select_tool.activate()


    $("#t_star").click(() => {
        console.log("star_tool");
    });
    $("#t_circle").click(() => {
        console.log("circletool");
    });
    $("#clear").click(() => btn_handler('clear'));
    $("#svgimport").click(() => {
        btn_handler('svgimport')
    });

    $("#b_dump").click(() => {
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
