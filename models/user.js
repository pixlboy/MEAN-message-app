var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require("mongoose-unique-validator");

//Create the schema - blueprint
var schema = new Schema({
    firstName: {type: String, required : true},
    lastName: {type: String, required : true},
    password: {type: String, required : true},
    email: {type: String, required : true, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]         //ObjectId is internal to Mongoose and created automatically
});

mongoose.plugin(mongooseUniqueValidator);

//Create a model, we can't just instantiate a Schema
//Export the schema model
module.exports = mongoose.model('User', schema); //creates a 'users' model
