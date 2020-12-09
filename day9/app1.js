let fs = require("fs")

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n").map(x => +x);

let preamble = 5;
let startIndex = 0;
for (let i = preamble; i < dataArray.length - preamble; i++){
    let endIndex = startIndex + preamble;
    let window = dataArray.slice(startIndex, endIndex).map(x => +x);
    let target = parseInt(dataArray[i])
    let hash = {};
    let hasSolution = false;
    for(let j = 0; j < window.length; j++){
        for(let k = 0; k < window.length; k++){
            if(target != window[k] && target != window[j] && (window[k] + window[j] == target)){
                hasSolution = true
            }
        }
    }
    if (hasSolution == false){
        console.log(dataArray[i])
        break;
    }
    startIndex += 1;
}