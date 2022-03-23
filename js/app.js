'use strict';

//  ************************** GLOBAL VARIABLES ****************************** //
let productArray = [];
let votes = 25;
let indexNew = [];

// ************************** LOCAL STORAGE RETRIEVAL *********************** //
let productRetrieval = localStorage.getItem('products');
productRetrieval = JSON.parse(productRetrieval);


// ************************** DOM REFERENCES ******************************** //
let chart = document.getElementById('chart');
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
  // this.percentage = 0;

  productArray.push(this);
}

if(productRetrieval) {
  productArray = productRetrieval;
} else {
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
}

// ************************** HELPER FUNCTIONS ****************************** //
function randomizeIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImg() {
  let index = [];
  let indexOrigin = 0;

  while(index.length <= 3) {
    indexOrigin = randomizeIndex();
    if(!index.includes(indexOrigin) && !indexNew.includes(indexOrigin)) {
      index.push(indexOrigin);
    }
  }

  indexNew = [];

  let index1 = index.pop();
  let index2 = index.pop();
  let index3 = index.pop();


  img1.src = productArray[index1].img;
  img1.alt = productArray[index1].name;
  productArray[index1].views++;

  img2.src = productArray[index2].img;
  img2.alt = productArray[index2].name;
  productArray[index2].views++;

  img3.src = productArray[index3].img;
  img3.alt = productArray[index3].name;
  productArray[index3].views++;

  indexNew.push(index1, index2, index3);
}

renderImg();

// Products.prototype.getPercentage = function() {
//   this.percentage = (this.clicks / this.views) * 100;
// };

// ************************** CHART ***************************************** //
function renderChart() {
  let productName = [];
  let productClicks = [];
  let productViews = [];

  for(let i = 0; i < productArray.length; i++) {
    productName.push(productArray[i].name);
    productClicks.push(productArray[i].clicks);
    productViews.push(productArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of Votes',
        data: productClicks,
        backgroundColor: [
          'green'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'darkgrey'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
    }
  };

  new Chart(chart, chartObj);
}

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
    renderChart();

    let stringifiedProducts = JSON.stringify(productArray);
    localStorage.setItem('products', stringifiedProducts);

    return;
  }

  renderImg();
}

// ************************** EVENT LISTENERS ******************************* //
products.addEventListener('click', handleClick);
