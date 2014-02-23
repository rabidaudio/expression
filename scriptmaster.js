var sh = require('execSync');


exports.Script = function(obj){

    this.script = obj;
    
    this.rest_handle = function(req, res){
        console.log('DIR request');
        handle(obj, req.params, req, res);
    };
    
    this.post_handle = function(req, res){
        console.log("POST request");
        handle(obj, req.body, req, res);
    };
    
}

///////////////////////////////////////////////
function run(script, args){
    var cmd = script.cmd;
    for(var i=0; i<args.length;i++)
        cmd = cmd + ' ' + args[i];
    console.log(cmd);
    return sh.exec(cmd);
    //return {stdout: "bark"};
}

function handle(script, inputs, req, res){
        var a = [];
        console.log(script);
        console.log(script.args.optional[0]);
        console.log(inputs);
        for(var i=0; i< script.args.required.length; i++){
            if (inputs[script.args.required[i]] !== undefined)
                a.push(inputs[script.args.required[i]]);
        }
        for(var i=0; i< script.args.optional.length; i++){
            if (inputs[script.args.optional[i]] !== undefined)
                a.push(inputs[script.args.optional[i]]);
        }
        console.log(inputs[script.args.optional[i]]);
        console.log(a);
        res.send( run(script, a).stdout );
}
