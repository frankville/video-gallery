video list and player with  angularJS + NodeJS

1st step: execute "bower install" and "npm install"


Note: a) after executing npm install, go to node_modules/video-thumb/lib/video-thumb.js and change the command string there for 

exec("avconv -ss '" + time + "' -vframes 1 -i '" + path + "' -y -s " + size.replace('x', '*') +" '"+destPath+"' ",...

this will take the files with spaces in the name too. 

b) the scrollable-table module sets the scrollable-container to a fixed value. if you want to change that 
you should edit (after executing bower install) the following file: bower_components/angular-scrollable-table/scrollable-table.css

c) the application expects to have  "videos" and "thumbnails" folders  in the __dirname path in order to retrieve videos and the other
to save/read the thumbnails of those videos. You can create a symlink in __dirname to your videos folder. The thumbnails folder can be created
 The path for those folders are specified in two variables in the nodeserver.js application:  

	"dirPath" which is the path to the directory containing video files (default: "videos/",
 	"dirThumbnail" which is the directory that will contain the generated thumbnails (default: "thumbnails/". 

