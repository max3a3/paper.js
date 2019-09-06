/*paperscript*/
/* see circles.html */

let path
function onMouseDrag(event) {
    // The radius is the distance between the position
    // where the user clicked and the current position
    // of the mouse.
    path = new Path.Circle({
        center: event.downPoint,
        radius: (event.downPoint - event.point).length,
        fillColor: 'white',
        strokeColor: 'black'
    });

    path.fullySelected=true

    // Remove this path on the next drag event:
    path.removeOnDrag();
};
class MyClass { // test of using acorn
    get message() {
        return 'Haxxxllo Welt!'
    }

    saySomething() {
        console.log(this.message)
    }
}

function onMouseUp() {
    if(path)
        path.fullySelected=false
    path=null
    new MyClass().saySomething()
}
