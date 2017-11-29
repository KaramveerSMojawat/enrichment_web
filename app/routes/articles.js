const helpers = require('../../app/helpers/helper');
var commonFetchFile = require("../../app/lib/fetchArticles");
var feedback = require("../../app/lib/feedback");
var mongoose = require("mongoose");
const { Schema } = mongoose;
module.exports = router => {
    //For particular article id
    router
        .route("/:id")
        .get((request, response) => {
            var articleArray = [];
            var feedbackSelection = ['Correct','Incorrect'];
            //fileName contains the name of file of which article is going to get shown in article page
            var id = request.params.id;
            var fileName = request.query['data-set'];
            var workingSetId = commonFetchFile.getworkingSetId(); 
            feedback.
                getAllFeedbacks(fileName).then(feeds =>{
                    var empytyArray = [];
                    articleArray = commonFetchFile.fetchArticle(fileName).map((val) =>{
                        return JSON.parse(val);
                    });
                    if(feeds.length === 0){ 
                        var algo1ReviewStatus = 'notCompletedAlgo1Review'
                        var algo2ReviewStatus = 'notCompletedAlgo2Review'
                        helpers.listArticleAlgo1(algo1ReviewStatus, empytyArray);
                        helpers.listArticleAlgo2(algo2ReviewStatus, empytyArray);
                        response.render('article.hbs', {
                            article1:   {
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
                            },
                            feedSelect: feedbackSelection,
                            workingSetId: id
                        });
                    }else if(feeds.length > 0){
                        var feedbackAlgo1Object = {
                            "refid": '',
                            "comment": '',
                            "feedback": ''
                        };
                        var feededAlgo1Array = [];
                        var feedbackAlgo2Object = {
                            "refid": '',
                            "comment": '',
                            "feedback": ''
                        };
                        var feededAlgo2Array = [];
                        var algo1Status = 'notCompletedAlgo1Review';
                        var algo2Status = 'notCompletedAlgo2Review';
                        var isAlgo1 = false;
                        var isAlgo2 = false;

                        feeds.forEach((val, index) =>{
                            if(val.algorithm === 'Algorithm 2'){
                                algo2Status = 'completedReviewForAlgo2';
                                feededAlgo2Array.push({
                                    "refid": val.refArticleId,
                                    "comment": val.text,
                                    "feedback": val.feedback
                                })
                            }else if(val.algorithm === 'Algorithm 1'){
                                algo1Status = 'completedReviewForAlgo1';
                                feededAlgo1Array.push({
                                    "refid": val.refArticleId,
                                    "comment": val.text,
                                    "feedback": val.feedback
                                }) 
                            }
                        })
                        helpers.listArticleAlgo1(algo1Status, feededAlgo1Array);
                        helpers.listArticleAlgo2(algo2Status, feededAlgo2Array);
                        response.render('article.hbs', {
                            article1:   {
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
                            },
                            feedSelect: feedbackSelection,
                            workingSetId: id
                        });
                    }
                }).catch(e =>{
                    console.log('in feed',e);
                })
            });

    router
        .route("/")
        .get((request, response) => {
	});
}