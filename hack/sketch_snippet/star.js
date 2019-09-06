let max = 10
for (let i = 0; i < max; i++) {
    var offset = new Point(20 + 10 * i, 0);
}

var star = new Path.Star({
    center: [40, 60],
    points: 3,
    radius1: 20,
    radius2: 40,
    fillColor: 'red'
});
// star.scale(0.5, star.bounds.topRight);

console.log('bound', star.bounds)
//und { x: 5.35898, y: 40, width: 69.28203, height: 60 }
star.bounds.width = 10

let value = project.exportJSON({asString: false})
value = JSON.stringify(value, undefined, 2)

console.log('Project', value)
