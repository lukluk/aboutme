var ready=false;
var param = decodeURIComponent(window.location.search.slice(1))
    .split('&')
    .reduce(function _reduce( /*Object*/ a, /*String*/ b) {
        b = b.split('=');
        a[b[0]] = b[1];
        return a;
    }, {});

var canvas = new fabric.Canvas('c');

var canvas2 = new fabric.Canvas('c2');

//initAligningGuidelines(canvas);
var app = new App();
app.event.setEvent(canvas);
app.event.setEvent(canvas2);
app.setActiveCanvas(canvas);
canvas.perPixelTargetFind=true;
canvas.targetFindTolerance=5;
canvas.id='front';
canvas2.perPixelTargetFind=true;
canvas2.targetFindTolerance=5;
canvas2.id='back';
//main
if (typeof param.template != 'undefined') {
    loadSVG('front', canvas,function(){
    	app.setActiveCanvas(canvas2);
    	loadSVG('back', canvas2,function(){
    		app.setActiveCanvas(canvas);
    		ready=true;
    		$('.loader').fadeOut('fast');
    	});	

    });	
    
    
    
}else{
	ready=true;
	$('.loader').fadeOut('fast');
}
