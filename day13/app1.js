let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let timestamp = +dataArray[0]
let busIDs = dataArray[1].split(",")

let scheduleMin = {}
let minBusTime = Infinity 
for(let i=0; i< busIDs.length; i++){
    if (busIDs[i] == 'x'){
        continue;
    }
    let id = +busIDs[i]
    let interval = id - ( timestamp % id )
    scheduleMin[id] = interval;
}
console.log(scheduleMin)
let min = Infinity;
let busId = -1;
for (const [key, value] of Object.entries(scheduleMin) ){
    if(value < min){
        min = value
        busId = key
    }
}
console.log(min, busId)
console.log(min * busId)