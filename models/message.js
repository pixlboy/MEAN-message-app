var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = require('./user');

//Create the schema - blueprint
var schema = new Schema({
    content: {type: String, required : true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}         //ObjectId is internal to Mongoose and created automatically
});

//will be called after every delete request
schema.post('remove', function(message){
    User.findById(message.user, function(err, user){
        user.messages.pull(message);
        user.save();
    });
});

//Create a model, we can't just instantiate a Schema
//Export the schema model
module.exports = mongoose.model('Message', schema);
