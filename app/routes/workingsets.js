var commonFetchFile = require("../../app/lib/fetchArticles");
const { getAllWorkingSets } = require('../../app/lib/home');
const { getAllWorkingSetsById } = require('../../app/lib/home');
const helpers = require('../../app/helpers/helper');
var feedback = require("../../app/lib/feedback");
const fs=require('fs');
var directoryContent=''
var heading = ''
var data = ''
var id = '';
/*mordule.exports =*/
const articlePerPage = 6;

module.exports = router => {
    router
        .route("/:data")
        .get((request, response) => {
            id = request.params.data;
            var pageNo = request.query["page-no"];
            commonFetchFile.setworkingSetId(id);
            getAllWorkingSetsById(id).then(workingset =>{
                directoryContent = workingset.dataSource.folderPath;
                commonFetchFile.fetchDirectory(directoryContent);                
                heading = workingset.dataSet
                var articleArray = [];
                try{
                    fs.readdir(directoryContent, 'utf-8', (err, allFiles) => {
                        if(err){
                            console.log(err,'err')
                        }
                        else{
                                let dataArray=[];
                                helpers.pagingControls(commonFetchFile.numberOfpages, allFiles);
                                let files=allFiles.filter((elem,index)=>{
                                    const startingIndex=(pageNo-1)*articlePerPage;
                                    const endingIndex=Math.min(pageNo*articlePerPage, allFiles.length) - 1;
                                    if(index<=endingIndex&&index>=startingIndex){
                                        return elem;
                                    }
                                })
                                files.forEach((val, index, arr) =>{
                                    let filePath = directoryContent + "/" + val;
                                    fs.readFile(filePath, 'utf-8' , (err, data) => {
                                        if (err) throw err
                                        else
                                        dataArray.push(data);
                                        var titles = dataArray.map((file)=>{
                                            return {aid: JSON.parse(file.split("\n")[0]).article.aid, title: JSON.parse(file.split("\n")[0]).article.title};
                                        });
                                        if(index === arr.length-1){
                                            feedback
                                                .getFeedbackStatus(id)
                                                .then(val =>{
                                                    var i = 0;
                                                    var str = 'notCompleted'
                                                    var algo1Array = val.filter(val1 => val1.algorithm === 'Algorithm 1')
                                                    var algo2Array = val.filter(val1 => val1.algorithm === 'Algorithm 2')
                                                    if(algo1Array.length === 0 || algo2Array.length === 0){

                                                    }else{
                                                        completedArticleId = algo1Array[0].articleId;                     
                                                    }  
                                                   
                                                    let filteredFiles=val.filter(elem=>files.includes(elem.articleId));
                                                    let duplicateArray=filteredFiles.reduce((acc,elem)=>{
                                                        elem.algorithm==='Algorithm 1'?acc[0].push(elem.articleId):acc[1].push(elem.articleId);
                                                        return acc;
                                                    },[[],[]])
                                                    var filteredArrayOfAlgo1 = duplicateArray[0].filter(function(item, pos){
                                                        return duplicateArray[0].indexOf(item) == pos; 
                                                    });
                                                    var filteredArrayOfAlgo2 = duplicateArray[1].filter(function(item, pos){
                                                        return duplicateArray[1].indexOf(item) == pos; 
                                                    });
                                                    savedFeedbackIds = filteredArrayOfAlgo1.filter(val => filteredArrayOfAlgo2.includes(val));

                                                    console.log("filteredarrayAlgo1 = ", filteredArrayOfAlgo1," filteredarrayAlgo2 = ", filteredArrayOfAlgo2,'savedFeedbackIds = ', savedFeedbackIds);
                                                    helpers.articleList(pageNo, articlePerPage, savedFeedbackIds);
                                                    response.render('dashboard.hbs', {
                                                    articleLists: titles,
                                                    header: heading,
                                                    workingSetid: id,
                                                })
                                            })
                                            .catch(err=>{console.log(err,'err')})   
                                        }
                                    })
                                });
                            }
                        });
                    }
                    catch(e){
                        console.log(e, 'catched error')
                    }
                });
            });
        }