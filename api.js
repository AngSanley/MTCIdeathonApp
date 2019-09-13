const connection = require('./conn');
const response = require('./res');
const md5 = require('md5');
const randomString = require('randomstring');
const axios = require('axios');

exports.registerUser = (req, res) => {
    const nim = req.body.nim;
    const name = req.body.name;
    const password = req.body.password;
    const privilege = req.body.privilege;

    let sql = "SELECT * FROM `users` WHERE `user_nim` = ?";
    connection.query(sql, [nim], (e, r) => {
        if (e) {
            response.notOk(res, "Error occured. (1)");
            console.log(e);
        } else if (r.length === 0) {
            let sql1 = "INSERT INTO `users` (`user_nim`, `user_name`, `user_privilege`, `user_passhash`) VALUES (?, ?, ?, ?)";
            connection.query(sql1, [nim, name, privilege, md5(password)], (e1, r1) => {
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

exports.newTeam = (req, res) => {
    const leaderNim = req.body.leader_nim;
    const memberOneNim = req.body.member_one_nim;
    const memberTwoNim = req.body.member_two_nim;
    const teamName = req.body.team_name;

    if (memberOneNim.length !== 10 || memberTwoNim.length !== 10 || leaderNim.length !== 10) {
        response.notOk(res, "Invalid NIM.");
    }

    let sql = "SELECT * FROM `users` WHERE `user_nim` = ? OR `user_nim` = ? OR `user_nim` = ?";
    connection.query(sql, [leaderNim, memberOneNim, memberTwoNim], (e, r) => {
        if (e) {
            response.notOk(res, 'Error occured. (1)');
            console.log(e);
        } else if (r.length === 3) {
            let sql1 = "INSERT INTO `teams` (`team_name`, `team_status`, `team_leader`, `team_member1`, `team_member2`) VALUES (?, 1, ?, ?, ?)";
            connection.query(sql1, [teamName, leaderNim, memberOneNim, memberTwoNim], (e1, r1) => {
                if (e1) {
                    response.notOk(res, 'Error occured. (2)');
                    console.log(e1);
                } else {
                    response.ok(res, {"message": ("Team " + teamName + " created")});
                }
            });
        } else {
            response.notOk(res, 'User not available.');
        }
    });
};

exports.getName = (req, res) => {
    const NIM = req.body.nim;
    axios.post('http://passthrough.mtcbin.us:3001/extractBinusian', {
        nim: NIM
    })
        .then((res1) => {
            response.ok(res, res1.data.response);
        })
        .catch((error) => {
            console.error(error);
            response.notOk(res, error.message);
        })
}