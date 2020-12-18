
function evaluate_expr(stack) {
    let result = 0;
    if (stack.length > 0) {
        result = stack.pop()
    }
    while (stack.length > 0 && stack[stack.length - 1] != ')') {
        // digit, -, +
        let sign = stack.pop();
        if (sign == '+') {
            result += stack.pop();
        } else if (sign == '*') {
            result *= stack.pop();
        }
    }
    if (stack.length > 0)
        stack.pop();

    return result
}

/**
 * @param {string} s
 * @return {number}
 */

var calculate = function (s) {
    let operand = 0;
    let n = 0;
    let stack = [];
    for (let i = s.length - 1; i >= 0; i--) {
        let ch = String(s[i])
        if (ch.match(/\d+/)) {
            operand = +ch * Math.pow(10, n) + operand;
            n += 1;
        } else if (!ch.match(/\s+/)) {
            if (n) {
                stack.push(operand)
                n = 0;
                operand = 0;
            }
            if (ch == '(') {
                let result = evaluate_expr(stack)
                stack.push(result)
                operand = 0;
                n = 0;
            } else {
                stack.push(ch)
            }
        }
    }
    if (n) {
        stack.push(operand)
    }
    return evaluate_expr(stack)
};

let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

let sum = 0;
for (let d of dataArray) {
    //console.log(calculate("1 + (2 * 3) + (4 * (5 + 6))"))
    sum += calculate(d)
}
console.log(sum)
