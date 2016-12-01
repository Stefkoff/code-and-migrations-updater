/**
 * Component updates the Legacy code and run the migrations
 * @NOTE ONLY if the updates are successfull, the migrations will be apllied
 */
var codeUpdater = require('./code-updater');
var migrationRunner = require('./migration-runner');
var legacyCodeUpdater = function(sourceCode, domainName){
    codeUpdater(sourceCode, function(){
        migrationRunner(domainName, sourceCode + '\\lms\\protected\\yiic-domain-db-migration.bat');
    });
}

module.exports = legacyCodeUpdater;