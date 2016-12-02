const cron = require('node-cron');
const fs = require('fs');
const legacyCodeUpdater = require('./components/legacy-code-updater'); //Leagcy Code Updater Component
const hydraCodeUpdater = require('./components/hydra-code-updater'); //Hydra Code Updater Component
const frontendCodeUpdater = require('./components/frontend-code-updater'); //Frontend Code Updater Component
var updateInterval = 5; //5 minutes
var legacyCode = false;
var hydraCode = false;
var domainName = false;
var frontendCode = false;

//Check first if we have a config file
if(fs.existsSync('config.js') && fs.lstatSync('config.js').isFile()){
        var config = require('./config');

        if(config.domainName){
            domainName = config.domainName;
        }

        if(config.legacyCode){
            legacyCode = config.legacyCode;
        }

        if(config.hydraCode){
            hydraCode = config.hydraCode;
        }

        if(config.frontendCode){
            frontendCode = config.frontendCode;
        }

        if(config.updateInterval){
            updateInterval = config.updateInterval;
        }
} else{
    if(process.argv.length > 2){

        /**
         * Apply the valiable comming from the command line
         */
        process.argv.forEach(function(val, index, array) {
            if(val.indexOf('hydra=') >= 0){
                hydraCode = process.argv[index].split('=').pop();
            }

            if(val.indexOf('legacy=') >= 0){
                legacyCode = process.argv[index].split('=').pop();
            }

            if(val.indexOf('domain=') >= 0){
                domainName = process.argv[index].split('=').pop();
            }

            if(val.indexOf('frontend=') >= 0){
                frontendCode = process.argv[index].split('=').pop();
            }

            if(val.indexOf('updateInterval=') >= 0){
                updateInterval = process.argv[index].split('=').pop();
            }
        });                
    }
}

//Run ONLY if we specify a domain name
if(domainName){
    var doJob = function(){
	    if(legacyCode){
		    legacyCodeUpdater(legacyCode, domainName);
	    }

	    if(hydraCode){
		    hydraCodeUpdater(hydraCode, domainName);
	    }
	    if(frontendCode){
		    frontendCodeUpdater(frontendCode);
	    }
    };

    // Run the job immediately
	doJob();

    //Create a "cron job" task
    cron.schedule('*/' + updateInterval + ' * * * *', function(){
	    doJob();
    });
} else{
    console.log('No domain name given!');
}

//node updater.js legacy=C:\www\docebo domain=lms.georgi.scavaline.com hydra=C:\www\hydra frontend=C:\www\hydra_frontend updateInterval=1