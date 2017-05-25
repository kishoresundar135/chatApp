var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    msg: String,
});

mongoose.model('Post', PostSchema);
