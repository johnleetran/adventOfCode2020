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
let lineItem = [];
for(let i=0; i<dataArray.length; i++){
    let ingredients = dataArray[i].replace(")", "").split("(")[0].trim().split(/\s+/g)
    let allergens = dataArray[i].replace(")", "").replace("contains ", "").split("(")[1].split(",").map((e) => { return e.trim() })
    lineItem.push([ingredients, allergens ])
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

let line = [ingredientsList, allergensList]

for (let IA of lineItem) {
    let I = IA[0]
    for (let a of IA[1]){
        for (let i of ingredients) {
            if (!I.includes(i)) {
                suspect[i].delete(a)
            }
        }
    }
}

//elminate the Innocence
console.log(suspect)
let itemsNotCount = 0;
for(let [key, values] of Object.entries(suspect)){
    if(values.size == 0){
        console.log(key)
        itemsNotCount += ingredientsCount[key]
    }
}

console.log(itemsNotCount)

//find single element array
let done = false 
while (!done){
    for (const [field, value] of Object.entries(suspect)) {
        if (value.size == 1) {
            console.log(field)
            for (const [nonSuspect, p] of Object.entries(suspect)) {
                if (field != nonSuspect && suspect[nonSuspect].has(value.values().next()['value'])){
                    suspect[nonSuspect].delete(value.values().next()['value'])
                }
            }
        }
    }
    done = true;
    for (const [field, value] of Object.entries(suspect)){
        if (value.size > 1){
            done = false;
        }
    }
}

let solution = []
for (const [field, value] of Object.entries(suspect)) {
    if (value.size == 1) {
        solution.push({allergen: value.values().next()['value'], ingredient: field})
    }
}
solution.sort((a,b) => {
    if(a.allergen < b.allergen){
        return -1;
    }
    return 1;
});
console.log(JSON.stringify(solution, null, 2))
for(let s of solution){
    process.stdout.write( s.ingredient + ",")
}
console.log();


// for (const [field, value] of Object.entries(solution)) {
//     let indexToDelete = value.indexOf(valueToEliminate)
//     if (indexToDelete != -1) {
//         output[field].splice(indexToDelete, 1);
//     }
// }
//console.log(output)

