let express = require('express');
let app = express();

app.listen(8000, '0.0.0.0');

app.use(express.static('public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/home.html');
});