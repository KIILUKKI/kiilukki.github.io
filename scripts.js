async function loadGames() {
  const res = await fetch("games.json");
  const games = await res.json();
  const container = document.getElementById("games");

  games.forEach(game => {
    const card = document.createElement("a");
    card.className = "game-card";
    card.href = game.link;

    card.innerHTML = `
      <div class="thumb">
        <img src="${game.cover}" alt="${game.title} screenshot">
      </div>
      <div class="info">
        <h2>${game.title}</h2>
        <p>${game.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

loadGames();
