let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let timestamp = +dataArray[0]
let busIDs = dataArray[1].split(",")

let busMap = {}
for (let i = 0; i < busIDs.length; i++){
    if(busIDs[i] == 'x'){
        continue;
    }
    let id = +busIDs[i]
    busMap[id] = i;
}



let minValue = 0;
let runningProduct = 1;
for (const [k, v] of Object.entries(busMap)) {
    while( (minValue + v) % k != 0 ){
        minValue += runningProduct
    }
    runningProduct *= k
}
console.log(minValue)