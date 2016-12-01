/**
 * Component update a repository from git, them can call a calback function when the upload is ready
 */
const spawn = require('child_process').spawn;
const colorLog = require('./color-message');
var codeUpdater = function(sourceCode, onReady){
    let codeRunnerBuffer = new Buffer('');
    const legacyCodeUpdater = spawn('git', ['-C', sourceCode, 'pull']);
    legacyCodeUpdater.stdout.on('data', function(data) {
        codeRunnerBuffer = Buffer.concat([codeRunnerBuffer, data]);
    });
    legacyCodeUpdater.stderr.on('data', function(data) {
        colorLog('Error: ' + sourceCode);
        console.log(data.toString());
    });
    legacyCodeUpdater.on('close', function(code) {    
        if(!code){
            colorLog(sourceCode);
            console.log(codeRunnerBuffer.toString());
            if(onReady && typeof onReady === 'function'){
                onReady();
            }        
        }
    });
}

module.exports = codeUpdater;