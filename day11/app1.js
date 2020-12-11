let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

function shouldOccupy(seatMap, i, j, numRow, numCol) {    
    let pos0 = seatMap[i - 1][j - 1];
    let pos1 = seatMap[i - 1][j];
    let pos2 = seatMap[i - 1][j + 1];
    let pos3 = seatMap[i][j - 1];
    let pos4 = seatMap[i][j];
    let pos5 = seatMap[i][j + 1];
    let pos6 = seatMap[i + 1][j - 1];
    let pos7 = seatMap[i + 1][j];
    let pos8 = seatMap[i + 1][j + 1];

    let seatState = [
        pos0,
        pos1,
        pos2,
        pos3,
        //pos4,
        pos5,
        pos6,
        pos7,
        pos8,
    ]
    let adjCount = 0;
    for (let a of seatState){
        if(a == '#'){
            adjCount += 1;
        }
    }

    return (pos4 == 'L' && adjCount == 0);
}

function shouldVacate(seatMap, i, j, numRow, numCol) {
    let pos0 = seatMap[i - 1][j - 1];
    let pos1 = seatMap[i - 1][j];
    let pos2 = seatMap[i - 1][j + 1];
    let pos3 = seatMap[i][j - 1];
    let pos4 = seatMap[i][j];
    let pos5 = seatMap[i][j + 1];
    let pos6 = seatMap[i + 1][j - 1];
    let pos7 = seatMap[i + 1][j];
    let pos8 = seatMap[i + 1][j + 1];

    let seatState = [
        pos0,
        pos1,
        pos2,
        pos3,
        //pos4,
        pos5,
        pos6,
        pos7,
        pos8,
    ]
    let adjCount = 0;
    for (let a of seatState) {
        if (a == '#') {
            adjCount += 1;
        }
    }

    return (pos4 == '#' && adjCount >= 4);
}

let seatMap = [];
for(let i=0; i<dataArray.length; i++){
    let row = dataArray[i].split("")
    row.unshift('x')
    row.push('x')
    seatMap.push(row)
}

let numRow = seatMap.length
let numCol = seatMap[0].length

seatMap.unshift(new Array(numCol).fill('x'))
seatMap.push(new Array(numCol).fill('x'))


numRow = seatMap.length
numCol = seatMap[0].length
console.log(numRow, numCol)
for(let x = 0; x < 5; x++){
    let snapshot = []
    for (let i = 0; i < numRow; i++) {
        let seatMapCopy = JSON.parse(JSON.stringify(seatMap))
        for (let j = 0; j < numCol; j++) {
            if (seatMap[i][j] == '.' || seatMap[i][j] == 'x') {
                continue;
            }
            //console.log(i, j)
            if (shouldOccupy(seatMap, i, j, numRow, numCol)) {
                seatMapCopy[i][j] = '#'
            } else if (shouldVacate(seatMap, i, j, numRow, numCol)) {
                seatMapCopy[i][j] = 'L'
            }
        }
        snapshot.push(seatMapCopy[i])
        //console.table(seatMapCopy)
    }
    //snapshot.push(new Array(numCol).fill('x'))
    seatMap = snapshot

    console.table(seatMap)
    let occCount = 0;
    for (let i = 0; i < numRow; i++) {
        for (let j = 0; j < numCol; j++) {
            if (seatMap[i][j] == '#') {
                occCount += 1
            }
        }
    }
    console.table(occCount)
}


