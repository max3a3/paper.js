/*
not yet custom object test of using paperscript
of

paper star


*/
class CustomObject {

    create(path, paper, from_pt, to_pt) {
        var num_points = 32
        var group = new paper.Group()
        var i = 9
        var path = new paper.Path({
            fillColor:   'red',
            strokeColor:  'black',
            closed: true
        });
        var offset = new paper.Point(20 + 10 * i, 0);
        var l = offset.length;
        for (var j = 0; j < num_points * 2; j++) {
            offset.angle += 360 / num_points;
            var vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
            path.add(offset.add(vector));
        }
        path.smooth({type: 'continuous'});
        group.addChild(path)

        let bounds = new paper.Rectangle(from_pt, to_pt);
        group.bounds = bounds
    }
}

let star_object = new CustomObject()
