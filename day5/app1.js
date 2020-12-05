let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let ids = [];

function findRow(rowData){
    let low = 0;
    let high = 127;
    for(let d of rowData){
        if(d == 'F'){
            high = parseInt( (high + low) / 2)
        }else{
            low = parseInt( (high + low) / 2)
        }
    }
    return high
}

function findCol(colData) {
    let low = 0;
    let high = 7;
    for (let d of colData) {
        if (d == 'L') {
            high = parseInt((high + low) / 2)
        } else {
            low = parseInt((high + low) / 2)
        }
    }
    return high
}

let max = -999999999999

for(let i=0; i < dataArray.length; i++){
    let d = dataArray[i]
    console.log(d)
    let rowData = d.slice(0,7)
    let colData = d.slice(7,10)
    console.log(rowData)
    console.log(colData)
    let r = findRow(rowData)
    let c = findCol(colData)
    console.log(r)
    console.log(c)
    let id = (r * 8) + c
    if(id > max){
        max = id;
    }
}
console.log(max)