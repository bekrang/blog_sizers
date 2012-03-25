var mongoose = require('mongoose');
var properties = require('../properties.js');
var models = require('./models.js');
var xml2json = require('./xml2json.js').xml2json;
var httpRequest = require('./httpRequest.js').httpRequest;

var callService = exports.callService = function(req, res){
	var oInput = {};
	var oOutput = {"retCd":"OK"};
	if(req.body.input) {
		oInput = JSON.parse(req.body.input);
		if(oInput.svcId == "savePost"){
			if(oInput.adminToken != properties.adminToken) {
				res.end("Admin authentication is not valid!!");
				return;
			}
			if(oInput._id && oInput._id.length>1){//update
				mongoose.connect(properties.mongodbUrl);
				models.blogposts.findById(oInput._id, function(err, oblogpost) {
					if (!oblogpost) {
						//return next(new Error('Could not load Document'));
						mongoose.disconnect();
						console.log(err);
						res.end();
					} else {
						// do your updates here
						oblogpost.postCate = unescape(oInput.postCate);
						oblogpost.postTitle= unescape(oInput.postTitle);
						oblogpost.postContent = unescape(oInput.postContent);
						oblogpost.save(function(err) {
							mongoose.disconnect();
							if (err) {
								console.log(err);
								oOutput.retCd = "ER";
							} else {
								console.log('saved!');
							}
							res.end();
						});
					}
				});
			} else {
				var oblogpost = new models.blogposts();
				oblogpost.postCate= unescape(oInput.postCate);
				oblogpost.postTitle= unescape(oInput.postTitle);
				oblogpost.postContent = unescape(oInput.postContent);
				oblogpost.date = new Date();
				mongoose.connect(properties.mongodbUrl);
				oblogpost.save(function(err){
					mongoose.disconnect();
					if(err){//throw err;
						console.log(err);
						oOutput.retCd = "ER";
					}else{
						console.log('saved!');
				 	}
					res.end(JSON.stringify(oOutput));
				});
			}
		} else if(oInput.svcId == "delPost"){

			if(oInput.adminToken != properties.adminToken) {
				res.end("Admin authentication is not valid!!");
				return;
			}
			mongoose.connect(properties.mongodbUrl);
			models.blogposts.remove({"_id":oInput._id}, function(err) {
				mongoose.disconnect();
				if (err) {
					console.log(err);
					oOutput.retCd = "ER";
				} else {
					console.log('saved!');
				}
				res.end();
			});
		} else if(oInput.svcId == "getPostList"){
			mongoose.connect(properties.mongodbUrl);
			models.blogposts.find({}).sort('date',-1).execFind(function (err, docs) {
				mongoose.disconnect();
				if(err){//throw err;
					console.log(err);
					oOutput.retCd = "ER";
				}else{
					oOutput["blogposts"] = docs;// docs is an array
					console.log('rietrived!');
			 	}
				res.end(JSON.stringify(oOutput));
			});
		} else if(oInput.svcId == "sendTrackback"){
			
			var postData = 		{
				"url":"http://sizers.cloudfoundry.com/postview/"+unescape(oInput._id),
				"title":unescape(oInput.postTitle),
				"blog_name":"sizers",
				"excerpt":unescape(oInput.postContent).substring(0,50)+"..."
			}

			httpRequest.request(unescape(oInput.trackbackUrl), "80", postData, function(rtnData){
				//console.log(rtnData);
				//res.end(JSON.stringify(rtnData));
				var oRtn = xml2json.parser(rtnData);
				console.log(oRtn);
				if(oRtn.response && oRtn.response.error == 0 && unescape(oInput.trackbackTitle)){
					var otrackback = new models.trackbacks();
					otrackback.kind= "O";
					otrackback.postId= unescape(unescape(oInput._id));
					otrackback.url = unescape(unescape(oInput.trackbackPostUrl));
					otrackback.title = unescape(unescape(oInput.trackbackTitle));
					otrackback.blog_name = unescape("sizers");
					otrackback.excerpt = unescape(unescape(oInput.postContent).substring(0,50)+"...");
					otrackback.date = new Date();
					mongoose.connect(properties.mongodbUrl);
					otrackback.save(function(err){
						mongoose.disconnect();
						if(err){//throw err;
							console.log(err);
							oOutput.retCd = "ER";
						}else{
							console.log('saved!');
					 	}
						res.end(JSON.stringify(oOutput));
					});
				} else res.end(JSON.stringify(oOutput));
			});
			/*
			var http = require('http');
			var client = http.createClient(80, 'http://www.example.com'); // to access this url i need to put basic auth.

			var request = client.request('GET', '/', {'host': 'www.example.com'});
			request.end();
			request.on('response', function (response) {
				console.log(response);
				/ *
			  console.log('STATUS: ' + response.statusCode);
			  console.log('HEADERS: ' + JSON.stringify(response.headers));
			  response.setEncoding('utf8');
			  response.on('data', function (chunk) {
			    console.log('BODY: ' + chunk);
			  });
				* /
			});
			*/
		} else if(oInput.svcId == "getTrackbacks"){ 
			mongoose.connect(properties.mongodbUrl);
			models.trackbacks.find({postId:oInput.postId}).sort('date',-1).execFind(function (err, docs) {
				mongoose.disconnect();
				if(err){//throw err;
					console.log(err);
					oOutput.retCd = "ER";
				} else {
					oOutput["trackbacks"] = docs;// docs is an array
			 	}
				console.log(oOutput);
				res.end(JSON.stringify(oOutput));
			});
		}
	}
	else res.end();
}