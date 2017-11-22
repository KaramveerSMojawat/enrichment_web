const fs = require('fs');
const constants = require(__dirname + '/constants');
//directoryContents would return an array of file-names inside provided directory 
//Fetch articles from one file 
var fetchArticle = (fileName) =>{
    try{

    	var article = fs.readFileSync('./assets/data/' + fileName, 'utf-8');
        //split two articles of one file into an array of two and return it
        return article.split('\n');
    }catch(e){
    	//else for empty or any error towards file path, would returns an empty array  
        return [];
    }
};
//Fetch articles from all file
var fetchAllArticles = (fileNameArray) =>{
    var articles = []; 
    try{
    	articles = fileNameArray.map((val, index) =>{
    		return fs.readFileSync('./assets/data/' + val, 'utf-8');
    	})
    	//returns array of articles from all files in a directory
    	return articles;
    }catch(e){
        return e;
    }
};
var numberOfpages = (items) =>{
        var numPages = 0;
        if (!Array.isArray(items) ||  !items.length  != null) {
            numPages = Math.ceil(items.length / constants.articlePerPage);
        }
        return numPages;
    };

module.exports = {
    fetchArticle,
    fetchAllArticles,
    numberOfpages
}