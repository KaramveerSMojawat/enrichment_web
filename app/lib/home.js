var  {WorkingSet}  = require("../../app/models/workingset");

var error = {
    error: "true",
    message: ""
};

module.exports = {
    getAllWorkingSets: () => {
        return WorkingSet.find({});
    },
    getAllWorkingSetsById: (id) => {
        return WorkingSet.findById(id);
    }
}