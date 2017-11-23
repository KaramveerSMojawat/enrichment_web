var commonFetchFile = require("../../app/lib/fetchArticles");
const helpers = require('../../app/helpers/helper');
const constants = require('../../app/lib/constants');
var directoryContent=''

/*mordule.exports =*/

module.exports = router => {
     articlePerPage = 6,
     currentPage = 1,

    //For particular article id
    router
        .route("/:id")
        .get((request, response) => {
            var articleArray = [];
            //articleArray calls the result of fetchAllArticle()
            currentPage = request.params.id;
            articleArray = commonFetchFile.fetchAllArticles(directoryContent, require('readdir').readSync(directoryContent));
            helpers.articleList(currentPage, articlePerPage);
            helpers.pagingControls(commonFetchFile.numberOfpages);
            
            var titles = articleArray.map((file)=>{
                return {aid: JSON.parse(file.split("\n")[0]).article.aid, title: JSON.parse(file.split("\n")[0]).article.title};
            });
            response.render('dashboard.hbs', {
                articleLists: titles
            });
        })
      //For all articles
    router
        .route("/")
        .get((request, response) => {
            console.log('hello');
            directoryContent = request.query["folder-path"] 
            console.log(request.query["name"]);
            console.log(request.query["folder-path"]);
            var articleArray = [];
            //articleArray calls the result of fetchAllArticle()
            articleArray = commonFetchFile.fetchAllArticles(directoryContent, require('readdir').readSync(directoryContent));
            helpers.articleList(currentPage, articlePerPage);
            var titles = articleArray.map((file)=>{
                return {aid: JSON.parse(file.split("\n")[0]).article.aid, title: JSON.parse(file.split("\n")[0]).article.title};
            });
            helpers.pagingControls(commonFetchFile.numberOfpages);
            response.render('dashboard.hbs', {
                articleLists: titles
            });
        })
};