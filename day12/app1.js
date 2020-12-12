let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let directionMap = {
    0: 'E',
    90: 'N',
    180: 'W',
    270: 'S'
}

let currentDirection = 'E';
let currentEastWest = 0;
let currentNorthSouth = 0;
let currentDegrees = 0;
for(let d of dataArray){
    let heading = d[0]
    let amount = parseInt(d.slice(1,d.length))

    if (heading == 'R'){
        currentDegrees = (currentDegrees - amount) % 360
        currentDegrees = (360 + currentDegrees) % 360
        currentDirection = directionMap[currentDegrees]
        continue;
    }else if(heading == 'L'){
        currentDegrees = (currentDegrees + amount) % 360
        currentDegrees = (360 + currentDegrees) % 360
        currentDirection = directionMap[currentDegrees]
        continue;
    }

    if (heading == 'F'){
        if (currentDirection == 'E'){
            currentEastWest += amount
        } else if (currentDirection == 'W'){
            currentEastWest -= amount
        } else if (currentDirection == 'N'){
            currentNorthSouth += amount
        } else if (currentDirection == 'S') {
            currentNorthSouth -= amount
        }
    }else{
        if (heading == 'E') {
            currentEastWest += amount
        } else if (heading == 'W') {
            currentEastWest -= amount
        } else if (heading == 'N') {
            currentNorthSouth += amount
        } else if (heading == 'S') {
            currentNorthSouth -= amount
        }
    }
    let answer = Math.abs(currentEastWest) + Math.abs(currentNorthSouth)
    console.log(currentEastWest, currentNorthSouth)
}

console.log(currentEastWest, currentNorthSouth)
let answer = Math.abs(currentEastWest) + Math.abs(currentNorthSouth) 
console.log(answer)