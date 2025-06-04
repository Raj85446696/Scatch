const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

mongoose.connect(`${config.get("MONGODB_URI")}/Scatch`).then(function () {
    dbgr('Connected Successfully');
}).catch(function (err) {
    console.log(err);
})

module.exports = mongoose.connection ; 

