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
              <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
            </div>
          </a>      
        </li>  
      `
    );
    pokemonContainer.innerHTML = cards.join("");
  }
  
  async function fetchPokemons() {
    const pokemons = [];
    const ids = generateRandomIds(10);
  
    for (const id of ids) {
      const pokemon = await fetchPokemon(id);
      pokemons.push(pokemon);
    }
  
    renderCards(pokemons);
  }
  
  async function fetchPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
  
    return new Pokemon(
      data.id,
      data.name,
      data.base_experience,
      data.sprites.front_default
    );
  }
  
  function generateRandomIds(count) {
    const ids = [];
    while (ids.length < count) {
      const id = Math.floor(Math.random() * 898) + 1;
      if (!ids.includes(id)) {
        ids.push(id);
      }
    }
    return ids;
  }
  
  fetchPokemons();