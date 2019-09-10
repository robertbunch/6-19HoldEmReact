import React, { Component } from 'react';
import PokerHand from './PokerHand';
import Deck from '../utilityClasses/Deck';
import './PokerTable.css';

class PokerTable extends Component{
    constructor(){
        super();
        this.deck = new Deck(); //make a new Deck object 
        this.deck.create(); // create a deck from the Deck object
        this.deck.shuffle(); // shuffle the deck
        console.log(this.deck.cards);
        this.state = {
            playerHand: ['deck','deck'], //this is the player array of cards
            dealerHand: ['deck','deck'],
            communityHand: ['deck','deck','deck','deck','deck'],
            wager: 0,
            bankroll: 100
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

    bet = (amount)=>{
        // NO NO NO NO NO NO NO NO NO
        // this.state.wager += amount;
        const newWager = this.state.wager + amount;
        const newBankRoll = this.state.bankroll - amount;
        if(newBankRoll >= 0){
            this.setState({
                wager: newWager,
                bankroll: newBankRoll
            })
        }else{
            this.setState({
                msg: "You don't have enough money!"
            },this.clearMsg)
        }
    }

    clearMsg = ()=>{
        setTimeout(()=>{
            this.setState({
                msg:""
            })
        },2000)
    }


    render(){
        return(
            <div className="the-table col-sm-12">
                <div className="col-sm-12 text-center the-numbers">
                    <div className="col-sm-3 col-sm-offset-3">
                        Current Pot: ${this.state.wager}
                    </div>
                    <div className="col-sm-3">
                        Bankroll: ${this.state.bankroll}
                    </div>
                </div>
                <div className="player-message">
                    {this.state.msg}                    
                </div>

                <PokerHand cards={this.state.playerHand} />   {/* Player 1 hand */}
                <PokerHand cards={this.state.communityHand} />   {/* Community hand */}
                <PokerHand cards={this.state.dealerHand} />   {/* Player 2 hand */}
                <div className="col-sm-12 buttons">
                    <button onClick={this.prepDeck} className="btn btn-primary">Deal</button>
                    <button onClick={()=>{this.bet(5)}} className="btn btn-success">Bet 5</button>
                    <button onClick={this.prepDeck} className="btn btn-warning">Check</button>
                    <button onClick={this.prepDeck} className="btn btn-danger">Fold</button>
                </div>
            </div>
        )
    }
}


export default PokerTable