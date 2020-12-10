let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n").map(x => +x);

let currentJolt = 0;
let diff = [0,0,0];

let maxAdapterValue = Math.max(...dataArray);
while (true){
    for(let i=1; i<=3; i++){
        let diffJoltIndex = dataArray.indexOf(currentJolt + i)
        if (diffJoltIndex != -1) {
            diff[i - 1] += 1;
            currentJolt = dataArray[diffJoltIndex]
        }      
    }
    if (maxAdapterValue == currentJolt) {
        diff[2] += 1;
        break;
    }  

}
console.log(goodSolution)
