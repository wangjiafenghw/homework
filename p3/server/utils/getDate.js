const moment = require('moment')
module.exports = function(){
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
}