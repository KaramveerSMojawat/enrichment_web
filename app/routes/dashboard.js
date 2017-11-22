var commonFetchFile = require("../../app/lib/fetchArticles");
var directoryContents = require('readdir').readSync('assets/data');
const helpers = require('../../app/helpers/helper');
const constants = require('../../app/lib/constants');

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
            articleArray = commonFetchFile.fetchAllArticles(directoryContents);
            helpers.pagingControls(commonFetchFile.numberOfpages);
            helpers.articleList(currentPage, articlePerPage);
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
            var articleArray = [];
            //articleArray calls the result of fetchAllArticle()
            articleArray = commonFetchFile.fetchAllArticles(directoryContents);
            helpers.articleList(currentPage, articlePerPage);
            var titles = articleArray.map((file)=>{
                return {aid: JSON.parse(file.split("\n")[0]).article.aid, title: JSON.parse(file.split("\n")[0]).article.title};
            });
            console.log(commonFetchFile.numberOfpages);
            helpers.pagingControls();
            response.render('dashboard.hbs', {
                articleLists: titles
            });
        })
};