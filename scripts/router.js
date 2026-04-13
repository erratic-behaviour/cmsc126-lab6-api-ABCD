import { default as Pokemon } from "./search.js";
import { default as List } from "./main.js";

// file acts as the main source (module) to access functions outside their respective files
export function returnPokemon() {
  Pokemon();
}

export function returnList() {
  List();
}

// events
const inputBox = document.getElementById("search-input");

inputBox.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        returnPokemon();
    }
});

document.getElementById("search-button").onclick = returnPokemon;
document.getElementById("select-button").onclick = returnList;
