var feedback = require("../../app/lib/feedback");
const _ = require("lodash");
const helpers = require('../../app/helpers/helper');
var mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = router => {
 router
  .route("/:id")
    .put((request, response) => {
        	feedback	
            	.newFeedback(request.body)
            	.then(newFeed => {
                	response.send("success");	
            	})
            	.catch(error => {
                	response.status('404').send('error');
            	});
        	});
     router
  		.route("/")
    		.get((request, response) => {
	        });
    }	