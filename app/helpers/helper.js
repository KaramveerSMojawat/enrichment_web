const hbs = require('hbs');
listArticleAlgo1 = () => {
	 hbs.registerHelper('listArticleAlgo1', function(items) { 
  		var out = "<div class='f21'>";
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
	   				+ "</div>";
  		}
	  	return out + "</div>";
	});
}
listArticleAlgo2 = () => {
	 hbs.registerHelper('listArticleAlgo2', function(items) {
  		var out = "<div class='f21'>";
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
  					+   "<td>" 
  					+     items[i].aid 
  					+   "</td>"
  					+   "<td>"  
  					+     items[i].title 
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
             
workinSetList = () => {
	hbs.registerHelper('workinSetList', function(items) {
		var itemName;
		var out = "<table class='table' id='exampleSelect1'>";
		for(var i=0; i<items.length; i++){
  				out = out 
  					+ "<tr>"
  					+	"<td>" 
  					+ 		items[i].name 
  					+ 	"</td>"
  					+ 	"<td>"  
  					+ 		items[i].dataSet 
  					+ 	"</td>"
  					+ 	"<td>"  
  					+ 		items[i].dataSource.type 
  					+ 	"</td>" 
  					+ 	"<td>" 
  					+ 		items[i].dataSource.folder_path 
  					+ 	"</td>" 
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