import data from './data.js'
import { getTime, startTimer, stopTimer } from './timer.js';
import { showModal } from './ui.js';

const game = document.getElementById("game-board");


let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;


export function initGame(pairCount = 12) {
    game.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;
    lockBoard = false;

    const totalCards = pairCount * 2;
    const { columns, cardSize } = calculateGridLayout(totalCards);

    game.style.gridTemplateColumns = `repeat(${columns}, ${cardSize}px)`;

    const selected = setRandomData(pairCount);
    let cards = [...selected, ...selected]
    cards.sort(() => 0.5 - Math.random());

    cards.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = symbol.name;

        card.style.width = `${cardSize}px`;
        card.style.height = `${cardSize}px`;

        card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${symbol.img}" alt="${symbol.name}" />
            </div>
            <div class="card-back"></div>
        </div>
    `;

        card.addEventListener("click", () => flipCard(card));
        game.appendChild(card);
    })
    startTimer(updateTimerUI);
}

function setRandomData(pairCount) {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, pairCount);
}

function flipCard(card) {
    if (lockBoard || flippedCards.includes(card) || card.classList.contains('card--matched')) return;

    card.classList.add('card--flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.name == card2.dataset.name) {
        card1.classList.add('card--matched');
        card2.classList.add('card--matched');
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === game.childElementCount / 2) {
            stopTimer();
            setTimeout(() => showModal(getTime()), 600);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove('card--flipped');
            card2.classList.remove('card--flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

function updateTimerUI(seconds) {
    const el = document.getElementById("timer");
    if (el) el.textContent = `Время: ${seconds} сек`;
}


function calculateGridLayout(totalCards) {
    const containerWidth = document.getElementById("game-board").offsetWidth || window.innerWidth * 0.9;
    const maxCardSize = (window.innerWidth * 0.8) > 768 ? 150 : 80;

    let bestLayout = { columns: 1, cardSize: maxCardSize };
    let minRatioDiff = Infinity;

    for (let cols = 1; cols <= totalCards; cols++) {
        if (totalCards % cols !== 0) continue;

        const rows = Math.ceil(totalCards / cols);
        const cardSize = Math.floor(containerWidth / cols);

        const ratioDiff = Math.abs(cols - rows);

        if (window.innerWidth > 768 ? ratioDiff <= minRatioDiff : ratioDiff < minRatioDiff) {
            minRatioDiff = ratioDiff;
            bestLayout = { columns: cols, cardSize: cardSize > maxCardSize ? maxCardSize : cardSize };
        }

    }

    return bestLayout;
}

// function calculateGridLayout(totalCards) {
//   const container = document.getElementById("game-board");
//   const containerWidth = container.offsetWidth || window.innerWidth * 0.9;
//   const containerHeight = window.innerHeight; // оставим 20% на заголовки/поля/кнопки

//   const maxCardSize = window.innerWidth > 768 ? 150 : 80;

//   let bestLayout = { columns: 1, cardSize: maxCardSize };
//   let minRatioDiff = Infinity;

//   for (let cols = 1; cols <= totalCards; cols++) {
//     if (totalCards % cols !== 0) continue;
//     const rows = Math.ceil(totalCards / cols);

//     const cardWidth = Math.floor(containerWidth / cols);
//     const cardHeight = Math.floor(containerHeight / rows);
//     const cardSize = Math.min(cardWidth, cardHeight, maxCardSize);

//     const ratioDiff = Math.abs(cols - rows);

//     if (cardSize <= 20) continue; // слишком маленькие карточки — пропускаем

//     if (ratioDiff < minRatioDiff) {
//       minRatioDiff = ratioDiff;
//       bestLayout = { columns: cols, cardSize };
//     }
//   }

//   return bestLayout;
// }