/**
 * DesignerController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var base64 = require('base64');

var fs = require('fs');
var S = require('string');


var fonts = [];

var cssfonts = [];

function naming(str) {
    return S(S(str).capitalize().s).replaceAll('.ttf', '');
}

function getFiles(dir, fn) {
    var files = fs.readdirSync(dir);
    for (var i in files) {
        if (!files.hasOwnProperty(i)) continue;
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name);
        } else {
            fn(files[i]);
        }
    }
}
var fontsize = [];
for (var i = 0; i <= 100; i++) {
    fontsize.push(i);
}
getFiles('assets/api/fonts', function(item) {
    fonts.push(naming(item));
    if (item.indexOf('.ttf') > 0) {
        cssfonts.push("@font-face {font-family: '" + naming(item) + "';    src: url('/api/fonts/" + item + "')  format('truetype') }");
    }
});

module.exports = {

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to DesignerController)
     */

    _config: {},

    index: function(req, res) {
        var isvg = null;

        var output = {
            fonts: fonts,
            cssfonts: cssfonts,
            fontsize: fontsize,
            canvas: {
                width: 500,
                height: 300
            },
            svg: isvg
        }
        return res.view(output);
    }
    

};
