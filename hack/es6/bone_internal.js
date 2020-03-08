
let TriJointClass = paper.Path.extend({
    _class: 'CustomTriJointClass', // must have

    initialize: function CustomTriJointClass(paper, props = {}) {

        CustomTriJointClass.base.call(this,props);
        let {options} = props
        this._options = options
        this._callCreate(options)
        this.closed = true

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
        let start = new paper.Point(opt.start)
        let end = new paper.Point(opt.end)

        var arrowVec = start.subtract(end);
        arrowVec.angle += 90

        //todo the tirangle base should take the view zoom into account?
        var base = arrowVec.normalize(5)
        let start1 = start.add(base)
        let start2 = start.subtract(base)
        this.setSegments([start1, start2, end])
    }
})
