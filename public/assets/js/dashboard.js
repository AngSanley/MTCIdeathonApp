//Code with 💗 in my kost

let jeson = '{ "status":200,"response":[ { "task_id":1,"task_name":"Pengumpulan Proposal",'+
          '"task_description":"Tolong upload proposal yang telah kalian buat dengan format PDF/ZIP.",'+
          '"task_accept_submission":1, "task_date_from":"2019-09-13T00:00:00.000Z",'+
          '"task_date_to":"2019-09-15T00:00:00.000Z"},{ "task_id":2,'+
          '"task_name":"Bersihin Kotoran Kucing di Karpet", "task_description":"Tolong itu eek kucingnya dibuang.",'+
          '"task_accept_submission":0,"task_date_from":"2019-09-13T00:00:00.000Z",'+
          '"task_date_to":"2019-09-15T00:00:00.000Z"}]}';
let obj = JSON.parse(jeson);

if(obj.status == 200) obj.response.forEach(addchild);

function addchild(item,index) {
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