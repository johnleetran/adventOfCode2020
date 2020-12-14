const { ifError } = require('assert');
let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");


let bitSize = 36
function dec2bin(dec) {
    return dec.toString(2).padStart(bitSize, 0);
}

function bin2dec(bin) {
    // let num = 0;
    // for(let i = bin.length - 1; i >=0; i--){
    //     num = num + Math.pow(2, +bin[i])
    // }
    return parseInt(bin, 2);
}

function parseMemData(data) {
    let tokens = data.replace("mem", "").replace("[", "").replace("]", "").replace(/\s+/, "").split("=")
    return {
        address: +tokens[0],
        value: +tokens[1]
    };

}

function computeAddresPart2(value, mask) {
    let output = ''
    //console.log("value ", value)
    //console.log("mask  ", mask)

    for (let i = 0; i < value.length; i++) {
        if (mask[i] == 'X' || mask[i] == '1') {
            output += mask[i]
        } else {
            output += value[i]
        }
    }
    //console.log("result", output)
    return output;
}

function computeFloatingAddress(memMasked, start, floatingAddresses) {
    //console.log("memMasked", memMasked)
    if (!memMasked){
        return;
    }
    if (!memMasked.match(/X/)){
        floatingAddresses.add(bin2dec(memMasked))
        return;
    }
    for (let i = start; i < memMasked.length;i++){
        if (memMasked[i] == 'X'){
            computeFloatingAddress(memMasked.replace('X', '1'), i + 1, floatingAddresses) 
            computeFloatingAddress(memMasked.replace('X', '0'), i + 1, floatingAddresses) 
        }
    }
}

function computeSum(){
    let sum = 0;
    for (const [key, m] of Object.entries(memory)) {
        if (m != null) {
            sum += m;
        }
    }
    console.log(sum)
}


let memory = {}//new Array(dataArray.length).fill(0)
let mask = "0".repeat(bitSize)
let statusCount = 0;
for (let d of dataArray) {
    if (d.match(/^mask/)) {
        mask = d.split(" = ")[1].trim()
        statusCount += 1;
        console.log("statusCount:", statusCount, "mask", mask)
    } else if (d.match(/^mem/)) {
        let mem = parseMemData(d)
        let memMasked = computeAddresPart2(dec2bin(mem.address), mask)
        let floatingAddresses = new Set();
        computeFloatingAddress(memMasked, 0,floatingAddresses) 
        //console.log("floatingAddresses", floatingAddresses)
        for (let f of floatingAddresses){
            memory[f] = mem.value
        }
        //memory[mem.address] = bin2dec(memMasked)
        console.log("mem", mem)
        computeSum()
    }
}

