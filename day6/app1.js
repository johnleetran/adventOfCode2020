let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n\n");

function countYes(data){
    let answerCounter = {}
    let personAnswer = data.split("\n");
    let numPeople = personAnswer.length;

    for (let p of personAnswer) {
        for(let pp of p){
            if (!answerCounter[pp]) {
                answerCounter[pp] = 1;
            } else {
                answerCounter[pp] += 1;
            }
        }
    }

    let numYes = 0;
    for (const [key, value] of Object.entries(answerCounter)) {
        if (numPeople == answerCounter[key])
            numYes += 1
    }

    return numYes;
}

let yesCount = 0;
for (let d of dataArray) {
    yesCount += countYes(d)
}
console.log(yesCount)