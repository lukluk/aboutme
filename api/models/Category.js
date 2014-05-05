/**
 * Templates
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        templateid: {
            type: 'INTEGER',
            max: 150,
            required: true
        },
        categoryid: {
            type: 'INTEGER',
            max: 150,
            required: true
        }
        
    }

};
