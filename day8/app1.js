let fs = require("fs")

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let linesVisited = [];
linesVisited = linesVisited.fill(false)

function parseCode(line){
    let code = line.split(" ");
    let opp = code[0];
    let value = code[1];
    return {
        opp: opp,
        value: parseInt(value)
    }
}

let globalAcc = 0;
for(let i =0; i < dataArray.length; i++){
    let d = dataArray[i];
    let code = parseCode(d);
    console.log(code)
    let lineOfCode = i;
    if (linesVisited[i] == true){
        break;
    }
    switch (code.opp){
        case 'acc':
            globalAcc += code.value;
            break;
        case 'jmp':
            i += code.value - 1;
            break;
        case 'nop':
            break;
    }
    linesVisited[lineOfCode] = true;
}

console.log(globalAcc)