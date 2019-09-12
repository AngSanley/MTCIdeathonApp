let express = require('express');
let app = express();

app.listen(8000, '0.0.0.0');

app.use(express.static('public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/timeline', function(req,res){
    res.sendFile(__dirname + '/public/timeline.html');
});

app.get('/register', (req, res) => {
   res.sendFile(__dirname + '/public/login.html');
});

app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/public/not-found.html');
});