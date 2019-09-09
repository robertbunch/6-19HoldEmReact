import React, { Component } from 'react';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';
import './PokerTable.css';

class PokerTable extends Component{
    constructor(){
        super();
        this.deck = new Deck();
        this.deck.create();
        this.deck.shuffle();
        console.log(this.deck.cards);
        this.state = {
            playerHand: [],
            dealerHand: [],
            communityHand: []
        }
    }

    // this method is made by us! Not a "react" method
    // in here we deal the first 4 cards
    prepDeck = ()=>{
        this.deck.create();
        this.deck.shuffle();
        // const burn = this.deck.cards.shift();
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();
        // at this point, this.deck.cards has 48 elements in it
        // because we removed 4
        this.setState({
            playerHand: [card1,card3],
            dealerHand: [card2,card4]
        })
    };

    render(){
        return(
            <div className="the-table col-sm-12">
                <PokerHand cards={this.state.playerHand} />   {/* Player 1 hand */}
                <PokerHand cards={this.state.communityHand} />   {/* Community hand */}
                <PokerHand cards={this.state.dealerHand} />   {/* Player 2 hand */}
                <button onClick={this.prepDeck} className="btn btn-primart">Start</button>
            </div>
        )
    }
}


export default PokerTable