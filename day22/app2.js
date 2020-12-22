
let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

var crypto = require('crypto');
let numGames = 0;
function play(player1, player2, seen){
    let winner = {};
    while (player1.length != 0 && player2.length != 0) {
        //console.log("player1", player1)
        //console.log("player2", player2)

        let cardHand1 = player1.join(",")

        let cardHand2 = player2.join(",")
        if (seen.has(cardHand1) || seen.has(cardHand2)){
            console.log("numGames:", numGames ,"player1 wins")
            // if (numGames == 7787){
            //     let scoring = player1.length
            //     let answer = 0;
            //     console.log(player1)
            //     for (let s of player1) {
            //         answer += scoring * +s
            //         scoring -= 1;
            //     }
            //     process.exit(0)
            // }
            numGames += 1;
            return {cards: player1, winner: 'player1'};
        }
        seen.add(cardHand1) 
        seen.add(cardHand2) 
        

        let card1 = player1.shift();
        let card2 = player2.shift();

        if(player1.length >= card1 && player2.length >= card2){
            let p1 = []
            let p2 = []
            for (let i = 0; i < card1; i++){
                p1.push(player1[i]);
            }
            for (let i = 0; i < card2; i++) {
                p2.push(player2[i]);
            }
            winner = play(p1, p2, new Set())
        }else{
            if (card1 > card2) {
                winner = { winner: 'player1' }
            }else{
                winner = { winner: 'player2' }
            }

        }

        if (winner.winner == 'player1'){
            player1.push(card1);
            player1.push(card2);
        } else {
            player2.push(card2);
            player2.push(card1);
        }
    }
    if (player1.length == 0){
        return { cards: player2, winner: 'player2' };
    }else{
        return { cards: player1, winner: 'player1' };
    }
}

let player1 = [];
let player2 = [];
let currentPlayer = [];
for (let d of dataArray) {
    if (d == "Player 1:") {
        currentPlayer = player1;
        continue;
    } else if (d == "Player 2:") {
        currentPlayer = player2;
        continue;
    } else if (d.length == 0) {
        continue;
    }
    currentPlayer.push(+d)
}

let seen = new Set();

let winner = play(player1, player2, seen)
let answer = 0;
let scoring = winner.cards.length;
console.log(player2)
console.log(winner.cards)
for (let s of winner.cards) {
    answer += scoring * +s
    scoring -= 1;
}
console.log(answer)


