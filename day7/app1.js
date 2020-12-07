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
                //console.log(name[0], " ", quantity)
                subBags.push({ name: name[0], quantity: quantity })
            }
        }

        let bag = new Bag(mainBag, subBags)
        bags[bag.name] = [];
        for (let i = 0; i < bag.subBags.length; i++){
            bags[bag.name].push(bag.subBags[i].name)
        }
    }
    return bags;
}

function traverse(key, val, tree) {
    console.log(key)
    let hasBag = false;
    if (tree[key].includes('no other bag')){
        hasBag = false;
    } else if (tree[key].includes('shiny gold bag')){
        hasBag = true;
    }else{
        for(let i=0; i<tree[key].length; i++){
            hasBag = hasBag || traverse(tree[key][i], tree[key], tree)
        }
    }
    return hasBag;
}

function getNumCombos(bags) {
    let num = 0;
    for (const [key, value] of Object.entries(bags)) {
        //console.log("root: ", key)
        let isIn = traverse(key, value, bags)
        if (isIn) {
            num += 1;
        }
    }
    return num;
}

let bags = praseData(dataArray)
console.log(bags)

let bagCombos = getNumCombos(bags)
console.log(bagCombos)


