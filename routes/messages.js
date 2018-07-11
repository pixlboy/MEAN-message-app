var express = require('express');
var router = express.Router();
var Message = require("../models/message")
var User = require("../models/user")

var jwt = require("jsonwebtoken")

router.get('/', function (req, res, next) {
    Message.find()
        .populate('user', 'firstName')             //mongoose method, using the 'ref' stored in messages expand the object and pass firstName
        .exec(function (err, messages) {            // exec is used to chain
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});

//Will be called before every route request except the first one.
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if (err) {
            return res.status(401).json({
                title: 'Authorization failed',
                error: err
            });
        }
        next();     //let the request continue
    });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        var message = new Message({
            content : req.body.content,
            user : user      //add the user to messages as a link
        });
        message.save(function(err, result) {
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            user.messages.push(result._id);     //add the message to array of user messages
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message) {
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!message){
            return res.status(500).json({
                title: 'No message found!',
                error: { message : 'Message not found' }
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.content = req.body.content;
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if(message.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;
