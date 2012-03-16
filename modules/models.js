var mongoose = require('mongoose');


var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


var blogposts = new Schema({
	id :ObjectId,
	postCate :String,
	postTitle :String,
	postContent :String,
	date  :Date
});

var trackbacks = new Schema({
	id : ObjectId,
	kind : String, //"I:inbound, O:outbound"
	postId : String,
	url : String,
	title : String,
	blog_name : String,
	excerpt : String,
	date : Date
});

mongoose.model("blogposts", blogposts);
exports.blogposts = mongoose.model("blogposts");

mongoose.model("trackbacks", trackbacks);
exports.trackbacks = mongoose.model("trackbacks");
/*
이것으로 모듈화 끝.

이제 models.js를 사용할 apps.js로 넘어가자.

var models = require(‘./lib/models’),
Comments = models.Comments;

여기 보면 models.Comments라고해서 아까 위에서 exports에 추가한 것을 사용할 수 있다.

이제 저장해볼까?

var newComments = new Comments();
newComments.to = channel;
newComments.from = from;
newComments.body = msg;
newComments.date = new Date();
newComments.save(function(err){
console.log(err);

});


*/


