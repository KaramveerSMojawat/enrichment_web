const hbs = require('hbs');
enlistFeedbackSelect = (uniqueSalt, data, feedObject) =>{
    var outSetection = "<div class='ml-md-4'>";
      for(var i=0, l=data.length; i<l; i++) {
        /*if(feedObject.)*/
        var str = '';
        var newAlgoTest = new RegExp('^new');
        var oldAlgoTest = new RegExp('^old');
        var radioIdentifierClass = ''
        if(feedObject.feedback === data[i]){
          str = 'checked'
        }else if(feedObject.feedback === undefined){
          str = '';
        } 
        if(oldAlgoTest.test(uniqueSalt)){
          radioIdentifierClass = 'old'
        }else if(newAlgoTest.test(uniqueSalt)){
          radioIdentifierClass = 'new'
        }
        outSetection = outSetection                  
                  + "<div id='radioForm' class='form-check form-check-inline'>"
                  +    "<label class='form-check-label text-center'>"
                  +      `<input class='form-check-input ${radioIdentifierClass}' type='radio' name='${uniqueSalt}' id='${uniqueSalt}' value='${data[i]}' ${str}> `
                  +        data[i]
                  +    "</label>"
                  +  "</div>" 
      }
      return outSetection +"</div>"  
}
listArticleAlgo1 = (str, feededArray) => {
   hbs.registerHelper('listArticleAlgo1', function(items,options) { 
 var out = `<div id='algo1StatusReview' class='${str} card mb-md-2'`;     
      var a = "old";
      var obj = {}
      for(var i=0, l=items.length; i<l; i++) {
          if(feededArray.length > 0){
            feededArray.forEach(val => {
              if(feededArray.length !== 0){
                if(val.refid === (a+items[i].aid)){
                   if(val.comment === '' || val.comment === undefined){
                      obj = {"comment": '', "feedback": val.feedback};
                   }else{
                    obj = {"comment": val.comment, "feedback": val.feedback};
                   }
                }  
              }
            })
          }else if(feededArray.length === 0){
            obj = {"comment": '', "feedback": ''};
          }
        out = out  
          + "<div class='card mb-md-2'>"
          + "<div class='card-header'>" 
          +  "<div class='row'>"
          +     "<div class='col-md-3'>"   
          +       `<h6 class='card-subtitle mb-2 text-muted align-self-center text-left' id='${items[i].aid}'>` +  items[i].aid + `</h6>`
          +     "</div>"
          +     "<div class='col-md-6'>"   
          +       "<h6 class='card-subtitle mb-2 text-muted align-self-center  text-center'>" +  items[i].title + "</h6>"
          +     "</div>"
          +     "<div class='col-md-3'>"
          +        "<h6 class='card-subtitle mb-2 text-muted align-self-center text-right'>" + items[i].score + "</h6>"
          +     "</div>"
          +   "</div>"
          + "</div>"
          +   "<div class='card-block'>"  
          +     "<p class='card-text'>" + items[i].text + "</p>" 
          +    "</div>"
          +       enlistFeedbackSelect((a+items[i].aid),options.data.root.feedSelect, obj)
          +    `<textarea class='form-control textarea1' id='${a+items[i].aid}textArea' rows='3' placeholder='COMMENT'>${obj.comment}</textarea>`
          + "</div>"
      }
      return out + "</div>";
  });
}

