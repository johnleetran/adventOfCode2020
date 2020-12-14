let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");


let bitSize = 36
function dec2bin(dec) {
    return dec.toString(2).padStart(bitSize, 0);
}

function bin2dec(bin){
    // let num = 0;
    // for(let i = bin.length - 1; i >=0; i--){
    //     num = num + Math.pow(2, +bin[i])
    // }
    return parseInt(bin, 2);
}

function parseMemData(data){
    let tokens = data.replace("mem", "").replace("[", "").replace("]","").replace(/\s+/, "").split("=")
    return {
        address: +tokens[0],
        value: +tokens[1]
    };

}

function computeValue(value, mask) {
    let output = ''
    for(let i=0; i<value.length; i++){
        if (mask[i] != 'X'){
            output += mask[i]
        }else{
            output += value[i]
        }
    }
    return output;
}

let memory = new Array(dataArray.length).fill(0)
let mask = "0".repeat(bitSize)

for(let d of dataArray){
    if(d.match(/^mask/)){
        mask = d.split(" = ")[1].trim()
        //console.log("mask", mask)
    }else if(d.match(/^mem/)){
        let mem = parseMemData(d)
        let memMasked = computeValue(dec2bin(mem.value), mask)
        memory[mem.address] = bin2dec(memMasked)
        //console.log("mem", mem)
    }
}

let sum = 0;
for(let m of memory){
    if(m != null){
        sum += m;
    }
}
console.log(sum)