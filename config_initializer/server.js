var express = require("express");
var bodyParser = require("body-parser");
var _=require('lodash');
var hbs = require('hbs');

var app = express();
var port = 3000;

require('../app/routes/index')(app);
app.listen(port, () => {
    console.log(`server getting started on port number ${port} `);
});
