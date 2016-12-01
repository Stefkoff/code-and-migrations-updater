var colorLog = function(message){
    if(message){
        console.log('\x1b[36m', message, '\x1b[0m')
    }
}

module.exports = colorLog;