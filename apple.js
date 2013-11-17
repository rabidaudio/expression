var sh = require('execSync');


function Apple(){
    this.a = 0;
    this.add = function(i){ this.a=this.a+i};
}

exports.Apple = Apple
