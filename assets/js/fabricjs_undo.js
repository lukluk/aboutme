var stack = {};
stack.front = [];
stack.back = [];
var redo = {};
redo.front=[];
redo.back=[];
var IDs = {};
IDs.front=0;
IDs.back=0;

var iur = {};
iur.front=0;
iur.back=0;
var ire = {};
ire.front=0;
ire.back=0;
function stateupdate(iawal) {
    //////////////console.log("begin " + iur);
    //redo=null;
    ire[app.canvas.id] = 0;
    app.canvas.forEachObject(function(obj) {
        ////////console.log(obj.ID);
        if (obj.ID != 'low') {


            var changed = false;
            var o = new Object();
            o.self = obj;
            o.child = 0;
            o.state = new Object();
            o.awal = iawal;

            if (iawal == 1) {

                if (!obj.stacked) {
                    for (var c in obj.stateProperties) {

                        
                            var valx = obj[obj.stateProperties[c]];
                            if (obj.stateProperties[c] == 'lineHeight') {
                                valx = parseFloat(valx);
                            }

                            o.state[obj.stateProperties[c]] = valx;
                        
                    }
                    IDs[app.canvas.id] = IDs[app.canvas.id] + 1;
                    o.ID = "obj" + IDs[app.canvas.id];
                    if(ready){
                        stack[app.canvas.id][iur[app.canvas.id]] = o;
                        iur[app.canvas.id]++;
                    }
                    //////////////console.log(stack[iur]);
                    var oo = new Object();
                    oo.self = obj;
                    oo.child = 1;
                    oo.state = new Object();
                    oo.state = o.state;
                    oo.awal = 0;
                    oo.starter=ready;
                    oo.ID = "obj" + IDs[app.canvas.id];
                    
                    stack[app.canvas.id][iur[app.canvas.id]] = oo;
                    obj.stacked = true;
                    obj.ID = "obj" + IDs[app.canvas.id];
                    ////////console.log("added new item to #" + iur);
                    iur[app.canvas.id]++;
                }
            } else {
                for (var c in obj.stateProperties) {

                    
                        var valx = obj[obj.stateProperties[c]];
                        if (obj.stateProperties[c] == 'lineHeight') {

                            valx = parseFloat(valx);
                        }
                        o.state[obj.stateProperties[c]] = valx;
                    

                    if (obj[obj.stateProperties[c]] != obj.originalState[obj.stateProperties[c]]) {
                        //////////////console.log("we seen different | " + obj.stateProperties[c] + " original : " + obj.originalState[obj.stateProperties[c]] + "| val:" + obj[obj.stateProperties[c]]);
                        obj.originalState[obj.stateProperties[c]] = obj[obj.stateProperties[c]];
                        changed = true;
                    }
                }
                if (changed) {
                    o.ID = obj.ID;
                    stack[app.canvas.id][iur[app.canvas.id]] = o;
                    //////////////console.log("added updated item to #" + iur);
                    iur[app.canvas.id]++;
                }
            }
        }
    });
    ////console.log(stack);

}

function undo() {
    if (iur[app.canvas.id] > 0) {
        ////////////console.log("before undo", stack);        
        iur[app.canvas.id]--;
        var old = stack[app.canvas.id][iur[app.canvas.id]];
        if (old.child == 1) {
            stack[app.canvas.id].splice(iur[app.canvas.id],1);
            iur[app.canvas.id]--;
            //////////////console.log("goto parent | #" + iur);
            old = stack[app.canvas.id][iur[app.canvas.id]];
        }
        //////////////console.log("remove stack #" + iur, stack[iur]);        
        redo[app.canvas.id][ire[app.canvas.id]] = old;
        ire[app.canvas.id]++;
        stack[app.canvas.id].splice(iur[app.canvas.id],1);
        if (old.awal == 1) {
            //////////////console.log("remove  obj#" + iur, old.self);
            for (var n in stack[app.canvas.id]) {
                if (stack[app.canvas.id][n] != null) {
                    if (stack[app.canvas.id][n].ID == old.ID) {
                        stack[app.canvas.id][n] = null;
                    }
                }
            }
            app.canvas.remove(old.self);
        } else {
            if (stack[app.canvas.id].length > 0) {
                var i = 0;
                var xiur = iur[app.canvas.id] - 1;
                //////////////console.log(iur - 1);
                for (i = iur[app.canvas.id] - 1; i >= 0; i--) {
                    if (stack[app.canvas.id][i] != null) {
                        if (old.ID == stack[app.canvas.id][i].ID) {
                            xiur = i;
                            ////////////console.log(i, stack[i].ID);
                            break;
                        }
                    }
                }
                if (xiur == 0) {
                    xiur = iur[app.canvas.id] - 1;
                }
                var un = stack[app.canvas.id][xiur];
                app.canvas.forEachObject(function(obj) {
                    if (obj.ID == un.ID) {
                        //////////////console.log("move to this stack " + (xiur), stack[xiur]);
                        for (var c in obj.stateProperties) {
                            if (
                                obj.stateProperties[c] == "height" || obj.stateProperties[c] == "width" || obj.stateProperties[c] == "left" || (obj.stateProperties[c] == "top") || (obj.stateProperties[c] == "angle") || (obj.stateProperties[c] == "fill") || (obj.stateProperties[c] == "flipX") || (obj.stateProperties[c] == "flipY") || (obj.stateProperties[c] == "opacity") || (obj.stateProperties[c] == "stroke") || (obj.stateProperties[c] == "lineHeight") || (obj.stateProperties[c] == "strokeWidth")) {
                                obj.set(obj.stateProperties[c], un.state[obj.stateProperties[c]]);
                                if (obj.stateProperties[c] == 'angle') {
                                    obj.setAngle(un.state[obj.stateProperties[c]]);
                                    //////////console.log("set angle");
                                }

                            }
                            if (obj.type != "text") {}
                            obj.setCoords();
                        }
                        app.canvas.renderAll();
                        updateToolbox();                        
                        return true;

                    }
                });
                app.canvas.renderAll();
                updateToolbox();
            }
        }
    }
    ////////////console.log("after undo", stack);
}

function goredo() {
    if (ire[app.canvas.id] > 0) {
        //alert('x');
        ire[app.canvas.id]--;
        var old = redo[app.canvas.id][ire[app.canvas.id]];
        stack[app.canvas.id][iur[app.canvas.id]] = old;
        iur[app.canvas.id]++;
        redo[app.canvas.id].splice(ire[app.canvas.id], 1);
        //redo[ire] = null;
        if (old.awal == 1) {
            app.canvas.add(old.self);
        } else {
            app.canvas.forEachObject(function(obj) {
                if (obj.ID == old.ID) {
                    //////////////console.log("move to this stack " + (xiur), stack[xiur]);
                    for (var c in obj.stateProperties) {
                        if (
                            (obj.stateProperties[c] == "left") || (obj.stateProperties[c] == "top") || (obj.stateProperties[c] == "angle") || (obj.stateProperties[c] == "fill") || (obj.stateProperties[c] == "flipX") || (obj.stateProperties[c] == "flipY") || (obj.stateProperties[c] == "opacity") || (obj.stateProperties[c] == "stroke") || (obj.stateProperties[c] == "lineHeight") || (obj.stateProperties[c] == "strokeWidth")) {
                            obj.set(obj.stateProperties[c], old.state[obj.stateProperties[c]]);
                        }
                        if (obj.type != "text") {


                        }
                        obj.setCoords();
                    }

                }
            });
            app.canvas.renderAll();
            updateToolbox();
        } //else                    
        //////////////console.log("after undo", stack);
    }
}
