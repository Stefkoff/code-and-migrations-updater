/**
 * Component for updating Hydra code. Updates also all the installed apps in Hydra
 * @NOTE ONLY if the hydra core update gone well, the migrations will be applied
 */
var codeUpdater = require('./code-updater');
var migrationRunner = require('./migration-runner');
var fs = require('fs');
var hydraCodeUpdater = function(sourceCode, domainName){
    codeUpdater(sourceCode, function(){        
        migrationRunner(domainName, sourceCode + '\\yii.bat', ['migrate', '--interactive=0']);
    });

    //Update also the apps, ONLY if thay are git hosted
    fs.readdirSync(sourceCode + '\\apps').filter(function(directory){
        var moduleDirectory = sourceCode + '\\apps' + '\\' + directory;
        if(fs.lstatSync(moduleDirectory).isDirectory()){
            //Check if there is a .git folder
            if(fs.readdirSync(moduleDirectory).indexOf('.git') >= 0){
                codeUpdater(moduleDirectory);                
            }
        }
    });
}

module.exports = hydraCodeUpdater;