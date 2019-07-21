class CustomObject {
    create(paper, from_pt, to_pt) {


        let from = new Point(184, 148)
        let to = new Point(252, 208)

        let rect = new paper.Rectangle(from, to);
        let rectangle = new paper.Path.Rectangle(rect);
        rectangle.strokeColor = 'black'


        let layer = project.activeLayer;

        let values = {
            count: 34,
            points: 32
        };
        let i = 0; // star offset

        let path = new Path({
            fillColor: i % 2 ? 'red' : 'black',
            closed: true
        });

        let offset = new Point(20 + 10 * i, 0);
        let l = offset.length;
        for (let j = 0; j < values.points * 2; j++) {
            offset.angle += 360 / values.points;
            let vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
            path.add(offset + vector); // new point
        }


        //    path.smooth({ type: 'continuous' });
        layer.insertChild(0, new Group({
            children: [path],
            applyMatrix: false
        }));

    }
}

let star_object = new CustomObject()
