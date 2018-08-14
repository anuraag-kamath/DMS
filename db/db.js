var mongoose = require('mongoose');

//var url = process.env.DB || "mongodb://localhost:27017/dms"
var url = process.env.DMS_URL || "mongodb://anuraagkamath:Anuraag123!@ds121262.mlab.com:21262/mydms"


mongoose.connect(url, {
    useNewUrlParser: true
}, () => {
    console.log("MongoDB connected at:-" + url);
})


module.exports = {
    mongoose
} 