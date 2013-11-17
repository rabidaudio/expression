var scripts = [
    {
        name: "wrek",
         args: {
            required: [],
            optional: ['date']
        },
        cmd: 'ruby app/wrek.rb',
        methods: {
            dir: true,
            post: true,
            get: false
        }
    }
];

exports.scripts = scripts
