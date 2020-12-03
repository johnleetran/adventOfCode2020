let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

function replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

function getHits(moveRight, modeDown){
    let right = moveRight;
    let treeCount = 0;
    for(let i=modeDown; i<dataArray.length - modeDown; i+=modeDown){
        let newStr = dataArray[i];
        if(newStr.length <= right){
            newStr = newStr.repeat(i)
        }

        if(newStr[right] == '#'){
            treeCount += 1;
            newStr = replaceChar(newStr, 'X', right) 
        }else{
            newStr = replaceChar(newStr, 'O', right) 
        }
        //console.log(newStr)
        right += moveRight;
    }    
    return treeCount
}

let a = getHits(1, 1);
let b = getHits(3, 1);
let c = getHits(5, 1);
let d = getHits(7, 1);
let e = getHits(1, 2);

console.log(a * b * c * d * e)
