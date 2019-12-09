//rethink this
const input = Array.from({length: 562041 - 108457}, (v,k) => 108457  + k)
//const input = [111122]

function FilterResults(input) {
    const stringInput = String(input);
    let adjacentString = "";
    let adjacent = false;
    let increasing = true;
    let i = 0;

    while(i < stringInput.length) {
        if(i > 0) {
            if(stringInput[i] < stringInput[i - 1]) {
                increasing = false;
                break;
            }
        }

        //console.log("item: " + stringInput[i])

        if(adjacentString  == "") {
            adjacentString += stringInput[i];
        }
        else if(adjacentString == stringInput[i]) {
            adjacentString += stringInput[i];
            adjacent = true;
        }
        else if(adjacentString[adjacentString.length - 1] == stringInput[i]) {
            adjacent = false;
        }
        else if(adjacent == false) {
            adjacentString = stringInput[i];
        }

        i++;
    }

    if(adjacent && increasing) {
        return input
    }
    else {
        return ''
    }

}

const filtered = input.filter(x=>FilterResults(x) != '');

console.log(filtered.length)