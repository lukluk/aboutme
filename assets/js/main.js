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
        // Zoom In (Ctrl+"+")
        case 187: // Ctrl+"+"
            if (ableToShortcut()) {
                if (event.ctrlKey) {
                    event.preventDefault();
                    app.zoon. in ();
                }
            }
            break;
            // Zoom Out (Ctrl+"-")
        case 189: // Ctrl+"-"
            if (ableToShortcut()) {
                if (event.ctrlKey) {
                    event.preventDefault();
                    app.zoon.out();
                }
            }
            break;
            // Reset Zoom (Ctrl+"0")
        case 48: // Ctrl+"0"
            if (ableToShortcut()) {
                if (event.ctrlKey) {
                    event.preventDefault();
                    app.zoon.reset();
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

function updateToolbox() {


    app.selected.updateinfo();
    $('#toolbox').fadeIn('slow');

}




document.onkeydown = function(event) {

    var key = window.event ? window.event.keyCode : event.keyCode;
    switch (key) {
        case 37: // left

            if (event.ctrlKey || event.metaKey) {
                return app.selected.rotate(+1);
            } else if (event.shiftKey) {
                return app.selected.set('left', app.selected.get('left') - 5);
            }

        case 39: // right
            if (event.ctrlKey || event.metaKey) {
                return app.selected.rotate(+1);
            } else if (event.shiftKey) {
                return app.selected.set('left', app.selected.get('left') + 5);
            }

        case 38: // up            
            if (event.ctrlKey || event.metaKey) {
                return app.selected.rotate(+1);
            } else if (event.shiftKey) {
                return app.selected.set('top', app.selected.get('top') - 5);
            }

        case 40: // down

            if (event.ctrlKey || event.metaKey) {
                return app.selected.rotate(+1);
            } else if (event.shiftKey) {
                return app.selected.set('top', app.selected.get('top') + 5);
            }

    }
}
$('html').keyup(function(e) {
    if (e.keyCode == 46) {
        app.selected.delete();
    }
})

$(".draggable").draggable({
        helper: 'clone'
    });
$(".droppable").droppable({

    drop: function(event, ui) {
        
        dPos = $(this).offset();
        app.create.image(event.pageX-dPos.left-(ui.helper[0].width/2),event.pageY-dPos.top-(ui.helper[0].height/2),ui.helper[0].src);
        
    }

});

$(".pick-a-color").spectrum({
    color: "#fff",
    'callbacks': function() {
        //console.log('x');
    },
    allowEmpty: true,
    showPalette: true,
    palette: [
        ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
        ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
        ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
        ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
        ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
        ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
        ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
        ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
    ]
});
$(".select-a-color").spectrum({
    color: "#fff",

    allowEmpty: true,


});
$("#fillbtn").click(function() {
    $("#fill").spectrum("toggle");
    return false;
});




$(document).ready(function() {

    $('#rotatedlg').mouseleave(function() {
        /* Act on the event */
        $(this).fadeOut('fast');
    });
    $('.close-pop').click(function() {
        /* Act on the event */
        $(this).parent().parent().hide();
    });
    $('#rot').knob({
        'change': function() {

            app.selected.rotate($('#rot').val());

        }
    });

    $('#rotatecancel').click(function() {
        app.selected.rotate(localStorage.rotate);
        $('#rotatedlg').modal('hide');
    })
    //plugin bootstrap minus and plus
    //http://jsfiddle.net/laelitenetwork/puJ6G/
    $('.btn-number').click(function(e) {
        e.preventDefault();

        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function() {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }


    });
    $(".input-number").keydown(function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
})

$('#textedit').keyup(function() {
    app.selected.set('text', $(this).val());
})
$('#preview').click(function(){  
  app.getCanvas().deactivateAll();
  var dataURL = app.getCanvas().toDataURL({
    format: 'png'  
  });
  var d = new Date();
  var n = d.getTime();  
  $.post('/Io/savePNG',{name:'tmp'+n,data:dataURL},function(data){
      window.open('/view/png/'+'tmp'+n+'.png');
  });
  
});
$('#print').click(function(){  
  app.getCanvas().deactivateAll();
  var dataURL = app.getCanvas().toDataURL({
    format: 'png'  
  });
  var d = new Date();
  var n = d.getTime();  
  
  $.post('/Io/saveSVG',{name:'tmp'+n,svg_front:canvas.toSVG(),svg_back:canvas2.toSVG()},function(){
     $.post('/Io/createPDF',{name:'tmp'+n},function(){
        window.open('/view/pdf/'+'tmp'+n+'.pdf');
     })
  })
});