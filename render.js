function renderList(pokemonData, listElement) {
    listElement.innerHTML = "";

    pokemonData.forEach((pokemon) => {
        const listItem = document.createElement("li");
        listItem.className = "pokemon-item";
        listItem.innerHTML = `
            <span class="poke-num">#${pokemon.id}</span>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <span class="poke-name">${pokemon.name}</span>
        `;

        listItem.addEventListener("click", () => {
            document.querySelectorAll(".pokemon-item")
                .forEach(el => el.classList.remove("active"));
            listItem.classList.add("active");
            showDetail(pokemon);
        });
        listElement.appendChild(listItem);
    });
}

function showDetail(pokemon) {
    const detailView = document.getElementById("detail-view");

    const types = pokemon.types
        .map(t => `<span class="tag">${t.type.name}</span>`).join("");

    const abilities = pokemon.abilities
        .map(a => `<span class="tag">${a.ability.name}</span>`).join("");

    const stats = pokemon.stats.map(s => {
    const pct = Math.min((s.base_stat / 255) * 100, 100).toFixed(1);
    return `
            <div class="stat-row">
                <span class="stat-name">${s.stat.name}</span>
            <div class="stat-bar-bg">
            <div class="stat-bar-fill" style="width:${pct}%"></div>
            </div>
                <span class="stat-val">${s.base_stat}</span>
            </div>
        `;
    }).join("");

    detailView.innerHTML = `
        <div id="detail-content">
            <div class="detail-header">
                <img class="detail-sprite"
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}" />
                <div>
                    <div class="detail-name">${pokemon.name}</div>
                    <div class="detail-num">#${String(pokemon.id).padStart(3, "0")}</div>
                </div>
            </div>

            <div class="detail-section">
                <h3>Type</h3>
                <div class="tag-row">${types}</div>
            </div>

            <div class="detail-section">
                <h3>Abilities</h3>
                <div class="tag-row">${abilities}</div>
            </div>

            <div class="detail-section">
                <h3>Base Stats</h3>
                <div class="stat-list">${stats}</div>
            </div>
        </div>
    `;
}