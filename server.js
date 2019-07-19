var express = require('express'); //load express
var session = require('cookie-session'); // load the cookie session middleware
var bodyParser = require('body-parser'); // load the body parser middleware, for capture the value from the form
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

//We use session
app.use(session({ secret: 'mysecretsessionkey' }))
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
//BEGIN ROUTES
.get('/todo', (req, res) => {
    res.render('home.ejs', { list_todo: req.session.todolist });
}).post('/todo/add', urlencodedParser, (req, res) => {

    if(req.body.add_todo != "")
        req.session.todolist.push(req.body.add_todo);

    res.redirect('/todo');
}).get('/todo/delete/:id', (req, res) => {
    req.session.todolist.splice(req.params.id,1);
    res.redirect('/todo');
}).use(function (req, res, next) {

    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("This page doesn't exist !");

});
//END ROUTES

app.listen(8080);