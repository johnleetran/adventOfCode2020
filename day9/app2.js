let fs = require("fs")

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n").map(x => +x);

let preamble = 25;
let startIndex = 0;

let badNum;
for (let i = preamble; i < dataArray.length - preamble; i++) {
    let endIndex = startIndex + preamble;
    let window = dataArray.slice(startIndex, endIndex).map(x => +x);
    let target = parseInt(dataArray[i])
    let hash = {};
    let hasSolution = false;
    for (let j = 0; j < window.length; j++) {
        for (let k = 0; k < window.length; k++) {
            if (target != window[k] && target != window[j] && (window[k] + window[j] == target)) {
                hasSolution = true
            }
        }
    }
    if (hasSolution == false) {
        badNum = dataArray[i];
        console.log(dataArray[i])
        break;
    }
    startIndex += 1;
}

for (let i = 0; i < dataArray.length; i++) {
    let sum = 0;
    let found = false;
    let max = -Infinity;
    let min = Infinity
    for (let j = i; j < dataArray.length; j++) {
        sum += dataArray[j]
        if (min > dataArray[j]){
            min = dataArray[j]
        }
        if (max < dataArray[j]){
            max = dataArray[j]
        }

        if (sum == badNum) {
            found = true;
            console.log(i, j)
            console.log(max + min)
            break;
        }
    }
    if (found){
        break;
    }
}