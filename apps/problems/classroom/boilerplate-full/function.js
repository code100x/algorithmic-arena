##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/classroom/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_arr = parseInt(input.shift());
const arr = input.splice(0, size_arr).map(Number);
const result = classroom(arr);
console.log(result);
    