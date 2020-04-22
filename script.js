//Referenced From CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names for tasks
const CHECK = "fa-check-circle";
const UNCHECK = "far fa-circle";
const LINE_THROUGH = "lineThrough";

//Variables(LIST has a array([]) and id starts it at 0 for the array)
let LIST= []
    , id = 0;

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

            id++;
        }
        input.value = "";
    }
});

//step in 40 second mark to show how const DONE, LINE, & if(trash) work
//addToDo("Collect & Sell 10 Shells", 1, false, true);


// function when things are complete(aka complete to do)

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


//function to remote(aka remove to do)
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //this code returns the clicked element inside the list
    const elementJob = element.attributes.job.value; //this code completes or deletes

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
});