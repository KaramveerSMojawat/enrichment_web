var express = require("express");
var bodyParser = require("body-parser");
var _=require('lodash');
var hbs = require('hbs');
var app = express();
var port = 3000;
const fs = require('fs');
const helpers = require('../app/helpers/helper');

app.get('/', (request, response) => {
	var stringData = JSON.parse(fs.readFileSync("./assets/json/config.json"));		
	helpers.workinSetList();
	response.render('home.hbs',{
		workingSet : stringData.config.workingSet,
	});
})
require('../app/routes/index')(app);
app.listen(port, () => {
    console.log(`server getting started on port number ${port}`);
});
