function RectangleTool(paper,custom_object) {
    const tool = new paper.Tool();
    let mouseDown;
    let path; // last path
    let rect;
    let options = {roundedCorners:false}

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

    tool.onMouseUp=function(event) {
        console.log("rect created on path")
        path.remove()
        let pt = event.downPoint
        custom_object.create(paper,event.downPoint,event.point)
    }
    return tool
}
