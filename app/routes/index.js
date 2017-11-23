const fs = require('fs');
const hbs = require('hbs');
var express = require('express');
var routes = require('require-dir')();

module.exports = function(app) {

    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    Object.keys(routes).forEach(function(routeName) {
        var router = express.Router();
        // Initialize all routes and Initialize the route to add its functionality to router
        require('./' + routeName)(router);
        // Add router to the speficied route name in the app
        app.use('/' + routeName, router);
  });		
}