import { default as renderList } from "./render.js";

function takeValueFromOptions() {
  const value = document.getElementById("generation-list").value;
  getPokemonList(value);
}

async function getPokemonList(generationID) {
  const generationIDStr = String(generationID);
  const pokemonDisplay = document.getElementById("pokemon-list");
  const regionDisplay = document.getElementById("initial-display");
  regionDisplay.innerHTML = "Loading...";

  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/generation/${generationIDStr}/`,
    );

    if (!data) {
      throw new Error(`Failed to fetch generation ${generationIDStr}`);
    }

    const gen = await data.json();
    const generationPlace = gen.main_region.name;
    const pokemanesList = gen.pokemon_species;
    const pokemanes = await fetchPokemon(pokemanesList);

    regionDisplay.innerHTML = `<li><strong>Region: ${generationPlace.toUpperCase()}</strong></li>`;
    renderList(pokemanes, pokemonDisplay);
  } catch (error) {
    console.error("Failed:", error);
    regionDisplay.innerHTML = "<li>Failed to load pokemon list.</li>";
  }
}

/*
Necessary because pokemon_species from generation does not hold the information
regarding the pokemon. This cross references the name with the ACTUAL 
pokemon part of the JSON
*/
export async function fetchPokemon(array) {
  const pokemonArray = [];
  for (const element of array) {
    try {
      const name = typeof element === "string" ? element : element.name;
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      );
      if (!pokemonData.ok) {
        throw new Error("At Getting Pokemon Info");
      }
      const pokemon = await pokemonData.json();
      pokemonArray.push(pokemon);
    } catch (error) {
      console.error("Failed:", error);
    }
  }

  return pokemonArray.sort((a, b) => a.id - b.id);
}

export default takeValueFromOptions;
