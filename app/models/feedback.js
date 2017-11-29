var mongoose = require("mongoose");

var Feedback = mongoose.model("Feedback", {
    feedback: {
        type: String,
        required: true
    },
    workingSetId:{
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        minlength: 1,
        ref: "Workingset"
    },
    text:{
    	type: String,
    },
    articleId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    algorithm:{
    	type: String,
        required: true
    },
    refArticleId: {
        type: String,
    	required: true,
        trim: true,
        minlength: 1
    },
    feedbackDate: {
        type: Number,
        required: true,
        required: true,
        trim: true,
        minlength: 1
    }
});
module.exports = {
    Feedback
};
