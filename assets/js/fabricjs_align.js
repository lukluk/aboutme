fabric.Object.prototype.setCenterToOrigin = function() {
    var originPoint = this.translateToOriginPoint(
        this.getCenterPoint(),
        this._originalOriginX,
        this._originalOriginY);

    this.set({
        originX: this._originalOriginX,
        originY: this._originalOriginY,
        left: originPoint.x,
        top: originPoint.y
    });
};
function samealigngroup() {


    var gr = app.canvas.getActiveGroup();
    var objs = gr.getObjects();
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < objs.length - 1; i++) {
            if (objs[i].get('top') > objs[i + 1].get('top')) {
                var temp = objs[i];
                objs[i] = objs[i + 1];
                objs[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    var max = objs.length;
    var ha = gr.getHeight();
    var sps = 0;
    var h = 0;
    for (var i in objs) {
        h = h + objs[i].getHeight();
        ////console.log('heig',objs[i].hei,h);                         
    }
    ////////console.log('ha',ha,'h',h);

    if ((ha - h) < 0) {
        ha = h;
        h = ha - h;
    } else {
        h = ha - h;
    }
    h = h / (max - 1);
    ////////console.log(h,max);
    var t = 0;
    var t0 = 0;
    for (var i in objs) {
        if (i == 0) {
            //objs[i].set('top',0);
        } else {
            t = t0 + (objs[i - 1].getHeight()) + h;
            objs[i].set('top', t);
        }
        t0 = objs[i].get('top');
        objs[i].setCoords();
        ////////console.log(t0);

    }
    /*for (var i in objs) {        
                objs[i].set('top',-(gr.getHeight()/2)+(objs[i].getHeight()/2)+objs[i].get('top'));
                objs[i].setCoords();
        }*/
    gr.setObjectsCoords();
    gr.setCoords();
    app.canvas.renderAll();
}

function sameHaligngroup() {


    var gr = app.canvas.getActiveGroup();
    var objs = gr.getObjects();
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < objs.length - 1; i++) {
            if (objs[i].get('left') > objs[i + 1].get('left')) {
                var temp = objs[i];
                objs[i] = objs[i + 1];
                objs[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    var max = objs.length;
    var ha = gr.getHeight();
    var sps = 0;
    var h = 0;
    for (var i in objs) {
        h = h + objs[i].getHeight();
        ////console.log('heig',objs[i].hei,h);                         
    }
    ////////console.log('ha',ha,'h',h);

    if ((ha - h) < 0) {
        ha = h;
        h = ha - h;
    } else {
        h = ha - h;
    }
    h = h / (max - 1);
    ////////console.log(h,max);
    var t = 0;
    var t0 = 0;
    for (var i in objs) {
        if (i == 0) {
            //objs[i].set('top',0);
        } else {
            t = t0 + (objs[i - 1].getHeight()) + h;
            objs[i].set('left', t);
        }
        t0 = objs[i].get('left');
        ////////console.log(t0);

    }
    /*for (var i in objs) {        
                objs[i].set('top',-(gr.getHeight()/2)+(objs[i].getHeight()/2)+objs[i].get('top'));
                objs[i].setCoords();
        }*/
    gr.setObjectsCoords();
    app.canvas.renderAll();
}

function centeraligngroup() {
    var gr = app.canvas.getActiveGroup();
    if (gr) {
        var objs = gr.getObjects();
        for (var i in objs) {
            objs[i].set('left', 0);
            objs[i].setCoords();
            ////////console.log(gr.get('left'));
        }
        app.canvas.renderAll();
    }
}

function leftaligngroup() {
    var gr = app.canvas.getActiveGroup();
    var objs = gr.getObjects();
    for (var i in objs) {
        objs[i].set('left', 0 - (gr.getWidth() / 2) + (objs[i].getWidth() / 2));
        objs[i].setCoords();
    }
    app.canvas.renderAll();
}

function rightaligngroup() {
    var gr = app.canvas.getActiveGroup();
    var objs = gr.getObjects();
    for (var i in objs) {
        objs[i].set('left', 0 + (gr.getWidth() / 2) - (objs[i].getWidth() / 2));
        objs[i].setCoords();
    }
    app.canvas.renderAll();
}
