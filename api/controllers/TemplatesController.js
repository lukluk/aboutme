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
var fs = require('fs');
var S = require('string');


module.exports = {
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to DesignerController)
     */
    _config: {},

    index: function(req, res) {
        var start = 0;
        if(req.param('page')){
        	start=req.param('foo');
        }
        Templates.find().exec(function(err, templates) {
            Categorys.find().exec(function(err, categorys) {
                Styles.find().exec(function(err, styles) {
                	
                    var pagination = templates / 10;
                    var output = {
                        templates: templates,
                        categorys: categorys,
                        styles: styles,
                        pagination: pagination
                    }
                    return res.view(output);
                });
            })
        });

    }


};
