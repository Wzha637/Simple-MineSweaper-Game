const grid = document.querySelector('.grid');
let width = 10;
let bomb = 20; // number of bombs
let squares = []
let isGameOver = false;
let flags = 0;

// create board
function createBoard() {
  const bombArray = Array(bomb).fill('bomb'); //array of all bombs
  const emptyArray = Array(width*width-bomb).fill('valid'); // array of all empty/valid squares
  const gameArray = emptyArray.concat(bombArray); // array of both valid and bomb squares
  const sortedArray = gameArray.sort(() => Math.random()-0.5); // suqares are shuffled 

 for(let i = 0; i < width*width; i++) {
  const square = document.createElement('div'); //create all the squares using div
  square.setAttribute('id', i); // each square has an id
  square.classList.add(sortedArray[i]); // each square is given the class name of bomb/valid
  grid.appendChild(square);
  squares.push(square);

  square.addEventListener('click', function(e) {
   click(square);
  })

  square.oncontextmenu = function(e) {
   e.preventDefault();
   addFlag(square);
  }
 }

 for(let i=0; i < squares.length; i++) {
  const isLeftEdge = (i % width === 0); // left edge
  const isRightEdge = (i % width === width-1); // right edge
  let total = 0;
  if(squares[i].classList.contains('valid')) {
   if(i > 0 && !isLeftEdge &&squares[i-1].classList.contains('bomb')) {
    total++;
   }
   if(i > 9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) {
    total++;
   }
   if(i >= 10 && squares[i-width].classList.contains('bomb')) {
    total++;
   }
   if(i > 11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) {
    total++;
   }
   if(i < 98 && !isRightEdge && squares[i+1].classList.contains('bomb')) {
    total++;
   }
   if(i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) {
    total++;
   }
   if(i <= 88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) {
    total++;
   }
   if(i <=89 && squares[i+width].classList.contains('bomb')) {
    total++;
   }
   squares[i].setAttribute('data',total);
  }
 }

}

createBoard()
// add flags
function addFlag(square) {
 if(isGameOver) return;
  if(!square.classList.contains('flag')) {
   square.classList.add('flag');
   square.innerHTML = '<i class="fa-solid fa-flag" style="color:red"></i>';
   flags++;
  } else {
   square.classList.remove('flag');
   square.innerHTML = '';
   flags--;
  }
}

// click square with bomb
function click(square) {
 let currentId = square.id;
 if(isGameOver) return;
 if(square.classList.contains('checked') || square.classList.contains('flag')) return;
 if(square.classList.contains('bomb')) {
  gameOver(square);
 }
 else {
  let total = square.getAttribute('data');
  if(total !=0) {
   square.classList.add('checked');
   checkForWin();
   square.innerHTML = total;
   return;
  }
  checkSquare(square, currentId); // check neighbouring squares
 }
 square.classList.add('checked');
}

// check neighbouring squares
function checkSquare(square, currentId) {
 const isLeftEdge = (currentId % width === 0);
 const isRightEdge = (currentId % width === width-1);

 setTimeout(() => {
  if(currentId > 0 && !isLeftEdge) {
   const newId = squares[parseInt(currentId)-1].id;
   const newSquare = document.getElementById(newId);
   click(newSquare);
  }
  if(currentId > 9 && !isRightEdge) {
   const newId = squares[parseInt(currentId)+1-width].id;
   const newSquare = document.getElementById(newId);
   click(newSquare); 
  }
  if(currentId >= 10) {
   const newId = squares[parseInt(currentId)-width].id;
   const newSquare = document.getElementById(newId);
   click(newSquare);
  }
  if(currentId >= 11 && !isLeftEdge) {
   const newId = squares[parseInt(currentId)-1-width].id;
   const newSquare = document.getElementById(newId);
   click(newSquare);
  }
  if(currentId <=98 && !isRightEdge) {
   const newId = squares[parseInt(currentId)+1].id;
   const newSquare = document.getElementById(newId);
   click(newSquare);
  }
  if(currentId < 90 && !isLeftEdge) {
   const newId = squares[parseInt(currentId)-1+width].id;
   const newSquare = document.getElementById(newId);
   click(newSquare);
  }
  if(currentId <= 88 && !isRightEdge) {
   const newId = squares[parseInt(currentId)+1+width].id;
   const newSquare = document.getElementById(newId);
   click(newSquare);
  }
  if(currentId <=89) {
   const newId = squares[parseInt(currentId)+width].id;
   const newSquare = document.getElementById(newId);
   click(newSquare);
  }
 }, 10)
}

// game over
function gameOver(square) {
 console.log('BOOM Game Over!');
 isGameOver = true;
 // shows rest of the bombs
 squares.forEach(square => {
  if(square.classList.contains('bomb')) {
   square.innerHTML = '<i class="fa-solid fa-bomb"></i>';
  }
 })
}

//check for win
function checkForWin() {
 let checked = 0;
 for(let i = 0; i < squares.length; i++) {
  if(squares[i].classList.contains('checked')) {
   checked++;
  }
  if(checked === squares.length - bomb) {
   alert('You Win!');
   console.log('You Win!');
   isGameOver = true;
  }
 }
}