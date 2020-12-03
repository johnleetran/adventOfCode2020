let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

function tokenizeData(data) {
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

function meetsMin(tokens) {
    if (tokens.password[tokens.min - 1] == tokens.letter){
        return 1;
    }
    return 0;
}

function meetsMax(tokens) {
    if (tokens.password[tokens.max - 1] == tokens.letter) {
        return 1;
    }
    return 0;
}

function isValid(tokens) {
    if ((tokens.password[tokens.min - 1] != tokens.password[tokens.max - 1]) && (meetsMin(tokens) == 1 || meetsMax(tokens) == 1) ) {
        return 1;
    } else {
        return 0;
    }
}

let validCount = 0;
for (let d of dataArray) {
    console.log(d)
    let tokens = tokenizeData(d)
    console.log(tokens)
    let value = isValid(tokens);
    console.log(value)
    validCount += value;
}
console.log(validCount)
