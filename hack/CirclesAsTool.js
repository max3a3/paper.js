/*paperscript will create tool global */
tool.onMouseDrag = (event) =>{
    // The radius is the distance between the position
    // where the user clicked and the current position
    // of the mouse.
    path = new Path.Circle({
        center: event.downPoint,
        radius: (event.downPoint - event.point).length,
        fillColor: 'red',
        strokeColor: 'black'
    });

    path.fullySelected=true

    // Remove this path on the next drag event:
    path.removeOnDrag();
};
