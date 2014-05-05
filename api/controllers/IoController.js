/**
 * IoController
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

var sh = require('execSync');
var fs = require('fs');
var base64= require('base64');
var tmppath = __dirname.replace('/api/controllers','')+'/tmp/';
var rootpath = __dirname.replace('/api/controllers','')+'/';


module.exports = {

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to PdfController)
     */
    _config: {},
    viewPDF: function(req, res) {
        var filename = req.param('filename');
        var path = __dirname.replace("api/controllers", "");
        var stream = fs.createReadStream(path + 'tmp/pdf/' + filename);
        var filename = filename;
        // Be careful of special characters

        filename = encodeURIComponent(filename);
        // Ideally this should strip them

        res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');

        stream.pipe(res);
    },
   viewPNG: function(req, res) {
        var filename = req.param('filename');
        var path = __dirname.replace("api/controllers", "");
        var stream = fs.createReadStream(path + 'tmp/png/' + filename);
        var filename = filename;
        // Be careful of special characters

        filename = encodeURIComponent(filename);
        // Ideally this should strip them

        res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
        res.setHeader('Content-type', 'image/png');

        stream.pipe(res);
    },  
    createPDF: function(req, res) {
        var status = {};
        var result = sh.exec('php ' + rootpath+'cli/pdf.php ' + tmppath + 'svg/' + req.param('name') + '_front.svg');
        console.log('php ' + rootpath+'cli/pdf.php ' + tmppath + 'svg/' + req.param('name') + '_front.svg');
        status.result = result.stdout;
        status.error = true;
        //status.name = req.param('name') + '.pdf';
        
        return res.json(status);
    },
    savePNG: function(req, res) {
        var base64Data = req.param('data').replace(/^data:image\/png;base64,/, "");
        
        fs.writeFile(tmppath + 'png/' + req.param('name') + '.png', base64Data, 'base64', function(err) {
            console.log(err);
            if (err) {
                return res.json({
                    error: true,
                    error_message: 'cannot write file'
                });
            } else {
                        var result=sh.exec("composite -gravity center -quality 100 "+tmppath+"png/mywp.png"+" "+tmppath+"png/"+req.param('name')+'.png'+" "+tmppath+"png/"+req.param('name')+'.png');
                        
                        return res.json({
                          output:result.stdout,
                            success: true,
                            name: req.param('name')
                        });


                    
            }
        });
    },
    saveSVG: function(req, res) {
        var status = {};
        status.name = req.param('name');
        if (!req.param('svg_front') || !req.param('svg_back') || !req.param('name')) {
            return res.json(status = {
                error: true,
                error_message: 'input values not found'
            });
        }
        console.log('x',req.param('svg_front'));
        fs.writeFileSync(__dirname + '/../../tmp/svg/' + req.param('name') + '_front.svg', (req.param('svg_front')));
        fs.writeFileSync(__dirname + '/../../tmp/svg/' + req.param('name') + '_back.svg', (req.param('svg_back')));
        status = {
            error: false,
            success: true
        };

        return res.json(status);
    },
    delete: function(req, res) {
        var status = {};
        status.name = req.param('name');
        if (!req.param('name')) {
            return res.json(status = {
                error: true,
                error_message: 'input values not found'
            });
        }
        fs.unlink(__dirname + '/../../tmp/svg/' + req.param('name') + '.svg', function(err) {
            if (err) return res.json(status = {
                error: true,
                error_message: 'delete faild'
            });
            return res.json(status = {
                error: false,
                success: true
            });
        });
    },


};
