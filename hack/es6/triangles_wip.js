
let num_width = 20
let num_height = 10

let radius = 50
radian = Math.PI / 180
let triangle = new Path.RegularPolygon(new Point(50, 110),
    3, radius)
triangle.fillColor = 'blue';

let width = Math.cos(30 * radian) * radius * 2,
    height = Math.tan(60 * radian) * (width / 2),
    tWidth = Math.cos(30 * Math.PI / 180) * radius * 2,
    tHeight = Math.sin(30 * Math.PI / 180) * radius + radius,

//---
    nrHoriz = 4;
nrVerti = 3
series1 = {
    startX: -radius,
    startY: 0,
}
// Pointing up series
series2 = {
    startX: -radius + width / 2.65,
    startY: radius * 2 - height - (radius / 8),
}


i = nrHoriz;
while (i > 0) {
    i--
    j = nrVerti;
    while (j) {
        j -= 1;
        offset = (j % 2 === 0 ? 0 : tWidth / 2);
        triangle = new Path.RegularPolygon(new Point(series1.startX + (i * tWidth) + offset, series1.startY + (j * tHeight)), 3, radius);
        triangle.fillColor = 'red';
        triangle.rotate(60, triangle.bounds.center);
        triangle.x = i;
        triangle.y = j;


        triangle = new Path.RegularPolygon(new Point(series2.startX + (i * tWidth) + offset, series2.startY + (j * tHeight)), 3, radius);
        triangle.fillColor = 'green';
        triangle.x = i;
        triangle.y = j;

    }
}
