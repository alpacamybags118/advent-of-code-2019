const fs = require('fs');
const inputPath = "./input";

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

const result = input.reduce(function(result, item, index) {
    //how can i include the 1st value more cleanly in a reduce?
    if(index == 1) {
        result = ReduceSum((Math.floor(result / 3) - 2));
    }
    
    result += ReduceSum((Math.floor(item / 3) - 2));
    
    return result
});

console.log(result)