
let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let player1 = [];
let player2 = [];
let currentPlayer = [];
for(let d of dataArray){
    if(d == "Player 1:"){
        currentPlayer = player1;
        continue;
    }else if(d == "Player 2:"){
        currentPlayer = player2;
        continue;
    }else if(d.length == 0){
        continue;
    }
    currentPlayer.push(+d)
}

while(player1.length != 0 && player2.length != 0 ){
    let card1 = player1.shift();
    let card2 = player2.shift();
    let max = Math.max(card1, card2);
    let min = Math.min(card1, card2);
    if(card1 > card2){
        player1.push(max);
        player1.push(min);
    }else{
        player2.push(max);
        player2.push(min);
    }
}

let winner = []
if(player1.length == 0){
    winner = player2
}else{
    winner = player1;
}

let answer = 0;
let scoring = winner.length;
for (let s of winner){
    answer += scoring * +s
    scoring -= 1;
}

console.log(answer)