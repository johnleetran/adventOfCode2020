let fs = require('fs')

let data = fs.readFileSync("./input.txt", "utf8");
let dataArray = data.split(/\n+/g).filter(function (el) {
    return el.length > 2;
});

let ingredientsToAllergens = {};
let allergensToIngredients = {};
let ingredientsLineItem = {};
let ingredientsCount = {};
let inverseContains = {}
let ingredientsList = [];
let allergensList = [];
for(let i=0; i<dataArray.length; i++){
    let ingredients = dataArray[i].replace(")", "").split("(")[0].trim().split(/\s+/g)
    let allergens = dataArray[i].replace(")", "").replace("contains ", "").split("(")[1].split(",").map((e) => { return e.trim() })
    ingredientsList.push(ingredients)
    allergensList.push(allergens)
    for (let ingr of ingredients){
        if (ingr in ingredientsToAllergens){
            ingredientsToAllergens[ingr].add(...allergens)
            ingredientsCount[ingr] += 1;
        }else{
            ingredientsToAllergens[ingr] = new Set(allergens)
            ingredientsCount[ingr] = 1;
        }
    }

    for (let aller of allergens) {
        if (aller in allergensToIngredients) {
            allergensToIngredients[aller].add(...ingredients)
        } else {
            allergensToIngredients[aller] = new Set(ingredients)
        }
    }

    for (let ingr of ingredients) {
        if (ingr in ingredientsLineItem) {
            ingredientsLineItem[ingr].push(i)
        } else {
            ingredientsLineItem[ingr] = [i]
        }
    }

    for (let aller of allergens) {
        if (aller in inverseContains) {
            inverseContains[aller].push(i)
        } else {
            inverseContains[aller] = [i]
        }
    }

}

let ingredientsSeen = {};

for (let ingredients of ingredientsList){
    //count number of times each ingredient apears
    for (let ingredient of ingredients){
        if (ingredient in ingredientsSeen) {
            ingredientsSeen[ingredient] += 1
        } else {
            ingredientsSeen[ingredient] = 1
        }
    }
}

let ingredients = Object.keys(ingredientsCount);
let allergens = new Set(...allergensList);
let suspect = ingredientsToAllergens;

for (let I of ingredientsList) {
    for (let A of allergensList) {
        for(let a of A){
            for (let i of ingredients) {
                if (!I.includes(i)) {
                    suspect[i].delete(a)
                }
            }
        }

    }
}

//elminate the Innocence
console.log()