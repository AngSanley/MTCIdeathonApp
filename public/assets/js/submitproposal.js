var url = new URL(window.location.href);
var nim = url.searchParams.get("nim");
var error = url.searchParams.get("error");
var success = url.searchParams.get("success");

function showLoading(enabled) {
    if (enabled) $('.modal').modal('show');
    else $('.modal').modal('hide');
}

document.querySelector('#submit-button').onclick = () => {
    const teamName = document.querySelector('#teamName');
    const leaderNim = document.querySelector('#teamLeaderNim');
    const leaderName = document.querySelector('#teamLeaderName');
    const member1Nim = document.querySelector('#member1Nim');
    const member1Name = document.querySelector('#member1Name');
    const member2Nim = document.querySelector('#member2Nim');
    const member2Name = document.querySelector('#member2Name');
    const proposalFile = document.querySelector('#proposalFile');
    let validated = true;

    showLoading(true);

    if (teamName.value === '') {
        document.querySelector('#teamNameError').hidden = false;
        validated = false;
    } else {
        document.querySelector('#teamNameError').hidden = true;
    }

    if (leaderNim.value.length !== 10 || isNaN(leaderNim.value)) {
        document.querySelector('#leaderNimError').hidden = false;
        validated = false;
    } else {
        document.querySelector('#leaderNimError').hidden = true;
    }

    if (leaderName.value === '') {
        document.querySelector('#leaderNimNotValidated').hidden = false;
        validated = false;
    } else {
        document.querySelector('#leaderNimNotValidated').hidden = true;
    }

    if (member1Nim.value.length !== 10 || isNaN(member1Nim.value)) {
        document.querySelector('#member1NimError').hidden = false;
        validated = false;
    } else {
        document.querySelector('#member1NimError').hidden = true;
    }

    if (member1Name.value === '') {
        document.querySelector('#member1NimNotValidated').hidden = false;
        validated = false;
    } else {
        document.querySelector('#member1NimNotValidated').hidden = true;
    }

    if (member2Nim.value.length !== 10 || isNaN(member2Nim.value)) {
        document.querySelector('#member2NimError').hidden = false;
        validated = false;
    } else {
        document.querySelector('#member2NimError').hidden = true;
    }

    if (member2Name.value === '') {
        document.querySelector('#member2NimNotValidated').hidden = false;
        validated = false;
    } else {
        document.querySelector('#member2NimNotValidated').hidden = true;
    }

    if (proposalFile.files.length === 0) {
        document.querySelector('#proposalFileError').hidden = false;
        validated = false;
    } else {
        document.querySelector('#proposalFileError').hidden = true;
    }

    if (validated) {
        document.querySelector('#submit-form').submit();
    }
    
    showLoading(false);
};

if (error != null) {
    var errorAlert = document.getElementById("errorAlert");
    var errorMsg = document.getElementById("errorMsg");

    errorAlert.hidden = false;
    errorMsg.innerHTML = error;
}

if (success != null) {
    var errorAlert = document.getElementById("successAlert");
    if (success == 1) errorAlert.hidden = false;
}

if (nim != null) {
    document.getElementById("teamLeaderNim").value = nim;
    verifyNim("teamLeaderNim", "teamLeaderName");
}

function verifyNim(nim, output, n) {
    let valid = true;
    if (document.getElementById(nim).value.length != 10) valid = false;

    if (valid) getName(nim, output, n);
    else alert("NIM Invalid");
}

function getName(nim, output, n) {
    let id = '';
    if (n === 1) {
        id = 'leaderNimRegistered';
    } else if (n === 2) {
        id = 'member1NimRegistered';
    } else if (n === 3) {
        id = 'member2NimRegistered';
    }

    const xhr1 = new XMLHttpRequest();
    const url1 = './api/v1/users/isregistered';
    xhr1.open('POST', url1, true);
    xhr1.setRequestHeader('content-type', 'application/json');
    xhr1.onreadystatechange = () => {
        if (xhr1.readyState === XMLHttpRequest.DONE) {
            if (xhr1.status === 200) {
                if (JSON.parse(xhr1.response).response.message === 'ok') {
                    showLoading(true);
                    var xhr = new XMLHttpRequest();
                    var url = "./api/v1/users/getname";
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({
                        "nim": document.getElementById(nim).value
                    }));
                    xhr.onload = function () {
                        var jsonResponse = JSON.parse(xhr.response);
                        if (jsonResponse.response.name != null) {
                            document.getElementById(output).value = jsonResponse.response.name;
                            showLoading(false);
                        } else if (jsonResponse.response.message != null) {
                            alert(jsonResponse.response.message);
                            showLoading(false);
                        }
                    };
                    xhr.onerror = function () {
                        alert("Request failed");
                        showLoading(false);
                    };
                    document.getElementById(id).hidden = true;
                } else {
                    document.getElementById(id).hidden = false;
                }
            }
        }
    };
    xhr1.send(JSON.stringify({
        "nim": document.getElementById(nim).value
    }));
}