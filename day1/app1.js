let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let values = {};
for(let i=0; i< dataArray.length - 2; i++){
    let a = parseInt(dataArray[i])
    for(let j=1; j< dataArray.length - 1; j++){
        let b = parseInt(dataArray[j])
        for(let k=2; k< dataArray.length; k++){
            let c = parseInt(dataArray[k])
            if(a + b + c == 2020){
                console.log(a * b * c)
                process.exit();
            }            
        }
    }
}