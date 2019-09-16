document.getElementById("confirm-password").oninput = () => {
    if (document.getElementById("confirm-password").value !==
        document.getElementById("password").value) {
        document.getElementById("error-password-not-same").hidden = false;
        document.getElementById("btn-submit").disabled = true;
    } else {
        document.getElementById("error-password-not-same").hidden = true;
        document.getElementById("btn-submit").disabled = false;
    }
};

function setPassword() {
    const xhr = new XMLHttpRequest();
    const url = './api/v1/users/newpassword';
    const params = JSON.stringify({
        "password": document.getElementById("password").value
    });

    xhr.open('POST', url, true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                window.location = './dashboard';
            } else {
                alert('?');
            }
        }
    };
    xhr.send(params);
}