




const tasklist = document.querySelector(".container2");
const addbtn = document.querySelector(".addbtn");
const inputtext = document.querySelector(".textinput");
const ulist = document.querySelector(".ullist");



function createTask(taskObj) {
    const {text , completed} =taskObj;
    let list = document.createElement("li");

    list.style.listStyle = "none";
    list.style.width = "100%";
    list.style.minHeight = "1.8rem";
    list.style.border = "1px solid lightblue";
    list.style.display = "flex";
    list.style.justifyContent = "space-between";
    list.style.alignItems = "center";
    list.style.padding = "0 10px";
    list.style.flex="1";
    list.style.flexWrap="wrap";
    list.style.whiteSpace="normal";
    list.style.wordBreak="break-word";


    let span = document.createElement("span");
    span.innerHTML =completed?`<i class="fa-solid fa-circle-check"></i> ${text}`:` <i class="fa-regular fa-circle"></i> ${text}`;
    span.addEventListener("click", function () {
        let icon = this.querySelector("i");
        let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
        tasks=tasks.map(t=>{
            if(t.text===text){
                t.completed = !t.completed;
                
            }
            return t;
        });
        localStorage.setItem("tasks",JSON.stringify(tasks));
         icon.classList.toggle("fa-circle");
        icon.classList.toggle("fa-circle-check");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
        // if (icon.classList.contains("fa-circle")) {
        //     icon.classList.replace("fa-circle", "fa-circle-check");
        //     icon.classList.replace("fa-regular", "fa-solid");
        // }
        // else {
        //     icon.classList.replace("fa-circle-check", "fa-circle");
        //     icon.classList.replace("fa-solid", "fa-regular");
        // }



    })
    span.style.display = "flex";
    span.style.alignItems = "center";
    span.style.gap = "8px";
    let delbtn = document.createElement("button");
    delbtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    list.appendChild(delbtn);
    delbtn.addEventListener("click", function () {
        ulist.removeChild(list);
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t.text !== text);
        localStorage.setItem("tasks", JSON.stringify(tasks));



    });
    delbtn.style.border = "none";
    delbtn.style.backgroundColor = "transparent";
    delbtn.style.cursor = "pointer";


    list.appendChild(span);
    list.appendChild(delbtn);
    ulist.appendChild(list);


}
addbtn.addEventListener("click", function () {
    const tasktext = inputtext.value.trim();
    if (tasktext === "") return;

    const taskObj={text:tasktext,completed:false};
    createTask(taskObj);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    inputtext.value = "";
});

window.addEventListener("load", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task));
});

