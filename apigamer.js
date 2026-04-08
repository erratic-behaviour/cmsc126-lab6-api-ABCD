function takeValueFromOptions() {
  const value = document.getElementById("GenerationList").value;
  getPokemonList(value);
}

async function getPokemonList(generationID) {
  const generationIDStr = String(generationID);
  const pokemonDisplay = document.getElementById("OrderedList");
  const regionDisplay = document.getElementById("List");
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

    const listItems = pokemanes
      .map(
        (pokeman) =>
          `<strong><li>${pokeman.name}</li></strong>
        <img src=${pokeman.sprites.front_default}></img>
        <p>Types:${pokeman.types.map((t) => t.type.name)}</p>
        <p>Abilities:${pokeman.abilities.map((a) => a.ability.name)}</p>
        <p>Pokedex Entry Number: ${pokeman.id}</p>`,
      )
      .join("");

    regionDisplay.innerHTML = `<li><strong>Region: ${generationPlace.toUpperCase()}</strong></li>`;
    pokemonDisplay.innerHTML = `${listItems}`;
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
async function fetchPokemon(array) {
  const pokemonArray = [];
  for (const element of array) {
    try {
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${element.name}`,
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
