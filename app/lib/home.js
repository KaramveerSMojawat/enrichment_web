var  {WorkingSet}  = require("../../app/models/workingset");

var error = {
    error: "true",
    message: ""
};


module.exports = {
    getAllWorkingSets: () => {
        console.log("yello");
        return WorkingSet.find({});
        /*return new Promise((resolve, reject) => {
        WorkingSet.find({}).then(
            workingSet => {
                if (!workingSet || workingSet.length === 0) {
                        console.log('!!!!!', workingSet)                       
                        error.message = "NOT_FOUND";
                        throw error;
                    }
                resolve({ workingSet });
            },
            e => {
                console.log(e.name,'error')
            }
        ).catch(e =>{
            reject(e,'error');
        })
    });
        */
}

}