const { exec, spawn } = require('child_process');
const { existsSync } = require('fs');
const os = require('os');

console.log('========================================');
console.log('   Code Quest 2 - Starting Server');
console.log('========================================');
console.log('');

// Check if node_modules exists
if (!existsSync('node_modules')) {
    console.log('Installing dependencies - this may take a few minutes...');
    console.log('');
    
    exec('npm install --legacy-peer-deps', (error, stdout, stderr) => {
        if (error) {
            console.error('ERROR: Failed to install dependencies!');
            console.error('Please make sure Node.js is installed from https://nodejs.org/');
            process.exit(1);
        }
        startServer();
    });
} else {
    startServer();
}

function startServer() {
    console.log('Starting development server...');
    console.log('');
    console.log('Opening website in your browser...');
    console.log('');
    
    // Start the server
    const server = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true
    });
    
    // Open browser after 3 seconds
    setTimeout(() => {
        const platform = os.platform();
        let command;
        if (platform === 'win32') {
            command = 'start http://localhost:3000';
        } else if (platform === 'darwin') {
            command = 'open http://localhost:3000';
        } else {
            command = 'xdg-open http://localhost:3000';
        }
        exec(command);
        console.log('');
        console.log('========================================');
        console.log('   Website opened in browser!');
        console.log('========================================');
        console.log('');
        console.log('The server is running. Press Ctrl+C to stop.');
        console.log('');
    }, 3000);
    
    // Handle process termination
    process.on('SIGINT', () => {
        server.kill();
        process.exit();
    });
}

