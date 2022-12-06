// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');
let prompt = document.querySelector('#prompt');

//Raw data
const rawData = [
  [false,'https://source.unsplash.com/random/1000x1000/?dessert', 'Dessert?'],
  [false,'https://source.unsplash.com/random/1000x1000/?savory-food', 'Something savory?'],
  [false,'https://source.unsplash.com/random/1000x1000/?icecream', 'Something cold?'],
  [false,'https://source.unsplash.com/random/1000x1000/?salad', 'Something fresh?'],
  [false,'https://source.unsplash.com/random/1000x1000/?sour-food', 'Something sour?'],
  [false,'https://source.unsplash.com/random/1000x1000/?pastry', 'Pastry?'],
  [false,'https://source.unsplash.com/random/1000x1000/?jelly', 'Something chewy?'],
  [true,'https://source.unsplash.com/random/1000x1000/?banana', 'Jeez, you are not hungry then! Just go eat a banana or something...'],
  [true,'/assets/images/Nicoise-Salad.jpg', 'Salad Nicoise'],
  [true,'https://source.unsplash.com/random/1000x1000/?cheeseburger', 'Cheeseburger'],
  [true,'https://source.unsplash.com/random/1000x1000/?banana', 'Sweet and sour chicken'],
  [true,'https://source.unsplash.com/random/1000x1000/?cookies', 'Cookies'],
  [true,'https://source.unsplash.com/random/1000x1000/?cherry-pie', 'Cherry pie'],
  [true,'https://source.unsplash.com/random/1000x1000/?gelato', 'Gelato'],
  [true,'/assets/images/banoffee-cream-pudding-with-white-choc-crumble.jpg', 'Banana and date pudding with hazelnut butterscotch']
];

let root;
function insertLevelOrder(arr, i)
    {
        let root = null;
        // Base case for recursion
        if (i < arr.length) {
            root = new Node(arr[i][0], arr[i][1], arr[i][2]);
    
            // insert left child
            root.left = insertLevelOrder(arr, 2 * i + 1);
    
            // insert right child
            root.right = insertLevelOrder(arr, 2 * i + 2);
        }
        return root;
}

let currentNode = insertLevelOrder(rawData, 0);

function appendNewCard() {
  const card = new Card({
    imageUrl: currentNode.image,
    onDismiss: appendNewCard,
    onLike: () => {
      console.log("Liked");
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
      currentNode = currentNode.right;
      console.log(card.element);
    },
    onDislike: () => {
      console.log("disiked");
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
      currentNode = currentNode.left;
      console.log(card.element);
    },
    prompt: currentNode.prompt
  });

  swiper.append(card.element);
  prompt.innerHTML = card.prompt;

}

appendNewCard();


