var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
    message: String,
    author: String
});

module.exports = mongoose.model('Guest', MessageSchema);
