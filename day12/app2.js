let fs = require('fs')

function RotateWaypoint(degrees){
    // foreach(var _ in Enumerable.Range(0, degrees / 90))
    // (WaypointX, WaypointY) = (-WaypointY, WaypointX);
    for (let i = 0; i < degrees/90; i++){
        [WaypointX, WaypointY] = [-WaypointY, WaypointX]
    }
}

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
let WaypointX = 10;
let WaypointY = 1;
for(let d of dataArray){
    let heading = d[0]
    let amount = parseInt(d.slice(1,d.length))

    if (heading == 'R'){
        // currentDegrees = (currentDegrees - amount) % 360
        // currentDegrees = (360 + currentDegrees) % 360
        RotateWaypoint(360 - amount)
        currentDirection = directionMap[currentDegrees]
        continue;
    }else if(heading == 'L'){
        // currentDegrees = (currentDegrees + amount) % 360
        // currentDegrees = (360 + currentDegrees) % 360
        RotateWaypoint(amount)
        currentDirection = directionMap[currentDegrees]
        continue;
    }

    if (heading == 'F'){
            currentEastWest += WaypointX * amount
            currentNorthSouth += WaypointY * amount
    }else{
        if (heading == 'E') {
            WaypointX += amount
        } else if (heading == 'W') {
            WaypointX -= amount
        } else if (heading == 'N') {
            WaypointY += amount
        } else if (heading == 'S') {
            WaypointY -= amount
        }
    }
    let answer = Math.abs(currentEastWest) + Math.abs(currentNorthSouth)
    console.log(currentEastWest, currentNorthSouth)
}

console.log(currentEastWest, currentNorthSouth)
let answer = Math.abs(currentEastWest) + Math.abs(currentNorthSouth) 
console.log(answer)