

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('admin:admin@ds145289.mlab.com:45289/sampledb', ['accountTypes']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/types', function(req, res){
	console.log('Received find all accountTypes request');
	db.accountTypes.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.get('/type/:id', function(req, res){
	console.log('Received findOne accountType request');
	db.accountTypes.findOne({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/addType', function(req, res){
	console.log(req.body);
	db.accountTypes.insert(req.body, function(docs){
		console.log(docs);
		res.json(docs);
	})
});

app.delete('/deleteType/:id', function(req, res){
	console.log("Received delete one accounttype request...");
	db.accountTypes.remove({_id: new mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put('/updateType', function(req, res){
	console.log("Received updateAccountType request");
	db.accountTypes.findAndModify({query: {"_id": new mongojs.ObjectId(req.body._id)},
										update: {$set: {name: req.body.name}}
										}, function(err, docs){
											console.log(docs);
											res.json(docs);
										})
	});

//app.use(express.static(__dirname + "/app/views"));
app.listen(3000);
console.log("server running on port 3000");