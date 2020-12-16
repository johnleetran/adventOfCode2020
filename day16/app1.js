let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split(/\n+/);

function populateValidNumbers(validNumbers, data){
    let d = data.replace(/\s+/g,"").split(/:|or/)
    d.shift()
    for(let i=0; i<d.length; i++){
        let nums = d[i].split("-");
        let low = +nums[0];
        let high = +nums[1];
        for(let j=low; j<=high; j++){
            validNumbers[j] = true;
        }

    }
}

function sumUpInvalidNumber(validNumbers, dataArray, startIndex){
    let sum = 0;
    for(let i=startIndex; i<dataArray.length; i++){
        let d = dataArray[i].split(",").map(Number);
        for(let dd of d){

            if (+dd in validNumbers){

            }else{
                sum += dd
            }
        }
    }
    return sum;
}

let yourTicket = null
let validNumbers = {}
for(let i =0; i<dataArray.length; i++){
    if(dataArray[i].match(/your ticket:/)){
        yourTicket = dataArray[i + 1].split(",").map(Number);
        console.log(yourTicket)
        i += 1;
        continue
    }
    if (dataArray[i].match(/nearby tickets:/)){
        let sumInvalid = sumUpInvalidNumber(validNumbers, dataArray, i+1)
        console.log(sumInvalid)
        break;
    }else{
        populateValidNumbers(validNumbers, dataArray[i])
    }
}
//console.log(validNumbers)