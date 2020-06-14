
// copied most code from ps_object_test
async function btn_load_handler() {

    let response = await axios.get(`particle_script.js`)


    let script =response.data
    let ret = paper.execute(script,{customApp:true,props:{}})

   if (ret && ret.customTool)
       ret.customTool.activate()  // call it explicitly [by default not called]
}
function app_init(paper) {
    $("#btn_load").click(()=>btn_load_handler());

    paper.view.onFrame = (event)=>{

        if (paper.tool && paper.view.isDragging())
            paper.tool.emit('frame',event) // will call tool onframe if defined
    }

    btn_load_handler()
}
function init_drawing(paper) {
    let style = {
        fillColor: new paper.Color(1, 1, 0),
        strokeColor: 'black',
        strokeWidth: 2
    };

    let start_pt = [70, 35]
    let start = new paper.Point(start_pt);
    // Move to start and draw a line from there
    let path = new paper.Path();
    path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([100, 150]));

    path.style = style  // necessary?

}

document.addEventListener('DOMContentLoaded', () => {

    var canvas = document.getElementById('canvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    app_init(paper)

    init_drawing(paper)

})
/* doc


paperscript need to define customTool
  then call customTool.activate() in sketchscripter
    (probabley no need in the editor since we do that anyway)

need to install view onFrame, to pass it to the tool.onFrame

---------
code doc

code flow for mouseevent
    function handleMouseMove(view, event, point) {  src/view/View.js:1065
        view._handleMouseEvent('mousemove', event, point);  src/view/View.js:1312


view has
    dragging flag, that cause change mousemove to mousedrag
      but this is in its own closure, so onDragging is defined in this closure

class hierarchy
    Tool < PaperScopeItem < Emitter
      PaperScopeItem  handle emitting activate deactivate  event
    View < Emitter

    it uses Emitter pattern so item hierarchy can define
      handler that bubbles up [this is done by overriding _installEvents  src/item/Item.js:1374


    Emitter has a list of callback and you can check in
      this.responds(str)

  the Tool _events  define which callback that it cares


 */
