// see circles.html

const TEST = 1
function createStar() {
    const group = new paper.Group();
    const i = 9;
    let num_points = 20
    const path = new paper.Path({
        fillColor: 'red',
        strokeColor: 'black',
        closed: true
    });
    const offset = new paper.Point(20 + 10 * i, 0);
    const l = offset.length;
    for (let j = 0; j < num_points * 2; j++) {
        offset.angle += 360 / num_points;
        const vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
        path.add(offset.add(vector));
    }
    path.smooth({
        type: 'continuous'
    });
    group.addChild(path)
    group.position = [300, 150]
    return group
}

mouseDown = false
if (TEST)
    object = createStar()
else
    object = null

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
            object.bounds = bounds // will create a rectlink to object bounds
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
