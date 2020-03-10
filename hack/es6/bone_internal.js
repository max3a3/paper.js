
function deg2rad(d) {
    return d * Math.PI / 180
}

let BoneClass = paper.CompoundPath.extend({
    _class: 'CustomBoneClass', // must have

    initialize: function CustomBoneClass(paper, props = {}) {
        this._paper = paper

        CustomBoneClass.base.call(this, props);
        let {options} = props
        this._options = options
        this._callCreate(options)

    },
    setOptions: function (opt) {   //<---   prop change
                                   // pass down option object
        this._options = opt; // cache for getOptions call

        this._callCreate(opt); // recreate the custom

    },
    getOptions: function () {   //<---   prop getter
        return this._options
    },

    _callCreate(opt) {
        this.removeChildren()

        const BONE_RADIUS = 12
        let end = new paper.Point(opt.bone)
        let path

        if (!opt.draw_orient) {
            path = new this._paper.Path.Circle({center: end, radius: BONE_RADIUS})
            this.addChild(path)
        }

        if (opt.draw_orient) {// draw the orientation
            let orient = opt.orient
            let x = end.x
            let y = end.y
            let v0 = new paper.Point([x + BONE_RADIUS * Math.cos(deg2rad(0 + orient)), y + BONE_RADIUS * Math.sin(deg2rad(0 + orient))])
            let v1 = new paper.Point([x + BONE_RADIUS * Math.cos(deg2rad(120 + orient)), y + BONE_RADIUS * Math.sin(deg2rad(120 + orient))])
            let v2 = new paper.Point([x + BONE_RADIUS * Math.cos(deg2rad(240 + orient)), y + BONE_RADIUS * Math.sin(deg2rad(240 + orient))])

            path = new this._paper.Path([v0, v1, v2]);
            path.closed = true;
            this.addChild(path)  // triangle inside the circle

            path = new this._paper.Path.Circle({center: v1, radius: 3})  // small dot at base
            this.addChild(path)

            path = new this._paper.Path.Circle({center: v2, radius: 3})// small dot at base
            this.addChild(path)
        }

        if (opt.parent) {

            let start = new paper.Point(opt.parent)
            var arrowVec = start.subtract(end);
            arrowVec.angle += 90

            //todo the tirangle base should take the view zoom into account?
            var base = arrowVec.normalize(3)
            let start1 = start.add(base)
            let start2 = start.subtract(base)

            let line = new this._paper.Path([start1, start2, end])
            line.closed=true
            this.addChild(line)
        }
    }
})
