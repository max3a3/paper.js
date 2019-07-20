function onMouseDrag(event) {
    // The radius is the distance between the position
    // where the user clicked and the current position
    // of the mouse.
    var path = new Path.Circle({
        center: event.downPoint,
        radius: (event.downPoint - event.point).length,
        fillColor: 'white',
        strokeColor: 'black'
    });

    // Remove this path on the next drag event:
    path.removeOnDrag();
};
