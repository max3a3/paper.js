function ObjectCreationTool(paper, custom_object) {
    const tool = new paper.Tool();
    let mouseDown;
    let path; // last path
    let rect;
    let options = {roundedCorners: false}

    tool.onMouseDown = function (event) {
        mouseDown = event.downPoint;
    };


    tool.onMouseDrag = function (event) {
        if (event.event.button > 0) return;  // only first mouse button

        rect = new paper.Rectangle(event.downPoint, event.point);


        path = new paper.Path.Rectangle(rect);


        // path.fillColor = TOOLS_OPTION_COLORS(getState()).fill
        path.strokeColor = 'black'

        // Remove this path on the next drag event:
        path.removeOnDrag();

    };

    tool.onMouseUp = (event) => {
        console.log("rect created on path")
        let pt = event.downPoint
        custom_object.create(path, paper, event.downPoint, event.point)
        path.remove()
    }
    tool.onActivate = () => {
        console.log('tool activate event')
    }
    tool.onDeactivate = () => {
        console.log('tool deactivate event')
    }
    return tool
}
function CircleTool(paper, custom_object) {
    const tool = new paper.Tool();
    let mouseDown;
    let path; // last path
    let rect;

    tool.onMouseDrag = function (event) {
        path = new Path.Circle({
            center: event.downPoint,
            radius: (event.downPoint.subtract(event.point)).length,
            fillColor: 'red',
            strokeColor: 'black'
        });

        path.fullySelected=true

        // Remove this path on the next drag event:
        path.removeOnDrag();
    };

    tool.onMouseUp = (event) => {
        if (path)
            path.remove()
        path = new Path.Circle({
            center: event.downPoint,
            radius: (event.downPoint.subtract(event.point)).length,
            fillColor: 'blue',
            strokeColor: 'black'
        });
    }
    tool.onActivate = () => {
        console.log('circle tool activate event')
    }
    tool.onDeactivate = () => {
        console.log('circle tool deactivate event')
    }
    return tool
}
