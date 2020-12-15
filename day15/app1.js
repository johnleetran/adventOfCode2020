let fs = require('fs')

let startingNumbers = [5, 2, 8, 16, 18, 0, 1]

let spoken = {}

function addToSpoken(num, turn){
    if (num in spoken) {
        spoken[num].push(turn)
    } else {
        spoken[num] = [turn]
    }
}

for(let i=0; i<startingNumbers.length; i++){
    addToSpoken(startingNumbers[i], i + 1)
}

let curNumber = startingNumbers[startingNumbers.length - 1];
let first =true;
for (let i = startingNumbers.length + 1; i<=2020; i++){
    if (first){
        first = false;
        curNumber = 0;
        addToSpoken(0, i)
    } else if (curNumber in spoken){
        let lastSpoken = spoken[curNumber]
        if (lastSpoken.length == 1){
            curNumber = 0;
        }else{
            curNumber = lastSpoken[lastSpoken.length - 1] - lastSpoken[lastSpoken.length - 2];
        }
        addToSpoken(curNumber, i)
    }else{
        curNumber = 0;
        addToSpoken(0, i)
    }
    if (i == 2020){
        console.log(curNumber)
    }
}
//console.log(spoken['2020'])

