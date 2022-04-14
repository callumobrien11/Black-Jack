// Deck of cards
let cardDeck = [
  "dA",
  "dK",
  "dQ",
  "dJ",
  "d10",
  "d09",
  "d08",
  "d07",
  "d06",
  "d05",
  "d04",
  "d03",
  "d02",
  "hA",
  "hK",
  "hQ",
  "hJ",
  "h10",
  "h09",
  "h08",
  "h07",
  "h06",
  "h05",
  "h04",
  "h03",
  "h02",
  "sA",
  "sK",
  "sQ",
  "sJ",
  "s10",
  "s09",
  "s08",
  "s07",
  "s06",
  "s05",
  "s04",
  "s03",
  "s02",
  "cA",
  "cK",
  "cQ",
  "cJ",
  "c10",
  "c09",
  "c08",
  "c07",
  "c06",
  "c05",
  "c04",
  "c03",
  "c02",
];

// keep track of used cards
let dealerHand = [];
let playerHand = [];

// elements
let betBtn = document.getElementById("bet");
let hitBtn = document.getElementById("hit");
let standBtn = document.getElementById("stand");

//dealer cards
let dealerCard1 = document.getElementById("dealer-card-1");
let dealerCard2 = document.getElementById("dealer-card-2");
let dealerCard3 = document.getElementById("dealer-card-3");
let dealerCard4 = document.getElementById("dealer-card-4");
let dealerCard5 = document.getElementById("dealer-card-5");

// player cards
let playerCard1 = document.getElementById("player-card-1");
let playerCard2 = document.getElementById("player-card-2");
let playerCard3 = document.getElementById("player-card-3");
let playerCard4 = document.getElementById("player-card-4");
let playerCard5 = document.getElementById("player-card-5");

let restartGame = document.getElementById("restart-game");
let displayWinner = document.getElementById("display-winner");

// hitBtn.disabled = true;
// standBtn.disabled = true;

// event listeners
betBtn.addEventListener("click", betClick);
hitBtn.addEventListener("click", hitClick);
standBtn.addEventListener("click", standClick);
restartGame.addEventListener("click", restartClick)

let playerHandValue = 0;
let dealerHandValue = 0;

// functions

function restartClick () {
    dealerHand = []
    playerHand = []
    playerHandValue = 0
    dealerHandValue = 0
    displayWinner.innerHTML = ""
    playerCard1.className = "card"
    playerCard2.className = "card"
    playerCard3.className = "card"
    playerCard4.className = "card"
    playerCard5.className = "card"
    dealerCard1.className = "card"
    dealerCard2.className = "card"
    dealerCard3.className = "card"
    dealerCard4.className = "card"
    dealerCard5.className = "card"
    betBtn.disabled = false
}

function betClick() {
  setTable();
  checkWinner();
  hitBtn.disabled = false;
  document.getElementById("stand").disabled = false;
  betBtn.disabled = true;
}

function hitClick() {
  if (playerHand.length === 2) {
    playerHand.push(cardDeck.pop());
    playerCard3.classList.add(playerHand[2]);
  } else if (playerHand.length === 3) {
    playerHand.push(cardDeck.pop());
    playerCard4.classList.add(playerHand[3]);
  } else if (playerHand.length === 4) {
    playerHand.push(cardDeck.pop());
    playerCard5.classList.add(playerHand[4]);
  } else if (playerHand.length === 5) {
    hitBtn.disabled = true;
  }
  checkWinner();
}

function standClick() {
  dealerCard2.classList.remove("back");
  // check value of Hands
  checkDealerHand(dealerHand);
  checkPlayerHand(playerHand);
  for (let i = 0; i < 3; i++) {
      if (dealerHandValue < 16) {
          if (i === 0) {
            dealerHand.push(cardDeck.pop());
            dealerCard3.classList.add(dealerHand[2]);
            checkDealerHand(dealerHand)
          } if (i === 1) {
            dealerHand.push(cardDeck.pop());
            dealerCard4.classList.add(dealerHand[3]);
            checkDealerHand(dealerHand)
          } if (i === 2) {
            dealerHand.push(cardDeck.pop());
            dealerCard5.classList.add(dealerHand[4]);
            checkDealerHand(dealerHand)
          }
      } 
  } 
  if (dealerHandValue === playerHandValue) {
    displayWinner.innerHTML = " Its a tie, press restart to play agian";
    console.log("dealer value: " + dealerHandValue);
    console.log("player value: " + playerHandValue);
    return
  }
  if (dealerHandValue > 21) {
    displayWinner.innerHTML = " Dealer Bust, you win! (press restart to play agian)";
    console.log("dealer value: " + dealerHandValue);
    console.log("player value: " + playerHandValue);
    return
  }
   if (dealerHandValue > playerHandValue) {
    displayWinner.innerHTML = "Dealer Won, press restart to play agian";
    console.log("dealer value: " + dealerHandValue);
    console.log("player value: " + playerHandValue);

    if (playerHandValue > dealerHandValue) {
        displayWinner.innerHTML = "You Won, press restart to play agian";
        console.log("dealer value: " + dealerHandValue);
        console.log("player value: " + playerHandValue);
    }

  } if (dealerHandValue < playerHandValue) {
    displayWinner.innerHTML = "You Won,  press restart to play agian";
    console.log("dealer value: " + dealerHandValue);
    console.log("player value: " + playerHandValue);
  } else {
      return
  }
}


function checkDealerHand(hand) {
  dealerHandValue = 0;
  for (let i = 0; i < hand.length; ++i) {
    dealerHandValue += getCardValue(hand[i]);
  }
  return dealerHandValue;
}

function checkPlayerHand(hand) {
  playerHandValue = 0;
  for (let i = 0; i < hand.length; ++i) {
    playerHandValue += getCardValue(hand[i]);
  }
  return playerHandValue;
}

function checkWinner() {
  checkPlayerHand(playerHand);
  console.log(playerHandValue);
  if (playerHandValue > 21) {
    displayWinner.innerHTML = "Dealer Won, press restart to play agian";
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("bet").disabled = true;
  } else if (playerHandValue === 21) {
    console.log("Player has won");
    displayWinner.innerHTML = "You Won,  press restart to play agian";
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("bet").disabled = true;
  }
}

function getCardValue(card) {
  let cardValue = 0;
  let faceCard = card[1];
  if (faceCard === "J") return 10;
  if (faceCard === "K") return 10;
  if (faceCard === "Q") return 10;
  if (faceCard === "A") return 11;

  cardValue = card.substring(1);
  return parseInt(cardValue);
}

// get random card
function shuffle(deck) {
  for (let i = 0; i < 52; i++) {
    let tempCard = deck[i];
    let randIdx = Math.floor(Math.random() * 52);
    deck[i] = deck[randIdx];
    deck[randIdx] = tempCard;
  }
  return deck;
}

function setTable() {
  shuffle(cardDeck);
 
  for (let i = 0; i < 2; i++) {
    playerHand.push(cardDeck.pop());
  }
  
  playerCard1.classList.add(playerHand[0]);
  playerCard2.classList.add(playerHand[1]);

  for (let i = 0; i < 2; i++) {
    dealerHand.push(cardDeck.pop());
  }

  dealerCard1.classList.add(dealerHand[0]);
  dealerCard2.classList.add("back");
  dealerCard2.classList.add(dealerHand[1]);
}