listArticleAlgo2 = (str, feededArray) => {
  hbs.registerHelper('listArticleAlgo2', function(items, options) {
  		var out = `<div id='algo2StatusReview' class=' ${str}  card mb-md-2'`;
      var a = "new"
  		var obj = {}
      for(var i=0, l=items.length; i<l; i++) {
        if(feededArray.length > 0){
          feededArray.forEach( val => {
            if(feededArray.length !== 0){
                  if(val.refid === (a+items[i].aid)){
                     if(val.comment === '' || val.comment === undefined){
                        obj = {"comment": '', "feedback": val.feedback};
                     }else{
                      obj = {"comment": val.comment, "feedback": val.feedback};
                     }
                  }  
                }
          })
        }else if(feededArray.length === 0){
            obj = {"comment": '', "feedback": ''};
        }
	   		out = out  
	   			+ "<div class='card mb-md-2'>"
	   			+	"<div class='card-header'>" 
	   			+  "<div class='row'>"
          +     "<div class='col-md-3'>"   
          +       "<h6 class='card-subtitle mb-2 text-muted align-self-center text-left'>" +  items[i].aid + "</h6>"
          +     "</div>"
          +     "<div class='col-md-6'>"   
          +       "<h6 class='card-subtitle mb-2 text-muted align-self-center text-center'>" +  items[i].title + "</h6>"
          +     "</div>"
          +     "<div class='col-md-3'>"
          +        "<h6 class='card-subtitle mb-2 text-muted align-self-center text-right'>" + items[i].score + "</h6>"
          +     "</div>"
          +  "</div>"
	   			+	"</div>"
	   			+ 	"<div class='card-block'>"  
	   			+   	"<p class='card-text'>" + items[i].text + "</p>" 
	   			+ 	 "</div>"
          +       enlistFeedbackSelect((a+items[i].aid),options.data.root.feedSelect, obj)
     		  +   "<div class='row'>"
          +     "<div class='col-md-12'>" 
          +       `<textarea class='form-control textarea2' id='${a+items[i].aid}textArea' rows='3' placeholder='COMMENT'>${obj.comment}</textarea>`
          +       "</div>"
          +     "</div>"
          + "</div>"
  		}
  		return out + "</div>";
	});
}
articleList = (currentPage, articlePerPage, completedArticleId) => {
	 hbs.registerHelper('articleList', function(items) {
  		var out = "<table class='table' id='mytable'>";
  	  for(var i=0, l=items.length; i<l; i++) {
  			var statusComplete = 'feedbacknotCompleted'
        if(items[i].aid === undefined){
  				break;
  			}
       	else{
            if(completedArticleId.length !== 0){
              var a = 0;
                var flag = completedArticleId.some(value =>{
                    return value === (items[i].aid + '')  
                })
                if(flag === true){
                  var statusComplete = 'feedbackCompleted'
                }
            }    
  				out = out 
  					+ `<tr id=${items[i].aid}>`
  					+   `<td class='btn-link' id=${items[i].aid}>`
  					+     items[i].aid 
  					+   "</td>"
  					+   "<td>"  
  					+     items[i].title 
  					+   "</td>"
            +   `<td ><p><span class='text-success ${statusComplete}'><i class='fa fa-check' aria-hidden='true'></i></span></p></td>`
           	+ "</tr>"
  			}
  		}
  		return out + "</table>";
	});
}
pagingControls = (numberOfpages, articles) => {
	hbs.registerHelper('pagingControls', function(items) {
		var out = "<table class='table' id='mytable' id='content'>";
			for(var i=0; i<numberOfpages(articles); i++) {		
    		out = out 
    			+ "<li class='page-item'>"
    			+	"<a class='page-link'>"
    			+ 		(i+1) 
    			+	"</a>"
    			+ "</li>";
  		}
  		return out + "</table>";
	});
}
             
workinSetList = (currentPage, articlePerPage) => {
	hbs.registerHelper('workinSetList', function(items) {
		var itemName;
    var out = `<table class='table' id='exampleSelect1'>`;      
      for(var i=(currentPage - 1)*articlePerPage, l=Math.min(currentPage*articlePerPage, items.length); i<l; i++){
          out = out 
            +  `<tr id='${items[i]._doc._id}'>`
            +  `<td id='${items[i]._doc._id}' class='invisible'>`
            +  `</td>`
            +  "<td>" 
            +     items[i]._doc.name 
            +   "</td>"
            +   "<td>"  
            +     items[i]._doc.dataSet 
            +   "</td>"
            +   "<td>"  
            +     items[i]._doc.dataSource.type
            +   "</td>" 
            +   "<td>" 
            +     items[i]._doc.dataSource.folderPath 
            +   "</td>"
            + "</tr>";
  	 }
  		return out + "</table>";
	});
}	

module.exports = {
	listArticleAlgo1,
	listArticleAlgo2,
	articleList,
	pagingControls,
	workinSetList
}