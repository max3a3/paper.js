class Turtle {
    constructor() {
        this.x = 0
        this.y = 0
        this.angleInRadians = 0
        this.penDown = false
        this.penColor = "black"
        this.fillColor = "blue"
        this.lineWidth = 2
        this.path = null
    }

    forward(length) {
        // console.log('forward(' + length + ')');
        // this.logPenStatus();
        let x0 = this.x,
            y0 = this.y;

        this.x += length * Math.sin(this.angleInRadians);
        this.y += length * Math.cos(this.angleInRadians);

        if (this.penDown) {
            let create_path = false
            if (this.path) {
                // this.path.lineTo(this.x, this.y)
        }else {
                this.path = new paper.Path([x0, y0])
                create_path = true

            }
            if (create_path) {
                let style = {
                    fillColor: this.fillColor,
                    strokeColor: this.penColor,
                    strokeWidth: 2
                };
                this.path.style = style
            }
            this.path.lineTo(this.x, this.y)

        }
        return this;
    }


    left(angleInDegrees) {
        // console.log('left(' + angleInDegrees + ')');
        // A complete circle, 360º, is equivalent to 2π radians
        // angleInDegrees is an angle measure in degrees
        this.angleInRadians += angleInDegrees * Math.PI / 180.0;
        return this;
    }


}

let turtle = new Turtle()


