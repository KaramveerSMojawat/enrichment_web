const fs = require('fs');
const hbs = require('hbs');
const helpers = require(__dirname + '/helpers/helper');
//directoryContents would return an array of file-names inside provided directory 
var directoryContents = require('readdir').readSync('assets/data');
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

module.exports = function(app) {
	var articlePerPage = 6;
	var currentPage = 1;
	Object.keys(routes).forEach(function(routeName) {
    	var router = express.Router();
    	// Initialize all routes and Initialize the route to add its functionality to router
    	require('./' + routeName)(router);
    	// Add router to the speficied route name in the app
   	 	app.use('/' + routeName, router);
  	});
    //find number of pages for lists 
	var numberOfpages = (items) =>{
		var numPages = 0;
        if (!Array.isArray(items) ||  !items.length  != null) {
            numPages = Math.ceil(items.length / articlePerPage);
        }
		return numPages;
	};


	app.use((req, res,next) => {
		next();
	});
	//console.log(directoryContents);
	hbs.registerPartials(__dirname + '/views/partials');
	app.set('view engine', 'html');
	app.engine('html', require('hbs').__express);
	//dashboard shows list of all filenames
	app.get('/', (request,response) => {
		var articleArray = [];
		//articleArray calls the result of fetchAllArticle()
    	articleArray = fetchAllArticles(directoryContents);
    	helpers.articleList(currentPage, articlePerPage);
    	var titles = articleArray.map((file)=>{
    		return {aid: JSON.parse(file.split("\n")[0]).article.aid, title: JSON.parse(file.split("\n")[0]).article.title};
    	});
    	response.render('dashboard.hbs', {
    		articleLists: titles
    	});
	});
	app.get('/:id', (request,response) => {
		var articleArray = [];
		//articleArray calls the result of fetchAllArticle()
    	currentPage = request.params.id;
    	articleArray = fetchAllArticles(directoryContents);
    	helpers.articleList(currentPage, articlePerPage);
    	var titles = articleArray.map((file)=>{
    		return {aid: JSON.parse(file.split("\n")[0]).article.aid, title: JSON.parse(file.split("\n")[0]).article.title};
    	});
    	response.render('dashboard.hbs', {
    		articleLists: titles
    	});
	});
	//article with its id
	app.get('/article/:id', (request,response) => {
		var articleArray = [];
		//fileName contains the name of file of which article is going to get shown in article page
		fileName = request.params.id;
		//articleArray calls the result of fetchArticle() 
    	articleArray = fetchArticle(fileName).map((val, index) =>{
    		return JSON.parse(val);
    	})
    	helpers.listArticleAlgo1();
		helpers.listArticleAlgo2();
    		
    	response.render('article.hbs', {
    		article1:	{
    			articleId: articleArray[0].article.aid,
    			articleText: articleArray[0].article.text,
    			articleTitle: articleArray[0].article.title,
    			articleRelatedArticle: articleArray[0].relarticles
    		},
    		article2: {
    			articleId: articleArray[1].article.aid,
    			articleText: articleArray[1].article.text,
    			articleTitle: articleArray[1].article.title,
    			articleRelatedArticle: articleArray[1].relarticles
    		}
    	});
    		
	});	
	pagingControls(numberOfpages);
}