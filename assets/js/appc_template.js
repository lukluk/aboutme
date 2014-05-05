    App.prototype.template = new function() {
    	this.save=function(){
        var d = new Date();
        var n = d.getTime();  
    		canvas.deactivateAll();
    		canvas2.deactivateAll();
    		$.post('/Io/saveSVG',{
    			name:'tmp'+n,
    			svg_front:canvas.toSVG(),
    			svg_back:canvas2.toSVG() 
    		},function(){
          $.post('Io/createPDF',{
            name:'tmp'+n            
          },function(){
            alert('saved');
          });
    			
    		})
    	}
    }