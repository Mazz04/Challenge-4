class PokemonAPI {
  constructor() {
    if (PokemonAPI.instance) {
      return PokemonAPI.instance;
    }
    this.POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    PokemonAPI.instance = this;
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async fetchPokemonData(pokemon) {
    const url = `${this.POKEMON_API_BASE_URL}${pokemon}/`;
    const data = await this.fetchData(url);
    const stats = data.stats.map((stat) => {
      return {
        name: stat.stat.name,
        base_stat: stat.base_stat,
      };
    });
    const product = new Product(data.id, data.name, data.base_experience, data.sprites.front_default, stats);
    return product;
  }

  async fetchRandomPokemonData() {
    const pokemonIds = [];
    while (pokemonIds.length < 10) {
      const id = getRandomInt(1, 1028);
      if (!pokemonIds.includes(id)) {
        pokemonIds.push(id);
      }
    }
    const products = await Promise.all(pokemonIds.map((id) => this.fetchPokemonData(id)));
    return products;
  }

  async fetchInitPokemonData() {
    const pokemonIds = [];
    for(var i=1;i<11;i++){
      const idInit = i;
      if (!pokemonIds.includes(idInit)) {
        pokemonIds.push(idInit);
      }
    }
    const products = await Promise.all(pokemonIds.map((idInit) => this.fetchPokemonData(idInit)));
    return products;
  }
}

class Product {
  constructor(id, name, xpbase, image, stats) {
    this.id = id;
    this.name = name;
    this.xpbase = xpbase;
    this.image = image;
    this.stats = stats;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function renderCards(productsArray) {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  const cards = productsArray.map((product) => {
    let statList = "";
    for (let i = 0; i < product.stats.length; i++) {
      const stat = product.stats[i];
      statList += `${stat.name}: ${stat.base_stat} `;
    }
    return `
      <li>
        <a class="card" onclick="this.classList.toggle('expanded')">
          <img src="${product.image}" class="card__image" alt="" />
          <div class="card__overlay">
            <div class="card__header">
              <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
              <img class="card__thumb" src="${product.image}" alt="" />
              <div class="card__thumbb" /></div>
              <div class="card__header-text">
                <h3 class="card__title">${product.name}</h3>            
                <span class="card__status">Pokedex: ${product.id} | XP Base: ${product.xpbase}</span>
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

const pokemonAPI = new PokemonAPI();

async function fetchAndRenderData() {
  if(flag <1){
  const products = await pokemonAPI.fetchInitPokemonData();
  renderCards(products);
  flag=21;
  }
  else{
  const products = await pokemonAPI.fetchRandomPokemonData();
  renderCards(products);
  }
 
}


var flag=0;

fetchAndRenderData();



setInterval(() => {
  console.log ("help, we are a group of handicapped people exploited for work without pay")
}, 2000);
