//create a list of all cards
let cardList = document.getElementsByClassName('card');
let cards = [...cardList];
console.log(cards);

// initialize array for open cards list
var openlist = [];

// variable for matched card list
let matchedCard = document.getElementsByClassName('match');
const deckcards = document.querySelector('.deck');


// create variables for deck, moves, and star rating
const carddeck = document.getElementById('card-deck');
let moves = 0;
let counter = document.querySelector('.moves');

// variables for game won modal 
let modal = document.getElementById('score')
const stars = document.querySelectorAll('.fa-star');

//set event listeners for turning cards over, checking symbols, and game won modal
for (var i = 0; i < cards.length; i++) {
  cardList = cards[i];
  cardList.addEventListener('click', turnCard)
  cardList.addEventListener('click', checkCard)
  cardList.addEventListener('click', winnerModal)
};

window.onload = start()

//shuffle cards and add them to board
function start() {
  init = [];
  var shuffled = shuffle(cards);
  for (var i = 0; i < shuffled.length; i++){
    [].forEach.call(shuffled, function(item){
      deckcards.appendChild(item);
    })
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//toggle classes for turning cards over
function turnCard() {
  this.classList.toggle('open')
  this.classList.toggle('show')
  this.classList.toggle('locked')
}

//push open cards to list, check to see if card symbols match
function checkCard() {
  openlist.push(this);
  console.log(openlist)
  var length = openlist.length;
  if (length === 2){
    movecounter();
    if (openlist[0].firstElementChild.classList.value === openlist[1].firstElementChild.classList.value) {
      match()
    } else {
      unmatch()
    }
  }
};

//add and remove classs for matching cards
function match() {
  openlist[0].classList.add('match', 'lock')
  openlist[1].classList.add('match', 'lock')
  openlist[0].classList.remove('show', 'open')
  openlist[1].classList.remove('show', 'open')
  openlist = [];
}

// remove classes for unmatched cards
function unmatch() {
  openlist[0].classList.add('unmatch')
  openlist[1].classList.add('unmatch')
  lock()

  setTimeout(function() {
    openlist[0].classList.remove('show', 'open')
    openlist[1].classList.remove('show', 'open')
      unlock()
      openlist = [];
}, 1000)
}

//lock turned over cards so that only two can be checked at a time
function lock() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('locked')
  })
}

//remove locked classes from elements
function unlock() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('locked')
      for (var i = 0; i < matchedCard.length; i++) {
        matchedCard[i].classList.add('locked')
      }
  })
}

//increment moves, call timer function, collapse star visibility for rating 
function movecounter() {
moves++;
counter.innerHTML = moves

if (moves == 1) {
    second = 0;
    minute = 0; 
    hour = 0;
    starttimer()
}

if (moves > 10 && moves < 15) {
  for (i= 0; i < 3; i++) {
    if (i > 1){
      stars[i].style.visibility = 'collapse'
      }
    }
}
else if (moves > 20) {
  for (i= 0; i < 3; i++) {
    if (i > 0){
      stars[i].style.visibility = 'collapse'
      }
    }
  }
}

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector('.gametime')
var startime;

//timer function and timer read out for score pannel 
function starttimer() {
  playtime = setInterval(function() {
    second++;

    timer.innerHTML = second + ' seconds'
    if (second > 60) {
      second = 0;
      minute++; 
    }

    if (minute >= 1) {
       timer.innerHTML = minute + ' minutes ' + second + ' seconds'
    }

  }, 1000)
}

//game won modal displays, time score and number of moves
function winnerModal() {
  if (matchedCard.length === 16) {
    clearInterval(playtime)
    totaltime = timer.innerHTML
    console.log(totaltime)

    var rating = document.querySelector('.stars').innerHTML

    document.getElementById('finalrating').innerHTML = rating
    document.getElementById('finalscore').innerHTML = moves
    document.getElementById('timeelapsed').innerHTML = totaltime

    modal.style.display = 'block'
  }
}




