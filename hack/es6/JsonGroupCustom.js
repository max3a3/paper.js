let JsonGroupClassPaper = paper.Group.extend({
    _class: 'JsonGroupClass', // must have
    // add options getter and setter
    initialize: function CustomGroupClass(options = {}) {
        // call  super
        CustomGroupClass.base.call(this,options); //StarClass is the function name
        this.importJSON(['JsonGroupClass', options.jsonData])
    }
})
