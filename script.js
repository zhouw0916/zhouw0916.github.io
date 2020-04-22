//Referenced From CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names for tasks
const CHECK = "fa-check-circle";
const UNCHECK = "far fa-circle";
const LINE_THROUGH = "fa-strikethrough";

// Show current date
var options = { weekday : "long", month:"short", day: "numeric", year: "numeric" };
var today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo){
    
    const item = `<li class="item">
                    <i class="far fa-circle co" job="complete" id="0"></i>
                    <p class="text">${toDo}</p>
                    <i class="fa fa-trash-alt de" job="delete" id="0"></i>
                    </li>
                 `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

addToDo("Collect & Sell 10 Shells")

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empty
        if(toDo){
            addToDo(toDo);
        }
    }
});