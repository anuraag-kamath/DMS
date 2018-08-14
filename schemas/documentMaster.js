var mongoose = require('mongoose')


var documentMaster = mongoose.model('documentMaster', {
    name: {
        type: String
    },
    ext: {
        type: String
    },
    totalSize: {
        type: String
    },
    total: {
        type: Number
    },
    documentId: [{
        type: String
    }],
    uniqueIdentifier: {
        type: String
    }
})

module.exports = {
    documentMaster
}