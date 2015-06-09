var express = require("express");
var app     = express();
var path    = require("path");
var bson = require('bson');
var url = require('url');
var mongodb = require('mongodb');
var uri = 'mongodb://maxs:tagspass@ds059898.mongolab.com:59898/videotagger';
app.get('/submitMomentum',function(req,res){

var moment = url.parse(req.url, true).query.moment;
console.log(moment);

	mongodb.MongoClient.connect(uri, function(err, db) {
var tags = db.collection('tags');

tags.insert(JSON.parse(moment), function(err, result) {
  if(err) throw err;
}
);
})
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify('OK'));
});

app.get('/allVideo',function(req,res){

mongodb.MongoClient.connect(uri, function(err, db) {
var videos = db.collection('videos');

videos.find().toArray(function (err, docs) {
			if(err) throw err;			
			console.log(JSON.stringify(docs));
			qres = docs;
			res.setHeader('Content-Type', 'application/json');
  		    res.send(JSON.stringify(qres));

});
})
});

app.get('/addVideo',function(req,res){

var video = url.parse(req.url, true).query.videoData;
console.log(video);

	mongodb.MongoClient.connect(uri, function(err, db) {
var videos = db.collection('videos');

videos.insert(JSON.parse(video), function(err, result) {
  if(err) throw err;
	}
);
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify('OK'));

})
});

app.get('/allBubbles',function(req,res){
	console.log('allBubbles');
	var qres
	mongodb.MongoClient.connect(uri, function(err, db) {
var tags = db.collection('tags');

tags.find().toArray(function (err, docs) {
			if(err) throw err;			
			console.log(JSON.stringify(docs));
			 qres = docs;
			res.setHeader('Content-Type', 'application/json');
  		    res.send(JSON.stringify(qres));

});
});


});

app.get('/allBubblesByVideoUrl',function(req,res){
	console.log('allBubblesByVideoUrl');
	var qres;
	var videoid = url.parse(req.url, true).query.videoid;
console.log(videoid);
	mongodb.MongoClient.connect(uri, function(err, db) {
var tags = db.collection('tags');

tags.find({'videoid':videoid}).toArray(function (err, docs) {
			if(err) throw err;			
			console.log(JSON.stringify(docs));
			 qres = docs;
			res.setHeader('Content-Type', 'application/json');
  		    res.send(JSON.stringify(qres));
});
});


});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/indxcan.html'));
});

app.listen(process.env.PORT || 9001, function(){
  console.log('listening on', process.env.PORT || 9001);
});
app.use(express.static('public'));