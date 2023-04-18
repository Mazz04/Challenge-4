class Pokemon {
    constructor(id, name, xpbase, image) {
      this.id = id;
      this.name = name;
      this.xpbase = xpbase;
      this.image = image;
    }
  }
  
  const pokemonContainer = document.getElementById("cards-container");
  
  function renderCards(pokemons) {
    const cards = pokemons.map(
      (pokemon) => `
        <li>
          <a class="card" onclick="this.classList.toggle('expanded')">
            <img src="${pokemon.image}" class="card__image" alt="${pokemon.name}" />
            <div class="card__overlay">
              <div class="card__header">
                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                <img class="card__thumb" src="${pokemon.image}" alt="${pokemon.name}" />
                <div class="card__header-text">
                  <h3 class="card__title">${pokemon.name}</h3>            
                  <span class="card__status">${pokemon.xpbase} XP</span>
                </div>
              </div>
            </div>
            <p class="card__description">${statList}</p>
          </div>
        </a>      
      </li>
    `;
  });
  cardsContainer.insertAdjacentHTML("beforeend", cards.join(""));
}

async function fetchPokemonData(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  const data = await response.json();
  const stats = data.stats.map((stat) => {
    return {
      name: stat.stat.name,
      base_stat: stat.base_stat,
    };
  });
  const product = new Product(data.id, data.name, data.base_experience, data.sprites.front_default, stats);
  return product;
}

async function fetchRandomPokemonData() {
  const pokemonIds = [];
  while (pokemonIds.length < 10) {
    const id = getRandomInt(1, 152);
    if (!pokemonIds.includes(id)) {
      pokemonIds.push(id);
    }
  }
  const products = await Promise.all(pokemonIds.map(fetchPokemonData));
  renderCards(products);
}

fetchRandomPokemonData();