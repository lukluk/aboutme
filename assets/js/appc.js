function App() {

    this.activeCanvas = '';
    this.getCanvas = function() {
        return this.canvas;
    }
    this.setActiveCanvas = function(newcanvas) {
        this.canvas = newcanvas;
        this.canvas.calcOffset();
        this.activeCanvas = newcanvas.id;
    }
    this.setToggleCanvas = function(canvas1, canvas2) {
        if (this.activeCanvas == canvas1.id) {
            this.setActiveCanvas(canvas2);
        } else {
            this.setActiveCanvas(canvas1);
        }
    }
    
    this.toolbox = new function() {
        this.fill = function() {
            $("#fill").spectrum("toggle");
        }
        this.close = function() {
            $('#toolbox').fadeOut('fast');
            $('.mydropcon').fadeOut('slow');
        }
        this.rotate = function() {

            $('#rotatedlg').show();
        }
        this.border = function() {

            $('#borderdlg').show();
        }
    }
    this.flip = function() {
        $('.cback').toggleClass('active');

        $('.cfront').toggleClass('active');
    }

    this.create = new function() {
        this.rect = function(center) {

            var rect = new fabric.Rect({
                width: 150,
                height: 120,
                fill: 'rgba(255,0,0,1)',

            });
            
                app.canvas.centerObject(rect);
            app.canvas.add(rect).setActiveObject(rect);
            app.canvas.renderAll();
            return rect;
        }
        this.circle = function(center) {
            var circle = new fabric.Circle({
                radius: 100,
                fill: 'rgba(255,0,0,1)',

            });


                app.canvas.centerObject(circle);
            app.canvas.add(circle).setActiveObject(circle);
            app.canvas.renderAll();
            return circle;
        }
        this.triangle = function(center) {
            var triangle = new fabric.Triangle({
                fill: 'rgba(255,0,0,1)',
                width: 50,
                height: 50

            });
                app.canvas.centerObject(circle);
            app.canvas.add(triangle).setActiveObject(triangle);
            app.canvas.renderAll();
            return triangle;
        }
        this.hline = function(center) {
            var hline = new fabric.Line([100, 100, 200, 100], {
                stroke: 'rgba(255,0,0,1)',

            });
                app.canvas.centerObject(hline);
            app.canvas.add(hline).setActiveObject(hline);
            app.canvas.renderAll();
            return hline;
        }
        this.vline = function(center) {
            var vline = new fabric.Line([100, 100, 100, 200], {
                stroke: 'rgba(255,0,0,1)',

            });
                app.canvas.centerObject(vline);
            app.canvas.add(vline).setActiveObject(vline);
            app.canvas.renderAll();
            return vline;
        }
        this.text = function(center) {
            var text = new fabric.Text('Text', {
                fill: 'rgba(255,0,0,1)',
                fontFamily: 'helvetica'

            });
                app.canvas.centerObject(text);
            app.canvas.add(text).setActiveObject(text);
            app.canvas.renderAll();
            return text;
        }
        this.image = function(x,y,url, center) {
            fabric.Image.fromURL(url, function(image) {

                image.setCoords();

                image.left = x;
                image.top = y;

                    app.canvas.centerObject(image);
                app.canvas.add(image).setActiveObject(image);
                app.canvas.renderAll();
                return image;


            });
        }

    }


}
