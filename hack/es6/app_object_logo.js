class Turtle {
    constructor() {
        this.reset()
    }
    reset() {
        this.x = 0
        this.y = 0
        this.angleInRadians = 0
        this.penDown = false
        this.penColor = "black"
        this.fillColor = "blue"
        this.lineWidth = 2
        this.path = null
        this.group = null
    }
    forward(length) {
        // console.log('forward(' + length + ')');
        // this.logPenStatus();
        let x0 = this.x,
            y0 = this.y;

        this.x += length * Math.sin(this.angleInRadians);
        this.y += length * Math.cos(this.angleInRadians);

        if (this.penDown) {

            if (!this.path) {
                this.path = new paper.Path([x0, y0])
                let style = {
                    fillColor: this.fillColor,
                    strokeColor: this.penColor,
                    strokeWidth: 2
                };
                this.path.style = style

                if (!this.group) {
                    this.group = new paper.Group()
                    paper.project.activeLayer.addChild(this.group)
                }

                this.group.addChild(this.path)
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

    right(angleInDegrees) {
        return this.left(-angleInDegrees)
    }

    backward(length) {
        return this.forward(-length)
    }

    pd() {
        this.penDown = true
        return this
    }

    pu() {
        this.penDown = false
        this.path = null
        //todo create other path
        return this
    }

}

let turtle = new Turtle()


