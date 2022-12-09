// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');
let prompt = document.querySelector('#prompt');
const buttons = document.querySelector('.ldbuttons');
const main = document.querySelector('.fs-main');
const navbar = document.querySelector('.f-ai-center');

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
  [true,'./assets/images/Nicoise-Salad.jpg', 'Salad Nicoise'],
  [true,'https://source.unsplash.com/random/1000x1000/?cheeseburger', 'Cheeseburger'],
  [true,'https://source.unsplash.com/random/1000x1000/?banana', 'Sweet and sour chicken'],
  [true,'https://source.unsplash.com/random/1000x1000/?cookies', 'Cookies'],
  [true,'https://source.unsplash.com/random/1000x1000/?cherry-pie', 'Cherry pie'],
  [true,'https://source.unsplash.com/random/1000x1000/?gelato', 'Gelato'],
  [true,'./assets/images/banoffee-cream-pudding-with-white-choc-crumble.jpg', 'Banana and date pudding with hazelnut butterscotch']
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

function initAnswer(){
  //creating image
  const img = document.createElement('img');
  img.src = currentNode.image;
  img.setAttribute('class', 'answerImg');
  main.setAttribute('style', 'padding: 0; box-sizing:border-box;position:absolute');
  navbar.setAttribute('style', 'padding: 20px;');
  main.appendChild(img);

  //creating container for prompt and description
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  container.setAttribute('class', 'answerContainer');

  //creating prompt and description
  const prompt = document.createElement('h1');
  prompt.innerHTML = currentNode.prompt;
  prompt.setAttribute('class', 'answerPrompt');
  
  const recipe = document.createElement('h2');
  const recipeText = document.createElement('p');
  recipe.innerHTML = 'Recipe';
  recipeText.innerHTML = 'This is a recipe of the dish. It is a very delicious dish. You should try it.';
  recipeText.setAttribute('class', 'answerPrompt');
  recipe.setAttribute('class', 'answerPrompt');

  var strs = [ "Eggs", "Milk", "1/2 pound beef", "3/4 teaspoon of olive oil"];
  var list = document.createElement("ul");
  for (var i in strs) {
    var p = document.createElement("p");
    p.innerText = strs[i];

    var elem = document.createElement("li");
    elem.appendChild(p);
    list.appendChild(elem);
  }

  container.appendChild(prompt);
  container.appendChild(recipe);
  container.appendChild(recipeText);
  container.appendChild(list);
  
  //creating description
  
  main.appendChild(container);
}

function appendNewCard() {
  const card = new Card({
    imageUrl: currentNode.image,
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
      if(currentNode.terminal == true){
        swiper.style.visibility = 'hidden';
        swiper.addEventListener('animationend', () => {
          swiper.remove();
          buttons.remove();
          initAnswer();
        });
        prompt.remove();
        swiper.classList.add("movingLeft");
        buttons.classList.add("movingDown");
      }
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
      if(currentNode.terminal == true){
        swiper.style.visibility = 'hidden';
        swiper.addEventListener('animationend', () => {
          swiper.remove();
          buttons.remove();
          initAnswer();
        });
        prompt.remove();
        swiper.classList.add("movingLeft");
        buttons.classList.add("movingDown");
      }
    },
    prompt: currentNode.prompt
  });

  swiper.append(card.element);
  prompt.innerHTML = card.prompt;

}

appendNewCard();


