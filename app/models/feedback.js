var mongoose = require("mongoose");

var Feedbacks = mongoose.model("Comment", {
    feedbackOptions:{
    	type: String,
        required: true
    }
    text: {
        type: String,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        minlength: 1,
        ref: "Task"
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    feedbackDate: {
        type: Number,
        required: true
    }
});

module.exports = {
    Feedbacks
};
