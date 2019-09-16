//Code with 💗 in my kost

const xhr = new XMLHttpRequest();
const url = './api/v1/teams/profile';

xhr.open('GET', url, true);
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.response);
            document.querySelector('#team_name').innerText = res.team_name;
            document.querySelector('#team_leader').innerText = res.team_leader;
            document.querySelector('#team_member1').innerText = res.team_member1;
            document.querySelector('#team_member2').innerText = res.team_member2;
            document.querySelector('#mentor').innerText = res.mentor;
        } else {

        }
    }
};
xhr.send();

const jeson = '{ "status":200,"response":[ { "task_id":1,"task_name":"Pengumpulan Proposal",'+
          '"task_description":"Tolong upload proposal yang telah kalian buat dengan format PDF/ZIP.",'+
          '"task_accept_submission":1, "task_date_from":"2019-09-13T00:00:00.000Z",'+
          '"task_date_to":"2019-09-15T00:00:00.000Z"},{ "task_id":2,'+
          '"task_name":"Bersihin Kotoran Kucing di Karpet", "task_description":"Tolong itu eek kucingnya dibuang.",'+
          '"task_accept_submission":0,"task_date_from":"2019-09-13T00:00:00.000Z",'+
          '"task_date_to":"2019-09-15T00:00:00.000Z"},{ "task_id":3,'+
          '"task_name":"Pengumuman List Mentor", "task_description":"Selamat kepada kelompok yang telah lolos pada seleksi tahap I. Berikut adalah list mentor beserta kelompok yang telah dipilih:</br>Team H[Array]: Andre Taulany</br>QB-Team: Kevin</br>Luis Anthonie Alkins</br>OurPriority Group: Handika Limanto</br>LIQUID: Daniel Anadi</br>LIA-TEAM: Davia Belinda Hidayat</br>Reinhart, Andy, Hendry: Arvin</br>Ciwi MAT: Devita Setyaningrum</br>Jaterpok: Jesselyn</br>Team Code RED: Christopher Teddy",'+
          '"task_accept_submission":0,"task_date_from":"2019-09-13T00:00:00.000Z",'+
          '"task_date_to":"2019-09-15T00:00:00.000Z"}]}';
let obj = JSON.parse(jeson);

if(obj.status === 200) obj.response.forEach(addChild);

function addChild(item, index) {
    document.getElementById("task_parent").innerHTML +=
    '<div class="task_content"><h3>'+item.task_name+'</h3><hr>'+item.task_description+
    submission(item.task_accept_submission,item.task_date_to)+'</div>';
}

function submission(validation,deadline){
    var date = new Date(deadline);

    var submission_date = day(date.getDay()) + ", " + String(date.getDate()) + " " + month(date.getMonth()) + " " + String(date.getFullYear());

    if(validation == 1){
        //for some reason, use client-side validation
        if(date.getTime()<=Date.now()){
            return '<div class="submission"><button class="button" style="margin-right:16px" disabled>Upload</button> Deadline: '+submission_date+'</div>';
        }
        else return '<div class="submission"><button class="button" style="margin-right:16px">Upload</button> Deadline: '+submission_date+'</div>';
    }

    // else if(validation == 2){
    // return '<div class="submission"><button class="button" style="margin-right:16px">Upload</button> Deadline: '+submission_date+'</div>';
    // }
    
    else{
        return '';
    }
}