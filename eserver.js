var express = require('express');
var config = require('./config');
var scriptmaster = require('./scriptmaster');
//scripts
var wrek = new scriptmaster.Script(config.scripts[0]);
//var wrek = new scriptmaster.Script();
//console.log(wrek.script);

//express settings
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());//for POST


app.get( '/wrek/:date?', function(req, res){
    wrek.dir_handle(req, res);//This is some fuckedup repugnant shit
}); //DIR method

app.post('/wrek', function(req, res){ wrek.post_handle(req, res); } );     //POST method

app.listen();
