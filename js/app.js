const cards = document.querySelectorAll('.memory-card');

let hasFlipped = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('memory-card--flip');

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkIfSame();
}

cards.forEach((card) => card.addEventListener('click', flipCard));

const checkIfSame = () => {
  let isMatch = firstCard.dataset.cat === secondCard.dataset.cat;
  isMatch ? disableCards() : unflipCards();
};

const disableCards = () => {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
};

const unflipCards = () => {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('memory-card--flip');
    secondCard.classList.remove('memory-card--flip');

    resetBoard();
  }, 1300);
};

const resetBoard = () => {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};
