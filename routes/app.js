var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

router.get('/', function (req, res, next) {
    res.render('index');
});

// router.get('/', function (req, res, next) {
//     //findOne is an async operation, therefore we cannot retrieve it in a variable
//     User.findOne({}, function(err, doc){
//         if(err){
//             return res.send('Error');
//         }
//         res.render('node', {email: doc.email});
//     });
// });

// router.get('/message/:msg', function (req, res, next) {
//     res.render('node', {message : req.params.msg});
// });

// router.post('/', function (req, res, next) {
//     var email = req.body.email;
//     var user = new User({
//         firstName : "Rachit",
//         lastName : "Garg",
//         password: "mongo",
//         email : email,
//     });
//     user.save();        //mongoose saves the record to 'users' collection
//     res.redirect('/');
// });

// router.post('/users',function(req,res){
//     console.log("fetching user list");
//     var collections = mongoose.connections[0].collections;
//     console.log("collections", collections);
//     res.render('node', {users: collections});
// });

module.exports = router;
