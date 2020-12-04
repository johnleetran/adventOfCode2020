let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n\n");

let validPassport = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"]

function parseLine(line){
    let tokens = line.split(/\s+/);
    let keys = {}
    for(let tok of tokens){
        let t = tok.split(':');
        if(t[0].length > 0){
            keys[t[0]] = t[1]
        }
    }
    return keys
}

function isValid(keys){
    if (keys["byr"] &&  keys["iyr"] && keys["eyr"] && keys["hgt"] && keys["hcl"] && keys["ecl"] && keys["pid"] ){
        return true
    }
    return false;
}

function isValidByr(keys){
    let v = keys["byr"].toString().length == 4 && keys["byr"] >= 1920 && keys["byr"] <= 2002;
    return v;
}

function isValidIyr(keys){
    let v = keys["iyr"].toString().length == 4 && keys["iyr"] >= 2010 && keys["iyr"] <= 2020;
    return v;
}

function isValidEyr(keys){
    let v = keys["eyr"].toString().length == 4 && keys["eyr"] >= 2020 && keys["eyr"] <= 2030;
    return v;
}

function IsValidCm(keys){
    let rCm = /^[0-9]+cm$/i
    let rIn = 0;
    if (rCm.test(keys['hgt'])){
        let num = keys['hgt'].split(/cm/i)[0];
        if (parseFloat(num) >= 150 && parseFloat(num) <= 193){
            return true;
        }
    }
    return false;
}
function IsValidInch(keys) {
    let rCm = /^[0-9]+in$/i
    let rIn = 0;
    if (rCm.test(keys['hgt'])) {
        let num = keys['hgt'].split(/in/i)[0];
        if (parseFloat(num) >= 59 && parseFloat(num) <= 76) {
            return true;
        }
    }
    return false;
}

function isValidHgt(keys){
    return IsValidCm(keys) || IsValidInch(keys)
}

function isValidHcl(keys){
    let reg = /^#[0-9a-f]{6}/
    let v = reg.test(keys['hcl']);
    return v;
}

function isValidEcl(keys){
    let v = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes (keys['ecl'] );
    return v;
}

function isValidPid(keys){
    let reg = /^[0-9]{9}$/
    let v = reg.test(keys['pid'])
    return v;
}

function isCorrectData(keys){
    let v = isValidByr(keys) && isValidIyr(keys) && isValidEyr(keys) && isValidHgt(keys) && isValidHcl(keys) && isValidEcl(keys) && isValidPid(keys);
    return v;
}

let validCount = 0;
for(let d of dataArray){
    let keys = parseLine(d);
    let v = isValid(keys);
    if(v){
        let vv = isCorrectData(keys);
        if(vv){
            validCount += 1;
        }
    }    
}
console.log(validCount)