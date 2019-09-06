// see circles.html

const TEST = 0
const STAR_POINTS = 30
const STAR_LAYER = 8

function createStar() {
    const group = new paper.Group();
    const start_i = 1;
    for (let i = start_i; i < start_i+STAR_LAYER; i++) {
        const path = new paper.Path({
            fillColor: i % 2 ? 'red' : 'white',
            strokeColor: 'black',
            closed: true
        });
        const offset = new paper.Point(20 + 10 * i, 0);
        const l = offset.length;
        for (let j = 0; j < STAR_POINTS * 2; j++) {
            offset.angle += 360 / STAR_POINTS;
            const vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
            path.add(offset.add(vector));
        }
        path.smooth({
            type: 'continuous'
        });
        group.insertChild(0,path)
    }
    group.position = [300, 150]
    return group
}

let mouseDown = false
let object = null
if (TEST)
    object = createStar()

function onMouseDown(event) {
    mouseDown = true
}

function onMouseDrag(event) {
    if (mouseDown) {
        const offset = event.point.subtract(event.downPoint);
        if (Math.abs(offset.x) > 0.5 && Math.abs(offset.y) > 0.5) {
            if (!object)
                object = createStar()

            const offset = event.point.subtract(event.downPoint);
            const width = Math.abs(offset.x);
            const height = Math.abs(offset.y);
            let start = event.downPoint

            let bounds = new Rectangle()
            if (offset.x < 0) {
                bounds.left = event.point.x;
                bounds.right = start.x;
            } else {
                bounds.left = start.x;
            }
            if (offset.y > 0) {
                bounds.top = start.y;
                bounds.bottom = event.point.y;
            } else {
                bounds.top = event.point.y;
            }
            if (width > 0) {
                bounds.width = width;
            }
            if (height > 0) {
                bounds.height = height;
            }
            object.bounds = bounds
        }
    }

};

function onMouseUp(event) {
    mouseDown = false
    object = null
}

tool.onMouseDrag = onMouseDrag
tool.onMouseUp = onMouseUp
tool.onMouseDown = onMouseDown

// tool.activate()
