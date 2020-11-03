
// from D:\work\drawing-samples\papergrapher\js\tools\draw.js
function createPathTool(paper) {
    const tool = new paper.Tool();
    let path
    let optionPointDistance = 20
    tool.onMouseDown = function(event) {
        path = new Path();
        tool.fixedDistance = optionPointDistance
        path.strokeColor = '#000'
        path.strokeWidth = 2
    }
    tool.onMouseDrag = function(event) {
        if(event.event.button > 0) return;  // only first mouse button

        var offset = event.delta;
//        offset.angle += 90; // why this is for multi line
        path.add(event.middlePoint.add( offset))
    };

    tool.onMouseUp = function(event) {
        path.smooth()
    }
}
