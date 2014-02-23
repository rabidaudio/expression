expression
==========

An Express (Node.js) wrapper to turn command line
-------------------------------------------------
programs into full web APIs. 
----------------------------

Simply include a JSON configuration file to define your functions
and arguments:

```javascript

exports.scripts = [
    {
        name: "wrek",               //Resource
         args: {                    //Aruguments list
            required: [],
            optional: ['date']
        },
        cmd: 'ruby app/wrek.rb',    //Command to run program
        methods: {                  //connectivity methods
            rest: true,
            post: true,
            get: false
        }
    },
    {
        name: "hello_world",
        args: {
            required: ['name'],
            optional: []
        },
        cmd: 'python app/ohai.py',
        methods: {
            rest: true,
            post: true,
            get: false
        }
    }
];
```

scripts is an array of objects

Initally built at HackDuke 2013 as part of a (larger project)[http://github.com/jaxoncreed/N/] in 24 hours.
