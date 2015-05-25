var express = require("express");
var app     = express();
var path    = require("path");
bson = require('bson');
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
});
app.get('/allBubbles',function(req,res){
	console.log('allBubbles');
	var qres
	mongodb.MongoClient.connect(uri, function(err, db) {
var tags = db.collection('tags');

tags.find().toArray(function (err, docs) {
			if(err) throw err;			console.log(JSON.stringify(docs));
			 qres = docs;
			res.setHeader('Content-Type', 'application/json');
  		    res.send(JSON.stringify(qres));

});


});


});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(9001);
