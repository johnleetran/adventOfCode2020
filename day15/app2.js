let fs = require('fs')

let startingNumbers = [5, 2, 8, 16, 18, 0, 1]
let findPos = 30000000
let spoken = {}

for (let i = 0; i < 30000000; i++){
    spoken[i] = new Array().fill(0);
}

function addToSpoken(num, turn){
    if (num in spoken) {
        if (spoken[num].length == 2){
            spoken[num].shift();
        }
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
for (let i = startingNumbers.length + 1; i <= findPos; i++){
    // if (i % 100000 == 0){
    //     console.log(i / findPos)
    // }
    if (first){
        first = false;
        curNumber = 0;
        addToSpoken(0, i)
    } else if (curNumber in spoken){
        let lastSpoken = spoken[curNumber]
        if (lastSpoken.length == 1){
            curNumber = 0;
        }else{
            curNumber = lastSpoken[1] - lastSpoken[0];
        }
        addToSpoken(curNumber, i)
    }else{
        curNumber = 0;
        addToSpoken(0, i)
    }
    if (i == findPos){
        console.log(curNumber)

    }
}
//console.log(spoken['2020'])

