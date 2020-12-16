let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split(/\n+/);

function populateValidNumbers(validNumbers, data) {
    let d = data.replace(/\s+/g, "").split(/:|or/)
    d.shift()
    for (let i = 0; i < d.length; i++) {
        let nums = d[i].split("-");
        let low = +nums[0];
        let high = +nums[1];
        for (let j = low; j <= high; j++) {
            validNumbers[j] = true;
        }

    }
}

function populateClassNumbers(classNumbers, data) {
    let d = data.replace(/\s+/g, "").split(/:|or/)
    let className = d.shift()    
    classNumbers[className] = new Array();
    for (let i = 0; i < d.length; i++) {
        let nums = d[i].replace(/\s+/,"").split("-");
        let low = +nums[0];
        let high = +nums[1];
        for (let j = low; j <= high; j++) {
            classNumbers[className].push(j);
        }
    }
}

function sumUpInvalidNumber(validNumbers, dataArray, startIndex) {
    let sum = 0;
    for (let i = startIndex; i < dataArray.length; i++) {
        let d = dataArray[i].split(",").map(Number);
        for (let dd of d) {
            if (+dd in validNumbers) {

            } else {
                sum += dd
            }
        }
    }
    return sum;
}

function getValidTicket(validTickets, validNumbers, dataArray, startIndex) {
    for (let i = startIndex; i < dataArray.length; i++) {
        let d = dataArray[i].split(",").map(Number);
        let isValid = true;
        for (let dd of d) {
            if (dd in validNumbers) {

            } else {
                isValid = false;
                break;
            }
        }
        if (isValid){
            validTickets.push(d)
        }
    }
}

let yourTicket = null
let validNumbers = {}
let classNumbers = {}
let validTickets = []
let nearbyTicketIndex = -1 
for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].match(/your ticket:/)) {
        yourTicket = dataArray[i + 1].split(",").map(Number);
        i += 1;
        continue
    }
    if (dataArray[i].match(/nearby tickets:/)) {
        nearbyTicketIndex = i + 1
        getValidTicket(validTickets, validNumbers, dataArray, nearbyTicketIndex)
        let sumInvalid = sumUpInvalidNumber(validNumbers, dataArray, i + 1)
        console.log(sumInvalid)
        break;
    } else {
        populateValidNumbers(validNumbers, dataArray[i])
        populateClassNumbers(classNumbers, dataArray[i])
        //console.log(classNumbers)

    }
}

validTickets.push(yourTicket)

let output = {};
for (const [field, value] of Object.entries(classNumbers)) {
    for (let col = 0; col < validTickets[0].length; col++) {
        let found = true;
        let index = -1;
        for (let row = 0; row < validTickets.length; row++) {
            //console.log(value)
            //console.log(validTickets[row][col])
            if (value.includes(validTickets[row][col]) && validTickets[row][col] in validNumbers) {
                index = col
            } else {
                found = false;
                break;
            }
        }
        if (found) {
            if (field in output) {
                output[field].push(index)
            } else {
                output[field] = [index]
            }
            //break;
        }
    }
}

let solution = {

}
while (Object.keys(output).length > 0){
    let done = false;
    let valueToEliminate = -1;
    for (const [field, value] of Object.entries(output)){
        if (value.length != 1){
            done = done && false
        }else{
            done = done && true
        }
    }

    //find single element array
    for (const [field, value] of Object.entries(output)) {
        if (value.length == 1){
            solution[field] = value[0]
            valueToEliminate = value[0]
            delete output[field]
        }
    }

    for (const [field, value] of Object.entries(output)) {
        let indexToDelete = value.indexOf(valueToEliminate)
        if (indexToDelete != -1){
            output[field].splice(indexToDelete, 1);
        }
    }
    //console.log(output)

}


//console.log("validTickets",validTickets)
//console.log("classNumbers", classNumbers)
let answer = 1;
for (const [field, value] of Object.entries(solution)){
    if (field.match(/^departure/)){
        answer *= yourTicket[value]
    }
}
console.log(solution)
console.log(answer)