var sh = require('execSync');

function Script(obj){

    this.script = obj;
    
    this.dir_handle = dir_handle;
    this.post_handle = post_handle;
    
    function dir_handle(req, res){
        console.log('DIR request');
        handle(this.script, req.params, req, res);
    }
    
    function post_handle(req, res){
        console.log("POST request");
        handle(this.script, req.body, req, res);
    }
    

    ///////////////////////////////////////////////
    function run(script, args){
        var cmd = script.cmd;
        for(var i=0; i<args.length;i++)
            cmd = cmd + ' ' + args[i];
        //console.log(cmd);
        return sh.exec(cmd);
    }

    function handle(script, inputs, req, res){
            var a = [];
            //console.log(script);
            //console.log(script.args.optional[0]);
            //console.log(inputs);
            for(var i=0; i< script.args.required.length; i++){
                if (inputs[script.args.required[i]] !== undefined)
                    a.push(inputs[script.args.required[i]]);
            }
            for(var i=0; i< script.args.optional.length; i++){
                if (inputs[script.args.optional[i]] !== undefined)
                    a.push(inputs[script.args.optional[i]]);
            }
            //console.log(inputs[script.args.optional[i]]);
            //console.log(a);
            res.send( run(script, a).stdout );
    }
    
}


exports.Script = Script
