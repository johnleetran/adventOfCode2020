let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let blackTiles = {};

for(let i=0; i<dataArray.length; i++){
    let line = dataArray[i];
    let x = 0;
    let y = 0;
    let z = 0;
    while(line.length > 0){
        //console.log(line)

        if(line.startsWith('w')){
            x -= 1;
            y += 1;
            line = line.slice(1, line.length);
        } else if (line.startsWith('sw')) {
            x -= 1;
            z += 1;
            line = line.slice(2, line.length);
        } else if (line.startsWith('se')) {
            y -= 1;
            z += 1;
            line = line.slice(2, line.length);
        } else if (line.startsWith('e')) {
            x += 1;
            y -= 1;
            line = line.slice(1, line.length);
        } else if (line.startsWith('ne')) {
            x += 1;
            z -= 1;
            line = line.slice(2, line.length);
        } else if (line.startsWith('nw')) {
            y += 1;
            z -= 1;
            line = line.slice(2, line.length);
        }else{
            console.error("bad parsing", line);
            process.exit(1);
        }
    }
    let coord = `${x},${y},${z}`
    if (coord in blackTiles) {
        blackTiles[coord] = false;
    } else if (!(coord in blackTiles)) {
        blackTiles[coord] = true;
    }
}

let blackCount = 0;
for(let [f, v] of Object.entries(blackTiles)){
    if(v){
        blackCount += 1;
    }
}
console.log(blackCount)

let neighbors = [
    [-1,1,0],
    [-1,0,1],
    [0,-1,1],
    [1,-1,0],
    [1,0,-1],
    [0,1,-1]
]
let b = 0;
for(let i=0; i<100; i++){
    let newBlackTiles = {}
    let copyBlackTiles = {};
    for (const [coord, value] of Object.entries(blackTiles)) {
        copyBlackTiles[coord] = value;
        for (let adj of neighbors) {
            let realCoord = coord.split(",").map(x => +x);
            let nCoords = `${realCoord[0] + adj[0]},${realCoord[1] + adj[1]},${realCoord[2] + adj[2]}`
            copyBlackTiles[nCoords] = false;
        }
    }

    for (const [coord, value] of Object.entries(copyBlackTiles)) {
        let realCoord = coord.split(",").map(x => +x);
        let numOfBlackNeighbors = 0;
        for(let adj of neighbors){
            let nCoords = `${realCoord[0] + adj[0]},${realCoord[1] + adj[1]},${realCoord[2] + adj[2]}`
            if (blackTiles[nCoords]){
                numOfBlackNeighbors += 1
            }
        }
        if (blackTiles[coord] && (numOfBlackNeighbors == 1 || numOfBlackNeighbors == 2)){
            newBlackTiles[coord] = true
        }
        if (!blackTiles[coord] && (numOfBlackNeighbors == 2)) {
            newBlackTiles[coord] = true
        }
    }
    // for (let [field, value] of Object.entries(newBlackTiles)){
    //     blackTiles[field] = value
    // }
    blackTiles = newBlackTiles;
    //count
    blackCount = 0;
    for (let [f, v] of Object.entries(blackTiles)) {
        if (v) {
            blackCount += 1;
        }
    }
    console.log(blackCount)
}


