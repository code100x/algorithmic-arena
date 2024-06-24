##USER_CODE_HERE##

const input = require('fs').readFileSync('/dev/problems/book-into shelves/tests/inputs/##INPUT_FILE_INDEX##.txt', 'utf8').trim().split('\n').join(' ').split(' ');
const size_books = parseInt(input.shift());
const books = input.splice(0, size_books).map(Number);
const result = totalBooks(books);
console.log(result);
    