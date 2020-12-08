let fs = require("fs")

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let linesVisited = [];
linesVisited = linesVisited.fill(false)

function parseCode(line) {
    let code = line.split(" ");
    let opp = code[0];
    let value = code[1];
    return {
        opp: opp,
        value: parseInt(value)
    }
}

let globalAcc = 0;
for (let i = 0; i < dataArray.length; i++) {
    globalAcc = 0;
    linesVisited = linesVisited.fill(false)
    let tmpDataArray = JSON.parse(JSON.stringify(dataArray));
    let code = parseCode(tmpDataArray[i]);
    if(code.opp == 'nop'){
        tmpDataArray[i] = tmpDataArray[i].replace('nop', 'jmp')
    } else if(code.opp == 'jmp'){
        tmpDataArray[i] = tmpDataArray[i].replace('jmp', 'nop')
    }
    for (let j = 0; j < tmpDataArray.length; j++){
        let d = tmpDataArray[j];
        let code = parseCode(d);
        console.log(code)
        let lineOfCode = j;
        if (linesVisited[j] == true) {
            break;
        }
        switch (code.opp) {
            case 'acc':
                globalAcc += code.value;
                break;
            case 'jmp':
                j += code.value - 1;
                break;
            case 'nop':
                break;
        }
        linesVisited[lineOfCode] = true;
    }
    if (linesVisited[tmpDataArray.length - 1] == true){
        console.log( "The ansswer: ",globalAcc);
        break;
    }
}

