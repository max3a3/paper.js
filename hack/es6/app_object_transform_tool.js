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
            path.remove() // remove bounding rectangle

            clearSelection() // clear old

            // new selection
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

// assume only one layer in the prototoype, in paper redux this will be set
let activeLayerIndex = 0// todo can use paper.project.getActiveLayer
function getSelectedItems() {
    const {project} = paper;  // get paper properties
    const {layers} = project;  // paperjs.layers array
    let layer = layers[activeLayerIndex]
    let items = layer.getItems().filter(item => item.selected)
    return (items)
}

function clearSelection() {
    const {project} = paper;  // get paper properties
    const {layers} = project;  // paperjs.layers array
    let layer = layers[activeLayerIndex]
    layer.getItems().map(item => item.selected = false)

}

function TransformTool(paper) {
    const tool = new paper.Tool();
    let mouseDown;
    let path; // last path
    let rect;
    let options = {roundedCorners: false}
    let boundsPath = null
    var boundsScaleHandles = [];
    var boundsRotHandles = [];
    var hitOptions = {
        segments: true,
        stroke: true,
        curves: true,
        fill: true,
        guide: false,
        tolerance: 8 / paper.view.zoom
    };

    var mode = 'none'; // scale, or

    var pivot;  // for scale
    var corner;
    var origPivot;
    var origSize;
    var origCenter;
    var scaleItems;

    // for rotation
    var rotItems = [];
    var rotGroupPivot; // set to center of selection in mousedown
    var prevRot = [];

    var itemGroup; // to record dragging and pass to mouseUp

    function removeBoundsPath() {
        pg.guides.removeHelperItems();
        boundsPath = null;
        boundsScaleHandles.length = 0;
        boundsRotHandles.length = 0;

    }

    function getOpposingRectCornerNameByIndex(index) {
        switch (index) {// index is rotation starting at see getRectCornerNameByIndex
            //  todo combine into one function with option
            case 0:
                return 'topRight';

            case 1:
                return 'rightCenter';

            case 2:
                return 'bottomRight';

            case 3:
                return 'bottomCenter';

            case 4:
                return 'bottomLeft';

            case 5:
                return 'leftCenter';

            case 6:
                return 'topLeft';

            case 7:
                return 'topCenter';
        }
    };

    function getRectCornerNameByIndex(index) {
        switch (index) {
            case 0:
                return 'bottomLeft';

            case 1:
                return 'leftCenter';

            case 2:
                return 'topLeft';

            case 3:
                return 'topCenter';

            case 4:
                return 'topRight';

            case 5:
                return 'rightCenter';

            case 6:
                return 'bottomRight';

            case 7:
                return 'bottomCenter';
        }
    };
    tool.onMouseDown = function (event) {
        if (event.event.button > 0) return;  // only first mouse button

        pg.hover.clearHoveredItem();

        var hitResult = paper.project.hitTest(event.point, hitOptions);
        if (hitResult) {

            if (hitResult.item.data && hitResult.item.data.isScaleHandle) {
                mode = 'scale';
                var index = hitResult.item.data.index;
                pivot = boundsPath.bounds[getOpposingRectCornerNameByIndex(index)].clone();
                origPivot = boundsPath.bounds[getOpposingRectCornerNameByIndex(index)].clone();
                corner = boundsPath.bounds[getRectCornerNameByIndex(index)].clone();
                origSize = corner.subtract(pivot);
                origCenter = boundsPath.bounds.center;

                scaleItems = /*pg.selection.*/getSelectedItems();

            } else if (hitResult.item.data && hitResult.item.data.isRotHandle) {
                mode = 'rotate';
                rotGroupPivot = boundsPath.bounds.center;

                rotItems = /*pg.selection.*/getSelectedItems();

                jQuery.each(rotItems, function (i, item) {
                    prevRot[i] = (event.point.subtract(rotGroupPivot)).angle;
                });

            } else {
                /* deselect don't handle here todo
                                // deselect all by default if the shift key isn't pressed
                                // also needs some special love for compound paths and groups,
                                // as their children are not marked as "selected"
                                if(!event.modifiers.shift) {
                                    var root = pg.item.getRootItem(hitResult.item);
                                    if(pg.item.isCompoundPathItem(root) || pg.group.isGroup(root)) {
                                        if(!root.selected) {
                                            pg.selection.clearSelection();
                                        }
                                    } else if(!hitResult.item.selected) {
                                        pg.selection.clearSelection();
                                    }
                                }
                                // deselect a currently selected item if shift is pressed
                                if(event.modifiers.shift && hitResult.item.selected) {
                                    pg.selection.setItemSelection(hitResult.item, false);

                                } else {
                                    pg.selection.setItemSelection(hitResult.item, true);

                                    if(event.modifiers.alt) {
                                        mode = 'cloneMove';
                                        pg.selection.cloneSelection();

                                    } else {
                                        mode = 'move';
                                    }
                                }

                 */
            }
            // while transforming object, never show the bounds stuff
            removeBoundsPath();

        } else {
            if (!event.modifiers.shift) {
                removeBoundsPath();
                /*pg.selection.*/
                clearSelection();
            }
            mode = 'rectSelection';
        }
    };

    tool.onMouseMove = function (event) {

        //todo not needed?
        // pass to pg guides to move item
        // pg.hover.handleHoveredItem(hitOptions, event);
    };
    function dragRotate(event) {
        var rotAngle = (event.point.subtract(rotGroupPivot)).angle;

        jQuery.each(rotItems, function(i, item) {

            if(!item.data.origRot) {
                item.data.origRot = item.rotation;
            }

            if(event.modifiers.shift) {
                rotAngle = Math.round(rotAngle / 45) *45;  // in 45 degree
                item.applyMatrix = false;
                item.pivot = rotGroupPivot;
                item.rotation = rotAngle;

            } else {
                console.log('drag rotation ',rotAngle - prevRot[i])
                item.rotate(rotAngle - prevRot[i], rotGroupPivot);  // incremental rotation
            }
            prevRot[i] = rotAngle;  // save for each item? todo: it is not the same for all selection
        });
    }
    function dragScale(event) {
        var modOrigSize = origSize;

        // move the selected items [scaleItems] to  itemGroup
        itemGroup = new paper.Group(scaleItems);
        itemGroup.addChild(boundsPath);
        itemGroup.data.isHelperItem = true;
        itemGroup.strokeScaling = false;
        itemGroup.applyMatrix = false;

        if (event.modifiers.alt) {
            pivot = origCenter;
            modOrigSize = origSize * 0.5;
        } else {
            pivot = origPivot;
        }

        corner = corner.add(event.delta);
        var size = corner.subtract(pivot);
        var sx = 1.0, sy = 1.0;
        if (Math.abs(modOrigSize.x) > 0.0000001) {
            sx = size.x / modOrigSize.x;
        }
        if (Math.abs(modOrigSize.y) > 0.0000001) {
            sy = size.y / modOrigSize.y;
        }

        if (event.modifiers.shift) {
            var signx = sx > 0 ? 1 : -1;
            var signy = sy > 0 ? 1 : -1;
            sx = sy = Math.max(Math.abs(sx), Math.abs(sy));
            sx *= signx;
            sy *= signy;
        }
        console.log("scale x,y,pivot", sx, sy, pivot)

        itemGroup.scale(sx, sy, pivot);

        jQuery.each(boundsScaleHandles, function (index, handle) {
            handle.position = itemGroup.bounds[getRectCornerNameByIndex(index)];
            handle.bringToFront();
        });

        jQuery.each(boundsRotHandles, function (index, handle) {
            if (handle) {
                handle.position = itemGroup.bounds[getRectCornerNameByIndex(index)] + handle.data.offset;
                handle.bringToFront();
            }
        });
    }

    tool.onMouseDrag = function (event) {
        if (mode === 'scale') {
            dragScale(event)
        }
        else if (mode==='rotate') {
            dragRotate(event)
        }
    };

    tool.onMouseUp = (event) => {
        if (mode === 'scale') {
            itemGroup.applyMatrix = true;

            // mark text items as scaled (for later use on font size calc)
            for (var i = 0; i < itemGroup.children.length; i++) {
                var child = itemGroup.children[i];
                if (child.data.isPGTextItem) {
                    child.data.wasScaled = true;
                }
            }
// ungroup the child from the scale group before deleting the group
            itemGroup.layer.addChildren(itemGroup.children);
            itemGroup.remove();
            // pg.undo.snapshot('scaleSelection');

            setSelectionBounds();
        }
        else if (mode==='rotate') {
            jQuery.each(rotItems, function(i, item) {
                debugger
                item.applyMatrix = true;
            });

        }
    }

    function setSelectionBounds() {
        var items = /*pg.selection.*/getSelectedItems();


        if (items.length <= 0) return;//----------------->

        var rect = null //new paper.Rectangle(0,0,0,0);

        items.map(item => rect ? rect = rect.unite(item.bounds) : rect = item.bounds)

        if (!boundsPath) { // create new, otherwise just update
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
        boundsPath.parent = pg.layer.getGuideLayer();

        //create the scale and rotate

        jQuery.each(boundsPath.segments, function (index, segment) {
            var size = 4;

            if (index % 2 === 0) {
                size = 6;
            }

            if (index === 7) {
                var offset = new Point(0, 10 / paper.view.zoom);
                boundsRotHandles[index] =
                    new paper.Path.Circle({
                        center: segment.point.add(offset),
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
                        index: index,
                        isScaleHandle: true,
                        isHelperItem: true,
                        noSelect: true,
                        noHover: true
                    },
                    size: [size / paper.view.zoom, size / paper.view.zoom],
                    fillColor: pg.guides.getGuideColor('blue'),
                    parent: pg.layer.getGuideLayer()
                });
        });

    }
    tool.onActivate = () => {
        console.log('TransformTool activate event')
        setSelectionBounds();

    }
    tool.onDeactivate = () => {
        removeBoundsPath(); //old selection
        console.log('TransformTool deactivate event')
    }
    return tool
}
