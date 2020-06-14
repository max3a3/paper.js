const STAR_POINTS = 30
const STAR_LAYER = 8
STAR_COLOR = 'red'
function createObject() {
    const group = new paper.Group();
    const start_i = 1;
    for (let i = start_i; i < start_i+STAR_LAYER; i++) {
        const path = new paper.Path({
            fillColor: i % 2 ? STAR_COLOR : 'white',
            strokeColor: 'black',
            closed: true
        });
        const offset = new paper.Point(20 + 10 * i, 0);
        const l = offset.length;
        for (let j = 0; j < STAR_POINTS * 2; j++) {
            offset.angle += 360 / STAR_POINTS;
            const vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
            path.add(offset.add(vector));
        }
        path.smooth({
            type: 'continuous'
        });
        group.insertChild(0,path)
    }
    group.position = [300, 150]
    return group
}
console.log('script run')
console.log('document',document)

// example of access to main app global  document global is nulled if customApp for safety reason
if (document.getElementById) {  // document is empty object with customApp parameter when executing script
    k = document.getElementById('textinput')
    if (k)
        k.value = 30
}

if (!paper.customApp)
    createObject()

module.exports = {
    createObject,
    props:{STAR_POINTS,STAR_LAYER}}
