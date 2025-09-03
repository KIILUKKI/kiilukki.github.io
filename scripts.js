async function loadGames() {
  const res = await fetch("games.json");
  const games = await res.json();
  const container = document.getElementById("games");
  const searchInput = document.getElementById("search");
  const categorySelect = document.getElementById("category");

  function render(filter = "") {
    container.innerHTML = "";
    const selectedCat = categorySelect.value;
    games
      .filter(game =>
        (selectedCat === "all" || (game.category && game.category === selectedCat)) &&
        (game.title.toLowerCase().includes(filter.toLowerCase()) ||
         game.description.toLowerCase().includes(filter.toLowerCase()))
      )
      .forEach(game => {
        const card = document.createElement("a");
        card.className = "game-card";
        card.href = game.link;
        card.innerHTML = `
          <div class="thumb">
            <img src="${game.cover}" alt="${game.title}">
          </div>
          <div class="info">
            <h2>${game.title}</h2>
            <p>${game.description}</p>
          </div>
        `;
        container.appendChild(card);
      });
  }

  render();

  searchInput.addEventListener("input", e => render(e.target.value));
  categorySelect.addEventListener("change", () => render(searchInput.value));
}

loadGames();
