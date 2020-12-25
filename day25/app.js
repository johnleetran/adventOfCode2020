
function findLoopSize(subjectNumber, publicKey){
    let value = 1
    let loopSize = 0;
    let primeMod = 20201227

    while (publicKey != value) {
        value *= subjectNumber
        value %= primeMod
        loopSize += 1;
    }
    return loopSize
}

function findEncKey(loopSize, publicKey) {
    let value = 1
    let subjectNumber = publicKey;
    //let loop_size = 0;
    let primeMod = 20201227

    while (loopSize != 0) {
        value *= subjectNumber
        value %= primeMod
        loopSize -= 1;
    }
    return value
}


let loopSize1 = findLoopSize(7, 14205034)
console.log(loopSize1)

let loopSize2 = findLoopSize(7, 18047856)
console.log(loopSize2)

let value = findEncKey(loopSize2, 14205034)
console.log(value)



