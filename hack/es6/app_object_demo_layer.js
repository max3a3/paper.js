// this is simple javascript function include
const pg_layer = function () {
    var setup = function () {
        var defaultLayer = addNewLayer('Default layer');
        defaultLayer.data.isDefaultLayer = true;
        defaultLayer.data.id = getUniqueLayerID();

        ensureGuideLayer();

        defaultLayer.activate();
        // pg.layerPanel.updateLayerList();
    };
    var ensureGuideLayer = function () {
        if (!getGuideLayer()) {
            var guideLayer = addNewLayer('pg.internalGuideLayer');
            guideLayer.data.isGuideLayer = true;
            guideLayer.data.id = getUniqueLayerID();
            guideLayer.bringToFront();
        }
    };
    var getUniqueLayerID = function () {
        var biggestID = 0;
        for (var i = 0; i < paper.project.layers.length; i++) {
            var layer = paper.project.layers[i];
            if (layer.data.id > biggestID) {
                biggestID = layer.data.id;
            }
        }
        return biggestID + 1;
    };

    var addNewLayer = function (layerName, setActive, elementsToAdd) {
        layerName = layerName || null;
        setActive = setActive || true;
        elementsToAdd = elementsToAdd || null;

        var newLayer = new paper.Layer();

        newLayer.data.id = getUniqueLayerID();

        if (layerName) {
            newLayer.name = layerName;
        } else {
            newLayer.name = 'Layer of ' + layerNames[Math.floor(Math.random() * layerNames.length)];
        }

        if (setActive) {
            newLayer.activate();
        }

        if (elementsToAdd) {
            newLayer.addChildren(elementsToAdd);
        }

        var guideLayer = getGuideLayer();
        if (guideLayer) {
            guideLayer.bringToFront();
        }
        return newLayer;
    };
    var getGuideLayer = function () {
        for (var i = 0; i < paper.project.layers.length; i++) {
            var layer = paper.project.layers[i];
            if (layer.data && layer.data.isGuideLayer) {
                return layer;
            }
        }
        return false;
    };

    return {
        setup,
        getGuideLayer
    }
}()
