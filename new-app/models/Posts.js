var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    msg: String,
    timestamp: String,
});

mongoose.model('Post', PostSchema);
