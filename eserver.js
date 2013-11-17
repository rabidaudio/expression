var express = require('express');
var config = require('./config');
var scriptmaster = require('./scriptmaster');

//express settings
var app = express();
//app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser()); //for POST

//scripts
for( var i=0; i<config.scripts.length; i++ ){
    var scriptname = config.scripts[i].name;
    var args="";
    for (var j=0; j<config.scripts[i].args.required.length; j++)
        args = args +"/:"+ config.scripts[i].args.required[j];
    for (var k=0; k<config.scripts[i].args.optional.length; k++)
        args = args +"/:"+ config.scripts[i].args.optional[k] + '?';
    //This is some fuckedup repugnant shit
    eval( 'var '+ scriptname +' = new scriptmaster.Script(config.scripts[i]);' );
    eval('app.get( \'/\'+'+scriptname+'.script.name+args , function(req, res){'+scriptname+'.dir_handle(req,res);});');
    eval('app.post( \'/\'+'+scriptname+'.script.name , function(req, res){'+scriptname+'.post_handle(req,res); });');
}

console.log(app.routes);

app.listen(3000);



