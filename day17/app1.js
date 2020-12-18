let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let space = [[
    [1,2,3],[4,5,6],[7,8,9],
    [11, 12, 13], [14, 15, 16], [17, 18, 19],
    [21, 22, 23], [24, 25, 26], [27, 28, 29],

]]

for(let i=0; i<space.length;i++){
    for(let j=0; j<space[0].length; j++){
        for(let k=0; k<space[0][0].length; k++){
            console.log(space[i][j][k])
        }
    }
}