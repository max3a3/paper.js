function SelectTool(paper) {
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
        const {project} = paper;  // get paper properties
        const {layers} = project;  // paperjs.layers array
        let activeLayerIndex = 0
        if (path) {
            let bounds = path.bounds

            path.remove()
            // todo deselect old
            let layer = layers[activeLayerIndex]
            layer.getItems().map(item=>item.selected=false)

            const items = layers.filter((l, i) => (i === activeLayerIndex))
                .reduce((collection, layer) => collection.concat(layer.getItems({overlapping: bounds})), [])
                .map(item => {
                    item.selected = true;
                    return item
                })
        }
    }
    return tool
}

function TransformTool(paper) {
    const tool = new paper.Tool();
    let mouseDown;
    let path; // last path
    let rect;
    let options = {roundedCorners: false}

    tool.onMouseDown = function (event) {
        mouseDown = event.downPoint;
    };


    tool.onMouseDrag = function (event) {

    };

    tool.onMouseUp = (event) => {
    }
    tool.onActivate = () => {
        console.log('TransformTool activate event')
    }
    tool.onDeactivate = () => {
        console.log('TransformTool deactivate event')
    }
    return tool
}
