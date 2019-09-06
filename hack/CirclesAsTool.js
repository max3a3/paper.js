/*paperscript will create tool global */
/* see circles.html */
tool.onMouseDrag = (event) =>{
    // The radius is the distance between the position
    // where the user clicked and the current position
    // of the mouse.
    debugger
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
