let fs = require('fs')

function RotateWaypoint(degrees){
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

let currentEastWest = 0;
let currentNorthSouth = 0;
let WaypointX = 10;
let WaypointY = 1;
for(let d of dataArray){
    let heading = d[0]
    let amount = parseInt(d.slice(1,d.length))

    if (heading == 'R'){
        RotateWaypoint(360 - amount)
        continue;
    }else if(heading == 'L'){
        RotateWaypoint(amount)
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
}

console.log(currentEastWest, currentNorthSouth)
let answer = Math.abs(currentEastWest) + Math.abs(currentNorthSouth) 
console.log(answer)