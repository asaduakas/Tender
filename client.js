// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');
let prompt = document.querySelector('#prompt');

//Raw data
const rightData = [
  [false, 'https://source.unsplash.com/random/1000x1000/?dessert', 'Dessert?'],
  [false,'https://source.unsplash.com/random/1000x1000/?icecream', 'Something cold?'],
  [false,'https://source.unsplash.com/random/1000x1000/?pastry', 'Pastry?'],
  [false,'https://source.unsplash.com/random/1000x1000/?jelly', 'Something chewy?'],
  [true,'https://source.unsplash.com/random/1000x1000/?cookies', 'Cookies'],
  [true,'https://source.unsplash.com/random/1000x1000/?cherry-pie', 'Cherry pie'],
  [true,'https://source.unsplash.com/random/1000x1000/?gelato', 'Gelato'],
  [true,'/assets/images/banoffee-cream-pudding-with-white-choc-crumble.jpg', 'Banana and date pudding with hazelnut butterscotch']
];

const leftData = [
  [],
  [false,'https://source.unsplash.com/random/1000x1000/?savory-food', 'Something savory?'],
  [false,'https://source.unsplash.com/random/1000x1000/?sour-food', 'Something sour?'],
  [false,'https://source.unsplash.com/random/1000x1000/?salad', 'Something fresh?'],
  [true,'https://source.unsplash.com/random/1000x1000/?banana', 'Sweet and sour chicken'],
  [true,'https://source.unsplash.com/random/1000x1000/?cheeseburger', 'Cheeseburger'],
  [true,'/assets/images/Nicoise-Salad.jpg', 'Salad Nicoise'],
  [true,'https://source.unsplash.com/random/1000x1000/?banana', 'Jeez, you are not hungry then! Just go eat a banana or something...']
];

//Create a new binary tree
let bts = new BinaryTree();

//Fill the tree with nodes from raw data
for (let i = 0; i < rightData.length; i++) {
  bts.insert(i, rightData[i][0], rightData[i][1], rightData[i][2]);
}


for (let i = 1; i > (leftData.length); i++) {
  bts.insert(i*-1, leftData[i][0], leftData[i][1], leftData[i][2]);
}

let currentNode = bts.getRootNode();
function appendNewCard() {
  const card = new Card({
    imageUrl: currentNode.image,
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
      currentNode = currentNode.right;
      console.log(card.element);
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
      currentNode = currentNode.left;
    },
    prompt: currentNode.prompt
  });

  swiper.append(card.element);
  prompt.innerHTML = card.prompt;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

//Show only 1 card at a time
for (let i = 0; i < 1; i++) {
  appendNewCard();
}


