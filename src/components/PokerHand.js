import React from 'react';
import Card from './Card';

// my job is to show a hand of cards
function PokerHand(props){
    console.log(props);
    let hand = props.cards.map((card,i)=>{
        return(
            <Card key={i} card={card} />
        )
    })
    return(
        // A poker hand is made up of cards!
        <div className="poker-hand col-sm-12">
            {hand}
        </div>
    )
}

export default PokerHand;