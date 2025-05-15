

const cards = [
  { id: 1, type: 'face', content: 'shahruk.jpeg' },
  { id: 1, type: 'name', content: 'Shah Rukh Khan' },

  { id: 2, type: 'face', content: 'amitabh.jpeg' },
  { id: 2, type: 'name', content: 'Amitabh Bachchan' },

  { id: 3, type: 'face', content: 'Dhoni.jpeg' },
  { id: 3, type: 'name', content: 'MS Dhoni' },

  { id: 4, type: 'face', content: 'Neeraj.jpeg' },
  { id: 4, type: 'name', content: 'Neeraj Chopra' },

  { id: 5, type: 'face', content: 'Tata.jpg' },
  { id: 5, type: 'name', content: 'Ratan Tata' },

  { id: 6, type: 'face', content: 'Aishwarya.jpeg' },
  { id: 6, type: 'name', content: 'Aishwarya Rai' },
];

const gameBoard = document.getElementById('game-board');
let selectedCards = [];
let matchedCards = [];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createCard(cardData) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = cardData.id;

  // Front = hidden face (emoji), Back = actual face or name
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">🙂</div>
      <div class="card-back">
        ${cardData.type === 'face' 
          ? `<img src="${cardData.content}" style="width: 100%; height: 100%; object-fit: cover;" />`
          : `<span style="font-size: 1rem;">${cardData.content}</span>`
        }
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    if (
      selectedCards.length < 2 &&
      !card.classList.contains('flipped') &&
      !matchedCards.includes(card)
    ) {
      card.classList.add('flipped');
      selectedCards.push(card);

      if (selectedCards.length === 2) {
        checkMatch();
      }
    }
  });

  return card;
}

function checkMatch() {
  const [card1, card2] = selectedCards;
  const id1 = card1.dataset.id;
  const id2 = card2.dataset.id;

  // Match only if the IDs are same and types are different (face-name pair)
  if (id1 === id2 && card1 !== card2) {
    matchedCards.push(card1, card2);
    selectedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      selectedCards = [];
    }, 1000);
  }
}

function setupGame() {
  gameBoard.innerHTML = '';
  const shuffled = shuffle(cards);
  shuffled.forEach(cardData => {
    const card = createCard(cardData);
    gameBoard.appendChild(card);
  });
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US'; // You can change the accent if you want
  speechSynthesis.speak(utterance);
}

function checkMatch() {
  const [card1, card2] = selectedCards;
  const id1 = card1.dataset.id;
  const id2 = card2.dataset.id;

  if (id1 === id2) {
    matchedCards.push(card1, card2);
    speak("Correct!");
    selectedCards = [];

    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        speak("Congratulations! You matched all the cards!");
        showCongratulations();
      }, 500);
    }
    

  } else {
    speak("Try again!");
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      selectedCards = [];
    }, 1000);
  }
}

function showCongratulations() {
  const message = document.getElementById('congrats-message');
  message.style.display = 'block';
}


setupGame();
