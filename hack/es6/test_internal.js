function btn_handler(n) {
    console.log("btn_handler",n)
    paper.project.clear()
    switch (n) {
        case 'line': {
            console.log("line")

            let props = {
                "type": "LINE",
                "pathData": "M121.10098,78.4327l127,128",
                "strokeColor": [
                    "Color",
                    0.09804,
                    0.92549,
                    0.63922,
                    1
                ],
                "properties": {
                    "from": {
                        "x": 121.10098266601562,
                        "y": 78.43270111083984
                    },
                    "to": {
                        "x": 248.10098266601562,
                        "y": 206.43270111083984
                    }
                }

            }
            new paper.Path(props)
        }
        break
        case 'line_color': {
            // "strokeColor":new paper.Color([0.09804,
            //     0.92549,
            //     0.63922]),
            // "strokeColor":[0.09804,
            //     0.92549,
            //     0.63922],

            let props = {
                "type": "L33INE",
                "pathData": "M101.10098,78.4327l127,128",
                "strokeColor":"rgba(223,90,90,1)",
                "properties": {
                    "from": {
                        "x": 121.10098266601562,
                        "y": 78.43270111083984
                    },
                    "to": {
                        "x": 248.10098266601562,
                        "y": 206.43270111083984
                    }
                }

            }
            new paper.Path(props)
        }
        case 'bound_rect':
            // change bound see the path data, test in scratchpad

            var star = new paper.Path.Star({
                center: [40, 60],
                points: 3,
                radius1: 20,
                radius2: 40,
                fillColor: 'red'
            });
// star.scale(0.5, star.bounds.topRight);

            console.log('bound', star.bounds)
//und { x: 5.35898, y: 40, width: 69.28203, height: 60 }
            star.bounds.width = 10
            console.log('bound_after', star.bounds)

        break

    }
}

document.addEventListener('DOMContentLoaded', () => {

        var canvas = document.getElementById('canvas');
        // Create an empty project and a view for the canvas:
        paper.setup(canvas);
    $("#add_line_path").click(() => btn_handler('line'));
    $("#add_line_path_color").click(() => btn_handler('line_color'));
    $("#bound_rect").click(() => btn_handler('bound_rect'));

        // not yet
        $("#set_b").click(() => btn_handler('b'));

    }
)
