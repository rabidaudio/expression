var express = require('express');
var config = require('./config');
var scriptmaster = require('./scriptmaster');
var http = require('http');
var querystring = require('querystring');

//express settings
var app = express();
//app.set('port', process.env.PORT || 3000);
/*app.logger(function(tokens,req,res){
    
});*/
app.use(express.bodyParser()); //for POST
app.set('view engine', 'jade');

var api_id = 3;


function dblog(req, func, e){
    if(e==undefined)
        e = false;
    var p;
    if (req.params !== undefined){
        p = req.params;
    }else if(req.body !== undefined){
        p = req.body;
    }else if(req.params !== undefined){
        p=req.query;
    }else{
        p = {};
    }
    var r;
    if(req.route !== undefined){
        r=req.route;
    }else{
        r={method: ''};
    }
    var data = querystring.stringify({
        id: api_id,
        func: func,
        method: r.method,
        params: p,
        remote_addr: req.ip,
        protocol: req.protocol,
        error: e
    });
    console.log(data);
    var post_req = http.request({
            hostname: '54.235.67.27',
            port: 80,
            path: '/N/logger.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        },function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
          });
        }); 
        //function() {console.log("Logged Request to DB");});
    post_req.write(data);
    post_req.end();
    //console.log(req);
}


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
    eval('app.get( \'/\'+'+scriptname+'.script.name+args , function(req, res){ dblog(req, \''+scriptname+'\', false);  '+scriptname+'.dir_handle(req,res);});');
    eval('app.post( \'/\'+'+scriptname+'.script.name , function(req, res){ dblog(req, \''+scriptname+'\', false); '+scriptname+'.post_handle(req,res); });');
}

//docs
app.get('/docs', function(req, res){
    res.render('docs.jade', config.scripts[0]);
});

app.use(function(req, res, next){
  dblog(req, '', true);
  res.send(404, '{error: "Unknown request."}');
});


app.listen(3000);



