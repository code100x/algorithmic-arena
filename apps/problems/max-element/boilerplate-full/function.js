##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/max-element/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_arr = parseInt(input.shift());
const arr = input.splice(0, size_arr).map(Number);
const result = maxElement(arr);
console.log(result);
    