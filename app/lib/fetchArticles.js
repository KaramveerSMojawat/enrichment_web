//This JS file is for storing some usually used data fetching files from directory
const fs = require('fs');
//directoryContents would return an array of file-names inside provided directory 
//Fetch articles from one file
var dirName = '' 
var workingSetId = '';
var fetchArticle = (fileName) =>{
    try{
    	var article = fs.readFileSync('./'+dirName+"/" + fileName, 'utf-8');
        //split two articles of one file into an array of two and return it
        return article.split('\n');
    }catch(e){
    	//else for empty or any error towards file path, would returns an empty array  
        return [];
    }
};
//Fetch articles from all file
var fetchDirectory = (dir) =>{
    dirName = dir;
};
var getworkingSetId = () =>{
    return workingSetId;
};
var setworkingSetId = (id) =>{
    workingSetId = id;
};
var numberOfpages = (items) =>{
    articlePerPage = 6;
    var numPages = 0;
    if (!Array.isArray(items) ||  items.length  != null) {
        numPages = Math.ceil(items.length / articlePerPage);
    }
    return numPages;
};
module.exports = {
    fetchArticle,
    fetchDirectory,
    numberOfpages,
    setworkingSetId,
    getworkingSetId
}