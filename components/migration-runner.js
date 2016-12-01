/**
 * Component runs a migrations
 */
const spawn = require('child_process').spawn;
const colorLog = require('./color-message');

/**
 * @NOTE Valiable additionalParams will be used to pass a command to migration executor. Be carefull with it!
 */
var migrationRunner = function(domainName, executor, additionalParams, onReady){
    var spawnParams = [domainName];
    if(additionalParams && additionalParams.length > 0){
        spawnParams = spawnParams.concat(additionalParams);
    }
    const migrationSpawner = spawn(executor, spawnParams);
    var migrationBuffer = new Buffer('');
    migrationSpawner.stdout.on('data', function(data){
        migrationBuffer = Buffer.concat([migrationBuffer, data]);                        
    });

    migrationSpawner.on('close', function(code) {
        if(!code){
            colorLog('Migrations: ' + executor);
            console.log(migrationBuffer.toString());

            if(onReady && typeof onRead === 'function'){
                onReady();
            }
        }
    });
}

module.exports = migrationRunner;