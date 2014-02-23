exports.scripts = [
    {
        app_name: "date",               //Resource
         args: {                    //Aruguments list
            required: [],
            optional: ['date']
        },
        cmd: 'ruby app/date.rb',    //Command to run program
        methods: {                  //connectivity methods
            rest: true,
            post: true,
            get: false
        }
    },
    {
        app_name: "hello_world",
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
