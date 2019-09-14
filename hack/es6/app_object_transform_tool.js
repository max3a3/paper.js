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
            if (items.length)
                tool.props.onNewSelection(items)
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
    let boundsPath = null
    function removeBoundsPath()
    {

    }

    tool.onMouseDown = function (event) {
        mouseDown = event.downPoint;
    };


    tool.onMouseDrag = function (event) {

    };

    tool.onMouseUp = (event) => {
    }
    tool.onActivate = () => {
        console.log('TransformTool activate event')



        const {project} = paper;  // get paper properties
        const {layers} = project;  // paperjs.layers array
        let activeLayerIndex = 0
        let layer = layers[activeLayerIndex]
        var items = layer.getItems().filter(item=>item.selected)

        if(items.length <= 0) return;//----------------->

        var rect=null //new paper.Rectangle(0,0,0,0);

        items.map(item=>rect? rect = rect.unite(item.bounds):rect = item.bounds )

        if(!boundsPath) { // create new, otherwise just update
            boundsPath = new paper.Path.Rectangle(rect);
            boundsPath.curves[0].divideAtTime(0.5);
            boundsPath.curves[2].divideAtTime(0.5);
            boundsPath.curves[4].divideAtTime(0.5);
            boundsPath.curves[6].divideAtTime(0.5);
        }
        boundsPath.guide = true;
        boundsPath.data.isSelectionBound = true;
        boundsPath.data.isHelperItem = true;
        boundsPath.fillColor = null;
        boundsPath.strokeScaling = false;
        boundsPath.fullySelected = true;
        boundsPath.parent = pg_layer.getGuideLayer();
/*
        jQuery.each(boundsPath.segments, function(index, segment) {
            var size = 4;

            if(index%2 === 0) {
                size = 6;
            }

            if(index === 7) {
                var offset = new Point(0, 10/paper.view.zoom);
                boundsRotHandles[index] =
                    new paper.Path.Circle({
                        center: segment.point + offset,
                        data: {
                            offset: offset,
                            isRotHandle: true,
                            isHelperItem: true,
                            noSelect: true,
                            noHover: true
                        },
                        radius: 5 / paper.view.zoom,
                        strokeColor: pg.guides.getGuideColor('blue'),
                        fillColor: 'white',
                        strokeWidth: 0.5 / paper.view.zoom,
                        parent: pg.layer.getGuideLayer()
                    });
            }

            boundsScaleHandles[index] =
                new paper.Path.Rectangle({
                    center: segment.point,
                    data: {
                        index:index,
                        isScaleHandle: true,
                        isHelperItem: true,
                        noSelect: true,
                        noHover: true
                    },
                    size: [size/paper.view.zoom,size/paper.view.zoom],
                    fillColor: pg.guides.getGuideColor('blue'),
                    parent: pg.layer.getGuideLayer()
                });
        });
    */
    }
    tool.onDeactivate = () => {
        removeBoundsPath(); //old selection
        console.log('TransformTool deactivate event')
    }
    return tool
}
