const mongoose = require('mongoose');
//const validator = require('validator');
var  WorkingSet = mongoose.model('Workingset', {
    name: {
        type: String,
        required:true,
        trim:true,
        minlength: 1,
    },
    dataSet:{
        type: String,
        required:true,
        trim:true,
        minlength: 1,
    },
    dataSource: {
        type: {
            type: String,
            required:true
        },
        folderPath: {
            type: String,
            required:true
        }
    }
});
module.exports = {WorkingSet};



