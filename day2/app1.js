let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

function tokenizeData(data){
    let min = parseInt(data.split("-")[0])
    let max = parseInt(data.split("-")[1])
    let letter = data.split(" ")[1].replace(":", " ").trim()
    let password = data.split(":")[1].trim()
    return {
        min: min,
        max: max,
        letter: letter,
        password: password
    }
}

function meetsMin(tokens){
    let count = 0;
    for (let p of tokens.password){
        if(p == tokens.letter){
            count += 1;
        }
    }
    if(count >= tokens.min){
        return 1;
    }
    return 0;
}

function meetsMax(tokens) {
    let count = 0;
    for (let p of tokens.password) {
        if (p == tokens.letter) {
            count += 1;
        }
    }
    if (count <= tokens.max) {
        return 1;
    }
    return 0;
}

function isValid(tokens){
    if (meetsMin(tokens) == 1 && meetsMax(tokens) == 1){
        return 1;
    }else{
        return 0;
    }
}

let validCount = 0;
for(let d of dataArray){
    console.log(d)
    let tokens = tokenizeData(d)
    console.log(tokens)
    let value = isValid(tokens);
    console.log(value)
    validCount += value;
}
console.log(validCount)
