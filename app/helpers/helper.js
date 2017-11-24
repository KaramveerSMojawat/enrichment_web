const hbs = require('hbs');
listArticleAlgo1 = () => {
	 hbs.registerHelper('listArticleAlgo1', function(items) { 
  		var out = "<div class='f21'>";
      var a = "old"
  		for(var i=0, l=items.length; i<l; i++) {
	   		out = out  
	   				+ "<div class='card mb-md-2'>"
	   				+	"<div class='card-header'>" 
	   				+ 		"<h6 class='card-subtitle mb-2 text-muted '>" +  items[i].aid + "</h6>"
	   				+	"</div>"
	   				+ 	"<div class='card-block'>"  
	   				+ 		"<h4 class=' card-title'>" + items[i].title + "</h4>" 
	   				+   	"<p class='card-text'>" + items[i].text + "</p>" 
	   				+  		"<p class='card-text'>" + items[i].score + "</p>"
	   				+ 	 "</div>"
            +    "<p class='text-center'>"
            +      `<a class='btn btn-primary' data-toggle='collapse' href='#${a+items[i].aid}' aria-expanded='false' aria-controls='${a+items[i].aid}'>`
            +        "Add Your Feedback"
            +      "</a>"
            +    "</p>"
            +    `<div class='collapse' id='${a+items[i].aid}'>`
            +      "<div class='card card-body'>"
            +        "<form>"
            +            "<fieldset pl-md-2 pr-md-2>"
            +              "<div class='form-group'>"
            +                  "<select id='disabledSelect' class='form-control'>"
            +                    "<option>Feedback select</option>"
            +                  "</select>"
            +                "</div>"
            +                "<div class='form-group'>"
            +                  "<input type='text' id='disabledTextInput' class='form-control' placeholder='comment'>"
            +                "</div>"
            +                "<button type='submit' class='btn btn-primary'>Submit</button>"
            +              "</fieldset>"
            +          "</form>"
            +      "</div>"
            +    "</div>" 
	   				+ "</div>";
  		}
	  	return out + "</div>";
	});
}
enlistFeedbackSelect = (data) =>{
    console.log(data);
   var outSetection = "<select id='disabledSelect' class='form-control'>";
        for(var i=0, l=data.length; i<l; i++) {
            outSetection = outSetection                  
                          + "<option>"+ data[i] +"</option>"
        }
        return outSetection +"</select>"  
}
listArticleAlgo2 = () => {
	 hbs.registerHelper('listArticleAlgo2', function(items, options) {
      console.log( "-----", options.data.root.feedSelect, "-----");
  		var out = "<div class='f21'>";
      var a = "new"
  		for(var i=0, l=items.length; i<l; i++) {
	   		out = out  
	   			+ "<div class='card mb-md-2'>"
	   			+	"<div class='card-header'>" 
	   			+ 		"<h6 class='card-subtitle mb-2 text-muted '>" +  items[i].aid + "</h6>"
	   			+	"</div>"
	   			+ 	"<div class='card-block'>"  
	   			+ 		"<h4 class=' card-title'>" + items[i].title + "</h4>" 
	   			+   	"<p class='card-text'>" + items[i].text + "</p>" 
	   			+  		"<p class='card-text'>" + items[i].score + "</p>"
	   			+ 	 "</div>"
          +    "<p class='text-center'>"
          +      `<a class='btn btn-primary' data-toggle='collapse' href='#${a+items[i].aid}' aria-expanded='false' aria-controls='${a+items[i].aid}'>`
          +        "Add Your Feedback"
          +      "</a>"
          +    "</p>"
          +    `<div class='collapse' id='${a+items[i].aid}'>`
          +      "<div class='card card-body'>"
          +        "<form>"
          +            "<fieldset pl-md-2 pr-md-2>"
          +              "<div class='form-group'>"
          +          enlistFeedbackSelect(options.data.root.feedSelect)
          +                "</div>"
          +                "<div class='form-group'>"
          +                  "<input type='text' id='disabledTextInput' class='form-control' placeholder='comment'>"
          +                "</div>"
          +                "<button type='submit' class='btn btn-primary text-center'>Submit</button>"
          +              "</fieldset>"
          +          "</form>"
          +      "</div>"
          +    "</div>"  
	   			+ "</div>";
  		}
  		return out + "</div>";
	});
}
articleList = (currentPage, articlePerPage) => {
	 hbs.registerHelper('articleList', function(items) {
  		var out = "<table class='table' id='mytable'>";
  		console.log(currentPage);
  		for(var i=(currentPage - 1)*articlePerPage, l=Math.min(currentPage*articlePerPage, items.length); i<l; i++) {
  			if(items[i].aid === undefined){
  				break;
  			}
  			else{
  				out = out 
  					+ "<tr>"
  					+   `<td class='btn-link' id=${items[i].aid}>` 
  					+     items[i].aid 
  					+   "</td>"
  					+   "<td>"  
  					+     items[i].title 
  					+   "</td>"
            +   "<td>"
            +    "<button type='button' class='btn btn-info' data-toggle='modal' data-target='#exampleModalLong'>"
            +      "Show Feedbacks"
            +    "</button>"
            +   "</td>"
            +   "<td>"
            +     "<button class='btn btn-primary' data-toggle='modal' data-target='#addFeedbackModalLong'>"
            +         "Add Feed back" 
            +     "</button>"
            +   "</td>" 
  					+ "</tr>";
  			}
  		}
  		return out + "</table>";
	});
}
pagingControls = (numberOfpages) => {
	hbs.registerHelper('pagingControls', function(items) {
		var out = "<table class='table' id='mytable' id='content'>";
		console.log('I am in pagingControls ', numberOfpages(items));
  		for(var i=0; i<numberOfpages(items); i++) {		
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
    var out = "<table class='table' id='exampleSelect1'>";      
      for(var i=(currentPage - 1)*articlePerPage, l=Math.min(currentPage*articlePerPage, items.length); i<l; i++){
          out = out 
            + "<tr>"
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
      /*var out=items.reduce((acc,item)=>{
        acc+=
      },'')*/
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