var http = require("http");
var express = require("express");
var fs = require("fs");
var path = require("path");
var util = require("util");
var videoThumb = require("video-thumb");

var dirPath = "./videos/";
var dirThumbnails = "./thumbnails/";

var app = express();

var initPort = 5000;

function makeThumbnails(){
	fs.readdir(dirPath, function(err,files){
		if(err){
			throw err;
		}

		files.map(function(file){
			return path.join(dirPath,file);
		}).filter(function(file){
			return fs.statSync(file).isFile();
		}).forEach(function(file){
			var cDate =  fs.statSync(file).ctime;
			var fileName = file.toString();
			console.log(fileName);
			fileName = fileName.replace("videos/","");
			console.log(fileName);
			videoThumb.extract(file, dirThumbnails+fileName+'.png', '00:00:22', '128x100', function(){
				console.log("creado el thumbnail en "+dirThumbnails+fileName+'.png');
			});
			console.log("lo que le paso al thumbnail "+file);

		});

	});
}


makeThumbnails();

app.use("/",express.static(__dirname));

app.get("/", function(req,res){


});

app.get("/videoList",function(req,res){

	var videoList = [];
	fs.readdir(dirPath, function(err,files){
		if(err){
			throw err;
		}

		files.map(function(file){
			fileName = file.toString();
			return path.join(dirPath,file);
		}).filter(function(file){
			return fs.statSync(file).isFile();
		}).forEach(function(file){
			var cDate =  fs.statSync(file).ctime;
			var fileName = file.toString();
			console.log(fileName);
			fileName = fileName.replace("videos/","");
			console.log(fileName);
			videoList.push({name:fileName,creationDateTime:cDate,thumbnail:dirThumbnails+fileName+".png"});
			console.log("lo que le paso al thumbnail "+dirThumbnails+fileName+".png");

		});
		res.send(videoList);

	});
	
	
});

app.get("/playVideo/:videoName",function(req,res){
	console.log("nombre de video a hacer stream "+req.params.videoName);
	var streamUrl = "http://localhost:2011/videos/"+req.params.videoName;
	//var streamUrl = "http://192.168.11.251:2011/videos/"+req.params.videoName;
	res.json({url: streamUrl});
});

var server = http.createServer(app);

server.listen(2011,function(){
	console.log("escuchando en 2011");
});