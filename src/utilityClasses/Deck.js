import { tsMethodSignature } from "@babel/types";

// No extend because this is not a component
// This is just some OOP JavaScript
class Deck{
    constructor(){
        // no need to call super, because... no extends
        this.cards = [];
    }

    create(){
        // I make a new deck of cards from nothing! 
        console.log("Here's a new deck")
        // A card has a number and a suit
        // two loops: one for suit, one for value
        const suits = ['h','s','d','c'];
        suits.forEach((suit)=>{
            // inner loop for the value
            for(let c = 1; c <=13; c++){
                // push onto this.deck, c + suit
                this.cards.push(c+suit);
            }
        })
    }

    shuffle(){
        // I take a new deck of cards, and shuffle the crap out of them
        console.log("Shuffling");
        // the deck is inside of this.deck
        // to shuffle: swap 2 indicies in the array, many, many times
        for(let i = 0; i < 1000000; i++){
            let rand1 = Math.floor(Math.random() * 52);
            let rand2 = Math.floor(Math.random() * 52);
            // Store the value in this.deck[rand1] in a temp var
            let temp = this.cards[rand1];
            // put the value of card 2 in card 1
            this.cards[rand1] = this.cards[rand2]
            // grab teh value of card 1 that we saved in temp, in card 2
            this.cards[rand2] = temp;
        }
    }

}

export default Deck;