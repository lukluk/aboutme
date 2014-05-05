    App.prototype.selected = new function() {
        this.crop = function() {
            if (this.data().type == 'image') {
                $('#cropimgdlg .modal-content').html('<center><img class="cropimg" src="' + this.data()._element.src + '"/><br/><button class="btn btn-primary" onclick="app.server.crop()">Crop</button></center>');

                var th=this;
                $('#cropimgdlg .modal-content img:first').Jcrop({
                    // start off with jcrop-light class
                    bgOpacity: 0.5,
                    //onChange:   app.store.save()
                    bgColor: 'white',
                    addClass: 'jcrop-light'
                }, function() {
                    api = this;
                    api.setSelect([(th.data().getWidth()/2)-100,(th.data().getHeight()/2)-100, (th.data().getWidth()/2)+100, (th.data().getHeight()/2)+100]);
                    api.setOptions({
                        bgFade: true
                    });
                    api.ui.selection.addClass('jcrop-selection');
                });
                $('#cropimgdlg').modal('show');
            }
        }
        this.clone = function() {
            if (this.data()) {

                var objcopy = fabric.util.object.clone(this.data());
                objcopy.set("top", this.data().top + 25);
                objcopy.set("left", this.data().left + 25);
                if (objcopy) {
                    app.canvas.deactivateAll();
                    objcopy.stacked = false;
                    objcopy.setCoords();
                    app.canvas.add(objcopy);
                    app.canvas.renderAll();
                }
            }
        }
        this.updateinfo = function() {
            if (stack[app.canvas.id] == null || stack[app.canvas.id].length == 0 || stack[app.canvas.id][0] == null) {
                $('#undo').attr('disabled', 'disabled');
            } else {
                $('#undo').removeAttr('disabled');
            }
            if (redo[app.canvas.id] == null || redo[app.canvas.id].length == 0 || redo[app.canvas.id][0] == null) {
                $('#reundo').attr('disabled', 'disabled');
            } else {
                $('#reundo').removeAttr('disabled');
            }
            if(!this.data()){
            	return false;
            }
            if (this.data().type == 'text' || this.data().type == 'i-text') {
                $('.group').attr('disabled', 'disabled');
                $('.group *').attr('disabled', 'disabled');
                $('.group-object *').removeAttr('disabled');
                $('.group-object').removeAttr('disabled');
                $('.group-text *').removeAttr('disabled');
                $('.group-text').removeAttr('disabled');
                $('#textedit').show();
                $('#color').spectrum("enable");
            } else
            if (this.data().type == 'image') {
                $('.group').attr('disabled', 'disabled');
                $('.group *').attr('disabled', 'disabled');
                $('.group-object *').removeAttr('disabled');
                $('.group-object').removeAttr('disabled');
                $('.group-image *').removeAttr('disabled');
                $('.group-image').removeAttr('disabled');
                $('#textedit').hide();
                $('#color').spectrum("disable");
            } else {
                $('.group').attr('disabled', 'disabled');
                $('.group *').attr('disabled', 'disabled');
                $('.group-object *').removeAttr('disabled');
                $('.group-object').removeAttr('disabled');
                $('.group-shape *').removeAttr('disabled');
                $('.group-shape').removeAttr('disabled');
                $('#color').spectrum("disable");
                $('#textedit').hide();

            }
            if (this.data().type == 'i-text' || this.data().type == 'text') {
                $('#textedit').val(this.get('text'));
                $('#fontfamily').val(this.data().fontFamily);
                $('#fontsize').val(this.data().fontSize);
                $('#fontColor .sp-preview-inner').css('background-color', this.data().fill);
                $('#color').val(this.data().fill);
                $('#textalign button').removeClass('active');
                $('#fontStyle button').removeClass('active');
                $('#textAlign_' + this.data().textAlign).addClass('active');
                $('#fontStyle_' + this.data().fontStyle).addClass('active');
                $('#fontStyle_' + this.data().fontWeight).addClass('active');
                $('#fontStyle_' + this.data().textDecoration).addClass('active');
            }
            $('#border').val(this.data().strokeWidth);
            $('#rot').val(this.data().getAngle()).trigger('change');
            $('#borderdlg .sp-preview-inner').css('background-color', this.data().stroke);
            $('#bordercolor').val(this.data().fill);
            $('#fill').val(this.data().fill);

        }
        this.data = function() {
            if (app.canvas.getActiveGroup()) {
                return app.canvas.getActiveGroup();
            } else {
                return app.canvas.getActiveObject();
            }
        }
        this.clear = function() {
            app.canvas.deactivateAll();
        }
        this.delete = function() {
            app.canvas.remove(this.data());
            this.toolbox.close();

        }
        this.set = function(name, val) {
            var object = this.data();

            if (!object) return;
            if (object.setSelectionStyles && object.isEditing) {
                var style = {};
                style[name] = val;
                object.setSelectionStyles(style);
                object.setCoords();
            } else
                object.set(name, val).setCoords();
            this.updateinfo();
            app.canvas.renderAll();
            setTimeout(function() {
                app.canvas.renderAll()
            }, 1000);

        }
        this.get = function(name) {
            var object = this.data();
            if (!object) return;
            return object.get(name);

        }
        this.toggle = function(name, val, val2) {
            var object = app.canvas.getActiveObject();
            if (!object) return;

            if (object.getSelectionStyles && object.isEditing) {
                console.log(object.getSelectionStyles()[name], val);
                if (object.getSelectionStyles()[name] == val) {
                    var style = {};
                    style[name] = val2;
                    object.setSelectionStyles(style);
                    object.setCoords();
                } else {
                    var style = {};
                    style[name] = val;
                    object.setSelectionStyles(style);
                    object.setCoords();
                }
                app.canvas.renderAll();
            } else {
                if (this.get(name) == val) {
                    this.set(name, val2);
                } else {
                    this.set(name, val);
                }
            }
        }
        this.makeBackground = function() {

            if (app.canvas.getActiveGroup()) {
                var i = 0;
                for (i in app.canvas.getActiveGroup()._objects) {
                    app.canvas.getActiveGroup()._objects[i].selectable = false;

                }
            } else
            if (app.canvas.getActiveObject()) {
                app.canvas.getActiveObject().selectable = false;
            }
            app.canvas.deactivateAll();
            app.canvas.renderAll();
        }
        this.rotate = function(angleOffset) {

            var obj = this.data(),
                resetOrigin = false;

            if (!obj) return;
            localStorage.rotate = this.data().getAngle();
            var angle = angleOffset;

            if ((obj.originX !== 'center' || obj.originY !== 'center') && obj.centeredRotation) {
                obj.setOriginToCenter && obj.setOriginToCenter();
                resetOrigin = true;
            }

            angle = angle > 360 ? 90 : angle < 0 ? 270 : angle;

            obj.setAngle(angle).setCoords();

            if (resetOrigin) {
                obj.setCenterToOrigin && obj.setCenterToOrigin();
            }

            app.canvas.renderAll();

        }

    }
