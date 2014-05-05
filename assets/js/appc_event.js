App.prototype.event = new function() {
    this.setEvent = function(icanvas) {
        icanvas.on('object:selected', function(target, e) {
            //console.log(target.target.type);
            app.selected.updateinfo();

        })
        icanvas.on('object:added', function(e) {
            stateupdate(1);
            
        });
        icanvas.on('object:modified', function(e) {
            
            stateupdate(0);
            app.selected.updateinfo();

        });
        icanvas.on('mouse:up', function(e) {
            // clear these values, to stop drawing guidelines once mouse is up
                //console.log(this);
            if (!this.getActiveObject() && !this.getActiveGroup()) {
                $('.group').attr('disabled', 'disabled');
                $('.group *').attr('disabled', 'disabled');
                $('#color').spectrum("disable");
            }

            this.pointer = e.e;
            
                updateToolbox();
            
        });
    }
}
