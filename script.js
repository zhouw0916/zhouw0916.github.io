//Referenced From CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names for tasks
const CHECK = "fa-check-circle";
const UNCHECK = "fa-question-circle";
const LINE_THROUGH = "lineThrough";

//Variables(LIST has a array([]) and id starts it at 0 for the array)
let LIST, id;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check to see if data is not empty for localstorage
if(data){
        LIST = JSON.parse(data);
        id = LIST.length; //set the id to the last one in the list
        loadList(LIST);//load the list to the user interface
}else{
    // if data isn't empty
    LIST= []
    id = 0;
}

//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localeStorage.clear();
    location.reload();
});

// Show current date
var options = { weekday : "long", month:"short", day: "numeric", year: "numeric" };
var today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash){

    //if items are in the trash, it will prevent the list code(below code)
    //from running
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    
    const item = `<li class="item">
                    <i class="far ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-alt de" job="delete" id="${id}"></i>
                    </li>
                 `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//below was the test code to see if the list worked originally
//addToDo("Collect & Sell 10 Shells")

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //add item to localstorage( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

             id++;
        }
        input.value = "";
    }
});

//step in 40 second mark to show how const DONE, LINE, & if(trash) work
//=================================================================
//addToDo("Collect & Sell 10 Shells", 1, false, true);
//==================================================================
//(true,false)->complete task(use check and linethrough)
//(false,false)->incomplete task(empty circle and no linethrough)
//(false,true)-->addToDo script is deleted


// Complete function/Complete toDo-41:00 in video
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;  
}

// Remove the element function /Remove toDo-41.50
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside the list
    const elementJob = element.attributes.job.value; //complete  or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //add item to localstorage( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});