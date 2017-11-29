var { Feedback }  = require("../../app/models/feedback");
//const { ObjectID } = require("mongodb");
var mongoose = require("mongoose");
const { Schema } = mongoose;
var error = {
    error: "true",
    message: ""
};

module.exports = {
    newFeedback: body => {
        var feedbackDate = new Date().getTime();
        var array = [];
        return new Promise((resolve, reject) => {
        resolve(body);
            body.map((val, index) => {
                val["feedbackDate"] = feedbackDate;
                var feedback = new Feedback(val);
                feedback
                    .save()
                    .then(
                        doc => {
                            if (body.length === array.length) {
                                resolve(array);
                            }
                    }).catch(e => {
                        console.log(e);
                        reject(e);
                    });
                });
        })
    },
    getAllFeedbacks: (fileName) => {
        return Feedback.find({articleId:fileName}) 
    },
    getFeedbackStatus: (id) =>{
        return Feedback.find({workingSetId:id});    
    }
}