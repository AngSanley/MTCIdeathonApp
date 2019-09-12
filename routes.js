const api = require('./api');

module.exports = (app, apiUrl) => {
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/home.html');
    });
    
    app.get('/timeline', function(req, res){
        res.sendFile(__dirname + '/public/timeline.html');
    });
    
    app.get('/register', (req, res) => {
       res.sendFile(__dirname + '/public/register.html');
    });
    
    app.get('*', function(req, res){
        res.status(404).sendFile(__dirname + '/public/not-found.html');
    });

    app.route(apiUrl + '/signup').post(api.registerUser);

    app.route(apiUrl + '/login').post(api.login);

    app.route(apiUrl + '/tasks').post(api.getTasks);
};