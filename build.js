let spawn = require('child_process').spawn;

let cmd = spawn('copyup', ['dist/*.js', 'dist/*.map', './']);

cmd.on('close', (code) => {
    spawn('rm', ['-fr', 'dist/', 'src/', 'test/', 'doc/', 'webpack.config.js']);
    console.log("Ready to push and publish!");
<<<<<<< HEAD
});
=======
});

>>>>>>> Initial commit to npm branch
