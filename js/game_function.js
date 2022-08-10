class MemoTest {
    constructor() {
        this.canPlay = false;

        this.card1 = null;
        this.card2 = null;

        this.availableImg = [1, 2, 3, 4, 5, 6];
        this.orderForNewGame = [];
        this.cards = Array.from(document.querySelectorAll("figure"))
        
        this.maxPair = this.availableImg.length;
        


        this.start()
        
    }

    start () {
        this.matchPair = 0;
        this.setOrder();
        this.setImages();
        this.openCards();
    }

    setOrder(){
        this.orderForNewGame = this.availableImg.concat(this.availableImg);
        this.orderForNewGame.sort(() => Math.random() -0.5)
    }

    setImages() {
        for (const key in this.cards) {
            
            const card = this.cards[key];
            const image = this.orderForNewGame[key];
            const imgHTML = card.children[1].children[0];

            card.dataset.image = image;
            imgHTML.src = `./img/${image}.png`;
        }
    }
    
    openCards() {
        this.cards.forEach(card => card.classList.add('open'));

        setTimeout(() => {
            this.closeCards()
        }, 1500)
    }

    closeCards() {
        this.cards.forEach(card => card.classList.remove('open'));
        this.clickCardsEvents();
        this.canPlay = true;
    }

    clickCardsEvents() {
        this.cards.forEach( card => card.addEventListener('click', this.flipCard.bind(this)));
    }

    removeClickCardsEventes() {
        this.cards.forEach( card => card.removeEventListener('click', this.flipCard));
    }

    flipCard(e) {
        const clickedCard = e.target.closest('figure');
        
        if(this.canPlay && !clickedCard.classList.contains('open')) {
            clickedCard.classList.add('open');
            this.foundPair(clickedCard.dataset.image);
        }        
    }

    foundPair(datasetValue) {
        !this.card1 ? this.card1 = datasetValue : this.card2 = datasetValue;
        if(this.card1 && this.card2) {
            if(this.card1 == this.card2) {
                this.canPlay = false;
                setTimeout( () => this.checkIfWonTheGame(),1000);
            } else {
                this.canPlay = false;
                setTimeout(this.closeNotMatchCards.bind(this),800)                
            }
        }        
    }

    closeNotMatchCards(){
        const firstCard = document.querySelector(`figure.open[data-image='${this.card1}']`)
        const secondCard = document.querySelector(`figure.open[data-image='${this.card2}']`)

        firstCard.classList.remove('open');
        secondCard.classList.remove('open');
        
        this.card1 = null;
        this.card2 = null;

        this.canPlay = true;
    }
 
    checkIfWonTheGame() {
        this.matchPair++;

        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;

        if(this.maxPair == this.matchPair) {
            swal({
                title: "¡Felicitaciones, ganaste!",
                text: "¿Queres seguir jugando?",               
                buttons: ['Neh', 'Juro solemnemente que si']
            }).then(value=>{
                if(value == true) {
                    this.newGame();
                    this.start()
                } else {                    
                    swal({
                        title: "¿Sabías que solo los muggles contestan 'no' a la pregunta anterior?",
                        text: "Volvé a pensarlo... ¿queres jugar de nuevo?",
                        buttons: ['Ya te dije que no', 'Bueno, juguemos']
                        }).then(value=>{
                            if(value == true) {
                            this.newGame();
                            this.start();
                            } else {
                                window.location = "no_game.html";
                            }
                })                
                }
            });               
        }          
            
    }

    newGame() {
        this.removeClickCardsEventes();
        this.cards.forEach(card => card.classList.remove('open'));
    }
}

    

document.addEventListener("DOMContentLoaded", () => {
   
    new MemoTest();
});