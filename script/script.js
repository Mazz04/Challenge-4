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
    <ul class="cards">
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
  </ul>
    `);
    cardsContainer.insertAdjacentHTML("beforeend", cards.join(""));
  }
  
  renderCards(products);