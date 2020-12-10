let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n").map(x => +x);

let currentJolt = 0;
let diff1 = 0;
let diff2 = 0;
let diff3 = 0;
let maxAdapterValue = Math.max(...dataArray);

let done = false;
while (true){
    let diffJoltIndex1 = dataArray.indexOf(currentJolt + 1)
    let diffJoltIndex2 = dataArray.indexOf(currentJolt + 2)
    let diffJoltIndex3 = dataArray.indexOf(currentJolt + 3)

    if (diffJoltIndex1 != -1) {
        diff1 += 1;
        currentJolt = dataArray[diffJoltIndex1]
    } else if (diffJoltIndex2 != -1){
        diff2 += 1;
        currentJolt = dataArray[diffJoltIndex2]
    } else if (diffJoltIndex3 != -1){
        diff3 += 1;
        currentJolt = dataArray[diffJoltIndex3]
    }
    if (done){
        diff3 += 1;
        break;
    }
    if (maxAdapterValue == currentJolt){
        done = true
    }
}
console.log(diff1, diff2, diff3)
console.log(diff1 * diff3)