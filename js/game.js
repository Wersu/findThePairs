import data from './data.js'
import { getTime, startTimer, stopTimer } from './timer.js';
import { showModal } from './ui.js';

const game = document.getElementById("game-board");


let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;


export function initGame(pairCount = 12, columns = 4) {
    game.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;
    lockBoard = false;

    game.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

    const selected = setRandomData(pairCount);
    let cards = [...selected, ...selected]
    cards.sort(() => 0.5 - Math.random());

    cards.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = symbol.name;

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

function setRandomData (pairCount) {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, pairCount);
}

function flipCard(card) {
    if (lockBoard || flippedCards.includes(card) || card.classList.contains('matched')) return;

    card.classList.add('flip');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.name == card2.dataset.name) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === game.childElementCount / 2) {
            stopTimer();
            setTimeout(() => showModal(getTime()), 600);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

function updateTimerUI(seconds) {
  const el = document.getElementById("timer");
  if (el) el.textContent = `Время: ${seconds} сек`;
}

