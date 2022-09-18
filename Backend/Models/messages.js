const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    people: [ String ],
    message: [ {
        id: String,
        msg: String
    } ]
})

const Message = mongoose.model('Messages', msgSchema);

module.exports = { Message };
