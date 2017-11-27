var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var mongojs = require("mongojs");
var db = mongojs('todotasklist', ['todotasklist']);


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', index);
app.use('/users', users);




app.get('/todotasklist', function(req, res){
    console.log("get response");
    db.todotasklist.find(function(err, data) {
        if(err)  throw err;
        res.json(data);
    });

});

app.post('/todotasklist', function(req, res) {
    console.log("got response from post todolist");
    db.todotasklist.insert(req.body, function(err, data) {
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todotasklist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.todotasklist.remove({_id: mongojs.ObjectId(id)}, function(err, data){
        res.json(data);
    });
});

app.get('/todotasklist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.todotasklist.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
        res.json(data);
    });
});

app.put('/todotasklist/:id', function(req, res){
    var id = req.params.id;
    db.todotasklist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {info: req.body.info}},
        new: true}, function(err, data) {
        res.json(data);
    });
});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
