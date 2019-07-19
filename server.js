var express = require('express'); //load express
var session = require('cookie-session'); // load the cookie session middleware
var bodyParser = require('body-parser'); // load the body parser middleware, for capture the value from the form
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
todo = [];

//We use session
app.use(session({ secret: 'mysecretsessionkey' }))


//BEGIN ROUTES
app.get('/todo', (req, res) => {
    res.render('home.ejs', { list_todo: todo });
}).post('/todo/add', urlencodedParser, (req, res) => {
    todo.push(req.body.add_todo);
    res.redirect('/todo');
}).get('/todo/delete/:id', (req, res) => {
    todo.splice(req.params.id,1);
    res.redirect('/todo');
}).use(function (req, res, next) {

    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("This page doesn't exist !");

});
//END ROUTES

app.listen(8080);