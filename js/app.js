'use strict';

//  ************************** GLOBAL VARIABLES ****************************** //
let productArray = [];
let votes = 25;

// ************************** DOM REFERENCES ******************************** //
let button = document.getElementById('view-results');
let showResults = document.getElementById('result-list');
let products = document.getElementById('product-display');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

// ************************** CONSTRUCTORS ********************************** //

function Products(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  this.percentage = 0;

  productArray.push(this);
}

new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('sweep', 'png');
new Products('tauntaun');
new Products('unicorn');
new Products('water-can');
new Products('wine-glass');

// ************************** HELPER FUNCTIONS ****************************** //
function randomizeIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImg() {
  let index1 = randomizeIndex();
  let index2 = randomizeIndex();
  let index3 = randomizeIndex();

  while(index1 === index2 || index1 === index3) {
    index1 = randomizeIndex();
  }
  while(index2 === index1 || index2 === index3) {
    index2 = randomizeIndex();
  }

  img1.src = productArray[index1].img;
  img1.alt = productArray[index1].name;
  productArray[index1].views++;

  img2.src = productArray[index2].img;
  img2.alt = productArray[index2].name;
  productArray[index2].views++;

  img3.src = productArray[index3].img;
  img3.alt = productArray[index3].name;
  productArray[index3].views++;
}

renderImg();

Products.prototype.getPercentage = function() {
  this.percentage = (this.clicks / this.views) * 100;
};

// ************************** EVENT HANDLERS ******************************** //
function handleClick(event) {
  let imgClicked = event.target.alt;
  votes--;
  for(let i = 0; i < productArray.length; i++) {
    if(productArray[i].name === imgClicked) {
      productArray[i].clicks++;
    }
  }

  if(votes === 0) {
    products.removeEventListener('click', handleClick);
    return;
  }

  renderImg();
}

function handleButton(event) {
  if(votes === 0) {
    for(let i = 0; i < productArray.length; i++) {
      productArray[i].getPercentage();
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} was viewed ${productArray[i].views} times and clicked on ${productArray[i].clicks} times, meaning it was chosen ${productArray[i].percentage.toFixed(1)}% of the time.`;
      showResults.appendChild(liElem);
    }
  }
}

// ************************** EVENT LISTENERS ******************************* //
products.addEventListener('click', handleClick);
button.addEventListener('click', handleButton);
