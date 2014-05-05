createListenersKeyboard();

function createListenersKeyboard() {
    document.onkeydown = onKeyDownHandler;
    //document.onkeyup = onKeyUpHandler;
}

function onKeyDownHandler(event) {
    //event.preventDefault();

    var key;
    if (window.event) {
        key = window.event.keyCode;
    } else {
        key = event.keyCode;
    }

    switch (key) {
        //////////////
        // Shortcuts
        //////////////
        // Copy (Ctrl+C)
        case 67: // Ctrl+C
            if (ableToShortcut()) {
                if (event.ctrlKey) {
                    event.preventDefault();
                    copy();
                }
            }
            break;
            // Paste (Ctrl+V)
        case 86: // Ctrl+V
            if (ableToShortcut()) {
                if (event.ctrlKey) {
                    event.preventDefault();
                    paste();
                }
            }
            break;
        default:
            // TODO
            break;
    }
}


function ableToShortcut() {
    /*
    TODO check all cases for this
    
    if($("textarea").is(":focus")){
        return false;
    }
    if($(":text").is(":focus")){
        return false;
    }
    */
    return true;
}

function copy() {
    if (app.canvas.getActiveGroup()) {
        for (var i in app.canvas.getActiveGroup().objects) {
            var object = fabric.util.object.clone(app.canvas.getActiveGroup().objects[i]);
            object.set("top", object.top + 5);
            object.set("left", object.left + 5);
            copiedObjects[i] = object;
        }
    } else if (app.canvas.getActiveObject()) {
        var object = fabric.util.object.clone(app.canvas.getActiveObject());
        object.set("top", object.top + 5);
        object.set("left", object.left + 5);
        copiedObject = object;
        copiedObjects = new Array();
    }
}

function paste() {
    app.canvas.deactivateAll();
    if (copiedObjects.length > 0) {
        for (var i in copiedObjects) {
            app.canvas.add(copiedObjects[i]);
            app.canvas.setActiveObject(copiedObjects[i]);
        }

    } else if (copiedObject) {
        app.canvas.add(copiedObject);
        app.canvas.setActiveObject(copiedObject);
    }
    stateupdate(1);
    app.canvas.renderAll();
}
