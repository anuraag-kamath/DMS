var mongoose = require('mongoose')


var document = mongoose.model('document', {
    binaryContent: {
        type: Object
    },
    total: {
        type: Number
    },
    part: {
        type: Number
    },
    documentMasterId: {
        type: String
    },
    size: {
        type: String
    }
})

module.exports = {
    document
}