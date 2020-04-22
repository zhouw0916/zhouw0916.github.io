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
            addToDo(toDo);
        }
        input.value = "";
    }
});

addToDo("Collect & Sell 10 Shells", 1, false, true);
