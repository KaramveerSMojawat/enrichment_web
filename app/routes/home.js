var workingset = require("../../app/lib/home"); 
module.exports = router => {
 router
  .route("/")
    .get((request, response) => {
    	var parameter = {};
        workingset
            .getAllWorkingSets()
            .then(sets => {
                response.send({ sets });
            })
            .catch(error => {
            	response.status('404').send('error');    
            });
        })
    }