const connection = require('./conn');
const response = require('./res');
const md5 = require('md5');
const randomString = require('randomstring');

exports.registerUser = (req, res) => {
    const nim = req.body.nim;
    const name = req.body.name;
    const password = req.body.password;

    let sql = "SELECT * FROM `users` WHERE `user_nim` = ?";
    connection.query(sql, [nim], (e, r) => {
        if (e) {
            response.notOk(res, "Error occured. (1)");
            console.log(e);
        } else if (r.length === 0) {
            let sql1 = "INSERT INTO `users` (`user_nim`, `user_name`, `user_privilege`, `user_passhash`) VALUES (?, ?, ?, ?)";
            connection.query(sql1, [nim, name, 1, md5(password)], (e1, r1) => {
                if (e1) {
                    response.notOk(res, "Error occured. (2)");
                    console.log(e1);
                } else {
                    response.ok(res, {"message": "User registered successfully."});
                }
            });
        } else {
            response.notOk(res, "User already registered.")
        }
    });
};

exports.login = (req, res) => {
    const nim = req.body.nim;
    const password = req.body.password;
    const sessionId = md5(randomString.generate());

    let sql = "SELECT * FROM `users` WHERE `user_nim` = ? AND `user_passhash` = ?";
    connection.query(sql, [nim, md5(password)], (e, r) => {
        if (e) {
            response.notOk(res, 'Error occured. (1)');
            console.log(e);
        } else if (r.length === 1) {
            let sql1 = "UPDATE `users` SET `user_session` = ? WHERE `user_nim` = ?";
            connection.query(sql1, [sessionId, nim], (e1, r1) => {
                if (e1) {
                    response.notOk(res, "Error occured. (2)");
                    console.log(e1);
                } else {
                    response.ok(res, {"session_id": sessionId});
                }
            });
        } else {
            response.unauthorized(res, "Username or password is invalid.");
        }
    });
};

exports.getTasks = (req, res) => {
    const sessionId = req.body.session_id;

    let sql = "SELECT * FROM `users` WHERE `user_session` = ?";
    connection.query(sql, [sessionId], (e, r) => {
        if (e) {
            response.notOk(res, 'Error occured. (1)');
            console.log(e);
        } else if (r.length === 1) {
            let sql1 = "SELECT * FROM `tasks`";
            connection.query(sql1, [], (e1, r1) => {
                if (e1) {
                    response.notOk(res, 'Error occured. (2)');
                    console.log(e1);
                } else {
                    response.ok(res, r1);
                }
            });
        } else {
            response.unauthorized(res, 'Unauthorized.');
        }
    });
};