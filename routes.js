const api = require('./api');

const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

let upload = multer({ storage: storage });

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

    app.get('/login', (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    });

    app.get('/newpassword', (req, res) => {
        res.sendFile(__dirname + '/public/new-password.html');
    });

    app.route(apiUrl + '/signup').post(api.registerUser);

    app.route(apiUrl + '/login').post(api.login);

    app.route(apiUrl + '/tasks').get(api.getTasks);

    app.route(apiUrl + '/teams/newteam').post(api.newTeam);

    app.route(apiUrl + '/teams/profile').get(api.getTeamProfile);

    app.route(apiUrl + '/users/getname').post(api.getName);

    app.route(apiUrl + '/users/newpassword').post(api.setNewPassword);

    app.route(apiUrl + '/users/isregistered').post(api.checkNim);

    app.route(apiUrl + '/temp/upload').post(upload.single('filetoupload'), api.tempSubmitProposal);

    app.get('*', function(req, res){
        res.status(404).sendFile(__dirname + '/public/not-found.html');
    });
};