const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let movements = 0;
let ponts = 0;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    hasFlippedCard = false;
    secondCard = this;
    checkForMath();
}

function setPont(valor){
    document.getElementById("ponts").innerHTML = valor;
    ponts = valor;
    console.log(valor);
    console.log(ponts);

}
function setMovements(valor){
    document.getElementById("movements").innerHTML = valor;
    movements = valor;
}

function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        setPont(ponts+10);
        setMovements(movements+1);
        return;
    }else{
        unflipCards();
        setMovements(movements+1);
    }
    
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard,lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/* sortear posiçoes cartas */
(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random()*12);
        card.style.order = randomPosition;
    })
})();/* essa função é renderizada assim que é chamada */


function restart(){
    cards.forEach((card)=>{
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    resetBoard();
    setMovements(0);
}

/*adiciona e remove a class flip, quando clicar*/
cards.forEach((card)=>{
    card.addEventListener('click', flipCard);
})
