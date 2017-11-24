var commonFetchFile = require("../../app/lib/fetchArticles");
const helpers = require('../../app/helpers/helper');
var directoryContent=''
var heading = ''
var data = ''
/*mordule.exports =*/

module.exports = router => {
     articlePerPage = 6,
     currentPage = 1,

    //For particular article id
    router
        .route("/data/:id")
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
                articleLists: titles,
                header: heading
            });
        })
      //For all articles
    router
        .route("/:data")
        .get((request, response) => {
            console.log('hello');
            directoryContent = request.query["folder-path"] 
            heading = ((request.query["name"]).split("-")).join(" ");
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
                articleLists: titles,
                header: heading
            });
        })
};