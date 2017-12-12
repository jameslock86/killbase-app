let fs = require('fs');


console.log('hi');
fs.exists('../data/assassins.csv', function(exists){
	console.log('hello');
	  if(exists){ // results true
	      fs.readFile('../data/assassins.csv','utf8', function(err, data){
	         if(err){
	            console.log(err);
	         }
	         console.log(data);
	      });
	   }
});
