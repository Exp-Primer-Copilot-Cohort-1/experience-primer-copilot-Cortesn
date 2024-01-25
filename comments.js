// Create web server 
// Create database connection
// Create database schema
// Create database model
// Create web application

// 1. Create web server
var express = require('express');
var app = express();

// 2. Create database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentDB');

// 3. Create database schema
var commentSchema = mongoose.Schema({
    name: String,
    comment: String
});

// 4. Create database model
var Comment = mongoose.model('Comment', commentSchema);

// 5. Create web application
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

// 5.1. Set view engine
app.set('view engine', 'ejs');

// 5.2. Set static files
app.use(express.static('./public'));

// 5.3. Listen to port
app.listen(3000);

// 5.4. Create routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/comment', function(req, res) {
    Comment.find({}, function(err, data) {
        if (err) throw err;
        res.render('comment', {comments: data});
    });
});

app.post('/comment', urlencodedParser, function(req, res) {
    var newComment = Comment(req.body).save(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

app.delete('/comment/:name', function(req, res) {
    Comment.find({name: req.params.name.replace(/\-/g, " ")}).remove(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});