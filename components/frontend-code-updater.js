/**
 * Component updates the frontend code and also his apps
 * @NOTE the apps will be updated ONLY if thay are git hosted
 */
var codeUpdater = require('./code-updater');
const fs = require('fs');
var frontendCodeUpdater = function(sourceCode){
    codeUpdater(sourceCode);
    fs.readdirSync(sourceCode + '\\src\\app\\modules').filter(function(directory){
        var moduleDirecotry = sourceCode + '\\src\\app\\modules' + '\\' + directory;
        if(fs.lstatSync(moduleDirecotry).isDirectory()){
            //Check if there is .git folder
            if(fs.readdirSync(moduleDirecotry).indexOf('.git') >= 0){
                codeUpdater(moduleDirecotry);
            }
        }
    });
}

module.exports = frontendCodeUpdater;