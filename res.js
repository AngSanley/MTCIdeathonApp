exports.ok = (res, data) => {
    const response = {
        "status": 200,
        "response": data
    };
    res.status(200).json(response);
    res.end();
};

exports.notOk = (res, msg) => {
    const response = {
        "status": 400,
        "message": msg
    };
    res.status(400).json(response);
    res.end();
};

exports.notFound = (res, msg) => {
    const response = {
        "status": 404,
        "message": msg
    };
    res.status(404).json(response);
    res.end();
};
exports.unauthorized = (res, msg) => {
    const response = {
        "status": 401,
        "message": msg
    };
    res.status(401).json(response);
    res.end();
};