//http://stackoverflow.com/questions/6158933/http-post-request-in-node-js

// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

var httpRequest = exports.httpRequest = {
	request : function(url, port, jsonData, callback){
		  // Build the post string from an object
		  var post_data = querystring.stringify(jsonData);

		  // An object of options to indicate where to post to
		  var post_options = {
		      host: url.replace("http://","").split("/")[0],//'closure-compiler.appspot.com',
		      port: port,
		      path: "/" + url.split("/")[1],
		      method: 'POST',
		      headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'Content-Length': post_data.length
		      }
		  };

		  // Set up the request
		  var post_req = http.request(post_options, function(res) {
		      res.setEncoding('utf8');
		      res.on('data', function (chunk) {
		          console.log('Response: ' + chunk);
		      });
		      /*
		      res.on('data', function (chunk) {
		          //console.log('Response: ' + chunk);
		          resp_data += chunk;
		      });
		      res.on('end',function(){
		      	
		      });
		      */
		  });

		  // post the data
		  post_req.write(post_data);
		  post_req.end();
	}
}

/*
 later

// This is an async file read
fs.readFile('LinkedList.js', 'utf-8', function (err, data) {
  if (err) {
    // If this were just a small part of the application, you would
    // want to handle this differently, maybe throwing an exception
    // for the caller to handle. Since the file is absolutely essential
    // to the program's functionality, we're going to exit with a fatal
    // error instead.
    console.log("FATAL An error occurred trying to read in the file: " + err);
    process.exit(-2);
  }
  // Make sure there's data before we post it
  if(data) {
    PostCode(data);
  }
  else {
    console.log("No data to post");
    process.exit(-1);
  }
});
*/