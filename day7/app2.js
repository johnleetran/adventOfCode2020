let fs = require("fs")

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split("\n");

class SubBag {
    constructor(name, quantity) {
        this.name = name.replace("bags", "bag").trim();
        this.quantity = quantity;
    }
}

class Bag {
    constructor(name, ...bags) {
        this.name = name.replace("bags", "bag").trim();
        this.subBags = [];
        for (let i = 0; i < bags[0].length; i++) {
            let b = new SubBag(bags[0][i].name, bags[0][i].quantity)
            this.subBags.push(b)
        }
    }
}

function praseData(dataArray) {
    let bags = {};
    for (let d of dataArray) {
        let rule = d.split("contain")
        let mainBag = rule[0]
        let subBags = [];
        let subRules = rule[1].split(/,|\./)
        for (let i = 0; i < subRules.length; i++) {
            let s = subRules[i]
            if (s.length != 0) {
                let sRule = s.trim();
                let name = sRule.split(/\d+\s+/)
                name = name.filter(Boolean);
                let quantity = parseInt(sRule.split(" ")[0]);
                let sb = new SubBag(name[0], quantity)
                if(sb.name == 'no other bag'){
                    sb.quantity = 0;
                }
                subBags.push(sb)
            }
        }

        let bag = new Bag(mainBag, subBags)
        bags[bag.name] = [];
        for (let i = 0; i < subBags.length; i++) {
            bags[bag.name].push(subBags[i])
        }
    }
    return bags;
}

function traverse(bag, tree) {
    let num = 1;
    if (bag.name == 'no other bag' || tree[bag.name] == 'no other bag'){
        return 0;
    }else{
        for (let i = 0; i < tree[bag.name].length; i++){
            if (tree[bag.name][i].quantity != 0){
                num += tree[bag.name][i].quantity * traverse(tree[bag.name][i], tree)
            }
        }       
    }
    return num
}

function getNumCombos(tree) {
    let num = 0;
    for (let bag of tree['shiny gold bag']){
        num += bag.quantity * traverse(bag, tree)
    }
    return num;
}

let bags = praseData(dataArray)
console.log(bags)

let bagCombos = getNumCombos(bags)
console.log(bagCombos)


