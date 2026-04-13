import { fetchPokemon } from "./main.js";
import { default as renderList } from "./render.js";

async function searchPokemon() {
  const displayLabel = document.getElementById("initial-display");
  const pokemonDisplay = document.getElementById("pokemon-list");
  const name = document.getElementById("search-input").value;

  const searchTerm = String(name).toLowerCase();

  if (!searchTerm) {
    displayLabel.innerHTML = "Actually search something please";
    pokemonDisplay.innerHTML = "";
    return;
  }
  let pokemonNames = [];

  try {
    displayLabel.innerHTML = "Loading...";
    pokemonNames = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0",
    )
      .then((incoming) => incoming.json())
      .then((data) => {
        return data.results.map((pokemon) => pokemon.name);
      });

    if (!pokemonNames) {
      throw new Error(`Failed to fetch pokemon`);
    }
  } catch (error) {
    console.error("Failed:", error);
    displayLabel.innerHTML = "<li>Failed to load pokemon list.</li>";
  }

  if (!pokemonNames) {
    displayLabel.innerHTML = "Error retrieving pokemon";
    pokemonDisplay.innerHTML = ":(";
    return;
  }

  const matches = pokemonNames.filter((name) => name.includes(searchTerm));

  if (matches.length == 0) {
    displayLabel.innerHTML = "No Matches Found";
    pokemonDisplay.innerHTML = ":(";
    return;
  }

  const matchedPokemons = await fetchPokemon(matches);
  displayLabel.innerHTML = `${matches.length} Matches Found!`;
  renderList(matchedPokemons, pokemonDisplay);
}

export default searchPokemon;
