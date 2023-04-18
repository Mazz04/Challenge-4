class Product{
    constructor(id, name, xpbase, image) {
      this.id = id;
      this.name = name;
      this.xpbase = xpbase;
      this.image = image;
    } 
  }
  
  const products = [
    new Product(), 
    new Product(),
    new Product(),
    new Product(),
    new Product(),
    new Product(),
    new Product(),
    new Product(),
    new Product(),
    new Product(),
  ];
  
  function renderCards(productsArray) {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    const cards = productsArray.map((product) => `

    <li>
      <a class="card" onclick="this.classList.toggle('expanded')">
        <img src="https://pm1.narvii.com/6720/25e80ad037ae1298d4be1d8b0b6a741c8c180347_00.jpg" class="card__image" alt="" />
        <div class="card__overlay">
          <div class="card__header">
            <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
            <img class="card__thumb" src="https://pm1.narvii.com/6720/25e80ad037ae1298d4be1d8b0b6a741c8c180347_00.jpg" alt="" />
            <div class="card__header-text">
              <h3 class="card__title">Jessica Parker</h3>            
              <span class="card__status">1 hour ago</span>
            </div>
          </div>
          <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
        </div>
      </a>      
    </li>  

    `);
    cardsContainer.insertAdjacentHTML("beforeend", cards.join(""));
  }
  
  renderCards(products);

  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const pokemonContainer = document.querySelector(".pokemon-container");

  button.addEventListener('click', (e) => {
    e.preventDefault();
    traerPokemon(input.value);
  })

  function traerPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then((res) => res.json())
    .then((data) => {
        crearPokemon(data);
    });
  }

  function crearPokemon(pokemon) {
    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;

    const h3 = document.createElement("h3");
    h3.textContent = pokemon.name;

    const div = document.createElement("div");
    div.appendChild(img);
    div.appendChild(h3);

    pokemonContainer.appendChild(div);
  }