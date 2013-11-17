var express = require('express');
var config = require('./config');
var scriptmaster = require('./scriptmaster');

//express settings
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());//for POST

//scripts
var resources = [];
for( var i=0; i<config.scripts.length; i++ ){
    resources[i] = new scriptmaster.Script(config.scripts[i]);
    app.get( '/'+resources[i].script.name+'/:date?' ,
                                        function(req, res){
        resources[i].dir_handle(req,res);
    });
    app.pist( '/'+resources[i].script.name ,
                                        function(req, res){
        resources[i].post_handle(req,res);
    });
}
//var wrek = new scriptmaster.Script(config.scripts[0]);
//var wrek = new scriptmaster.Script();
//console.log(wrek.script);


app.listen();


/*app.get( '/wrek/:date?', function(req, res){
    wrek.dir_handle(req, res);//This is some fuckedup repugnant shit
}); //DIR method

app.post('/wrek', function(req, res){ wrek.post_handle(req, res); } );     //POST method
*/
