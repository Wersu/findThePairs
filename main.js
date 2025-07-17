import data from './data.js'

const game = document.getElementById("game-board");

let cards = [...data, ...data];
cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let lockBoard = false;

cards.forEach((symbol, index) => {
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


function flipCard (card) {
    if (lockBoard || flippedCards.includes(card) || card.classList.contains('matched')) return;

    card.classList.add('flip');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch () {
    const [card1, card2] = flippedCards;
    if (card1.dataset.name == card2.dataset.name) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
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


