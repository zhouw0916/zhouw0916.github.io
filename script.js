//Referenced From CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElemenetById("list");
const input = document.getElementById("input");

// Class names for tasks
const CHECK = "fa-check-circle";
const UNCHECK = "fa-check-thin";
const LINE_THROUGH = "lineThrough";

// Show current date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocateDateString("en-US", options);

//Variables 
let LIST, id;

//get item from local storage
let data = localStorage.getItem("TODO")

//check if data is not empty
if (data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load items to the user interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage(takes out everything when the page is reloaded)
clear.addEventListener("click", function(){
localStorage.clear();
location.reload();
});


//add item to localstorage
//localStorage.setItem("TODO", JSON.stringify(LIST));

// add to do function

function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const Done = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="0"></i>
                 </li>
                 `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);


}

// adding items to the list when user hits the enter key
document.addEventListener("keyup", function(even){
    if(Event.keyCode == 13){
        const toDo = input.value; 

        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false

            });

            //add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));


            id++;
        }
        input.value = "";
    }


});

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classlist.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true; 
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the click element inside list
    const elementJon = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));

});