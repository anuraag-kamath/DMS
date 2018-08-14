var mongoose = require('mongoose')


var testing = mongoose.model('testing', {
    content: {
        type: Object
    }
})

module.exports = {
    testing
}