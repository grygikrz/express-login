var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');
app.use("/", express.static(__dirname));

app.get('/', function(req, res){
    res.render('index', {
        name: "Login with Google",
        url: "/auth/google"
    });
});

app.get('/auth/google', function(req, res){
    res.render('login', {
        name: "You are loged in",
    });
});

app.listen(3000);
app.use(function (req, res, next) {
    res.status(404).send('Sorry page dosen\'t exists!')
});
