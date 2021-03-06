const helpers = require('../../app/helpers/helper');

module.exports = router => {
    //For particular article id
    router
        .route("/:id")
        .get((request, response) => {
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
		pagingControls(numberOfpages);
    });
      //For all articles
    router
        .route("/")
        .get((request, response) => {
            
	});
}