const api = require('./api');

module.exports = (app, apiUrl) => {
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/public/home.html');
    });
    
    app.get('/timeline', function(req, res){
        res.sendFile(__dirname + '/public/timeline.html');
    });
    
    app.get('/register', (req, res) => {
       res.sendFile(__dirname + '/public/submitproposal.html');
    });

    app.get('/register1', (req, res) => {
        res.sendFile(__dirname + '/public/register-new.html');
    });

    app.get('/dashboard', (req, res) => {
        res.sendFile(__dirname + '/public/dashboard.html');
    });

    app.get('/proposalupload', (req, res) => {
        res.sendFile(__dirname + '/public/submitproposal.html');
    });
    
    app.get('*', function(req, res){
        res.status(404).sendFile(__dirname + '/public/not-found.html');
    });

    app.route(apiUrl + '/signup').post(api.registerUser);

    app.route(apiUrl + '/login').post(api.login);

    app.route(apiUrl + '/tasks').post(api.getTasks);

    app.route(apiUrl + '/teams/newteam').post(api.newTeam);

    app.route(apiUrl + '/users/getname').post(api.getName);

    app.route(apiUrl + '/temp/upload').post(api.tempSubmitProposal);
};