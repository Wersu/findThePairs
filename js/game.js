import data from './data.js'
import { getTime, startTimer, stopTimer } from './timer.js';
import { showModal } from './ui.js';

const gameContainer = document.getElementById("game-board");

let flippedCards;
let matchedPairs;
let lockBoard;

let currentDifficulty;
let pairCount;
let totalCards;


export function initGame() {
    gameContainer.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;
    lockBoard = false;

    currentDifficulty = getDifficulty();

    pairCount = getPairCountByDifficulty();
    totalCards = pairCount * 2;


    const { columns, cardSize } = calculateGridLayout();

    gameContainer.style.gridTemplateColumns = `repeat(${columns}, ${cardSize}px)`;

    const selectedData = setRandomData();
    let cards = [...selectedData, ...selectedData];
    cards.sort(() => 0.5 - Math.random());

    cards.forEach((data) => {
        const card = createCard(data, cardSize);
        gameContainer.appendChild(card);
    })
    startTimer(updateTimerUI);
}


export function updateLayout() {
    const { columns, cardSize } = calculateGridLayout();

    gameContainer.style.gridTemplateColumns = `repeat(${columns}, ${cardSize}px)`;

    const cards = gameContainer.querySelectorAll(".card");
    cards.forEach(card => {
        card.style.width = `${cardSize}px`;
        card.style.height = `${cardSize}px`;
    });
}

function getDifficulty() {
    const selected = document.querySelector("#difficulty-select .difficulty__selected");
    return selected?.dataset?.value || "easy";
}


function getPairCountByDifficulty() {
    switch (currentDifficulty) {
        case "easy":
            return 12;
        case "medium":
            return 16;
        case "hard":
            return 20;
        default:
            return 12;
    }
}

function setRandomData() {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, pairCount);
}

function createCard(data, cardSize) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = data.name;

    card.style.width = `${cardSize}px`;
    card.style.height = `${cardSize}px`;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${data.img}" alt="${data.name}" />
            </div>
            <div class="card-back"></div>
        </div>
        `;

    card.addEventListener("click", () => flipCard(card));
    
    return card;
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
        setTimeout(() => {
            card1.classList.add('card--matched');
            card2.classList.add('card--matched');
        }, 500);
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === pairCount) {
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
    const timer = document.getElementById("timer");
    if (!timer) return;

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timer.textContent = `${formattedTime}`;
}


function calculateGridLayout() {
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.85;

    const gapPx = parseInt(getComputedStyle(gameContainer).gap || 16);
    const maxCardSize = (window.innerWidth) > 600 ? 150 : 80;
    const minCardSize = window.innerWidth <= 600 ? 50 : 70;

    let bestLayout = { columns: 1, cardSize: maxCardSize };
    let bestScore = -Infinity;

    for (let cols = 1; cols <= totalCards; cols++) {
        if (totalCards % cols !== 0) continue;

        const rows = Math.ceil(totalCards / cols);
        const totalGapX = gapPx * (cols - 1);
        const totalGapY = gapPx * (rows - 1);

        const cardWidth = Math.floor((containerWidth - totalGapX) / cols);
        const cardHeight = Math.floor((containerHeight - totalGapY) / rows);
        const cardSize = Math.min(cardWidth, cardHeight);
        const totalHeight = rows * cardSize + totalGapY;

        if (cardSize < minCardSize) continue;
        if (totalHeight > containerHeight) continue;

        let score = cardSize;

        if (window.innerWidth <= 425) {
            if (cols < rows) {
                score += 50;
            }
        } else {
            const ratioDiff = Math.abs(cols - rows);
            score -= ratioDiff * 2;
        }

        if (score > bestScore) {
            bestScore = score;
            bestLayout = {
                columns: cols,
                cardSize: Math.min(cardSize, maxCardSize),
            };
        }
    }

    return bestLayout;
}

export function goToNextDifficulty() {
    const difficulties = ["easy", "medium", "hard"];
    const selected = document.querySelector("#difficulty-select .difficulty__selected");
    const options = document.querySelectorAll("#difficulty-select .difficulty__option");

    const current = selected?.dataset?.value || "easy";
    const currentIndex = difficulties.indexOf(current);
    const nextIndex = Math.min(currentIndex + 1, difficulties.length - 1);
    const nextValue = difficulties[nextIndex];

    const nextOption = Array.from(options).find(opt => opt.dataset.value === nextValue);

    if (nextOption && selected) {
        selected.textContent = nextOption.textContent;
        selected.dataset.value = nextValue;
    }

    currentDifficulty = nextValue;
}