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

    checkHandRank = ()=>{
        // ['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']
        let playerPlusComm = [...this.state.playerHand,...this.state.communityHand]
        let dealerPlusComm = [...this.state.dealerHand,...this.state.communityHand]
        
        
        
        const playerhandRank = window.Hand.solve(playerPlusComm);
        const dealerHandRank = window.Hand.solve(dealerPlusComm);
        console.log(playerhandRank);
        console.log(dealerHandRank);
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
            dealerHand: [card2,card4],
            communityHand: ['deck','deck','deck','deck','deck']
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

    // Check calls to draw a new community card.
    // 1. 3 cards (flop), 2. 1 card (turn), 3. 1 card (river)
    check = ()=>{
        // console.log("User clicked check");
        // We do not want to mutate or change state
        // thats reacts job. Instead, we make a copy
        // do stuff to the copy, and hand teh copy to setState
        let communityNewHand = [...this.state.communityHand];
        if(communityNewHand[0] === 'deck'){
            // this must be the flop
            communityNewHand = [
                this.deck.cards.shift(),
                this.deck.cards.shift(),
                this.deck.cards.shift(),
            ]
        }else{
            // its not the flop. we know because thers alreadyt a card in slot 1
            communityNewHand.push(this.deck.cards.shift());
        }
        
        if(communityNewHand.length === 5){
            // all cards are dealt
            this.checkHandRank()
        }

        this.setState({
            communityHand: communityNewHand
        });
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
                    <button onClick={this.check} className="btn btn-warning">Check</button>
                    <button onClick={this.prepDeck} className="btn btn-danger">Fold</button>
                </div>
            </div>
        )
    }
}


export default PokerTable