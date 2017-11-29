var express = require("express");
var bodyParser = require("body-parser");
var _=require('lodash');
var hbs = require('hbs');
var app = express();
var port = 3000;
const fs = require('fs');
const helpers = require('../app/helpers/helper');
const { getAllWorkingSets } = require('../app/lib/home');
var commonFetchFile = require("../app/lib/fetchArticles");
var cors = require("cors");

var workingsetstore = {}

app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
	articlePerPage = 6,
    currentPage = request.query["page-no"]||1,
 	getAllWorkingSets().then( workingset =>{
		helpers.workinSetList(currentPage, articlePerPage);
		helpers.pagingControls(commonFetchFile.numberOfpages, workingset);
		response.render('home.hbs',{
			workingSet: workingset
		});
	})
	.catch(e=>{
		console.log(e,'error catched')
	})
})
require('../app/routes/index')(app);
app.listen(port, () => {
    console.log(`server getting started on port number ${port}`);
});
