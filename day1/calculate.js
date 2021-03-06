const fs = require('fs');
const inputPath = "./input";

//make importable
function ReadInput(path) {
    return fs.readFileSync(path, {encoding: "utf-8"});
}

function ReduceSum(init) {
    let sum = init;

    while(init > 0) {
        init = Math.floor(init / 3) - 2
        
        if(init > 0) {
            sum += init;
        }
    }
    console.log("sum: "+sum)
    return sum
}

const input = ReadInput(inputPath).split('\n').map(x => Number(x));

const result = input.reduce(function(result, item) {
    result += ReduceSum((Math.floor(item / 3) - 2));
    
    return result
}, 0);

console.log(result)