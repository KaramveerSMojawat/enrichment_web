const fs = require('fs');
//directoryContents would return an array of file-names inside provided directory 
//Fetch articles from one file
var dirName = '' 
var fetchArticle = (fileName) =>{
    console.log(fileName);
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
var fetchAllArticles = (dir, fileNameArray) =>{
    var articles = []; 
    console.log(dir, " ",fileNameArray)
    try{
    	articles = fileNameArray.map((val, index) =>{
    		return fs.readFileSync(dir + "/" + val, 'utf-8');
    	})
        dirName = dir;
    	//returns array of articles from all files in a directory
    	return articles;
    }catch(e){
        return e;
    }
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
    fetchAllArticles,
    numberOfpages
}