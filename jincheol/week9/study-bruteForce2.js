// 문제 링크: [스타트와 링크](https://www.acmicpc.net/problem/14889)

// 실행: node jincheol/week9/study-bruteForce2.js

const fs = require('fs');
const input = fs
  .readFileSync('./jincheol/week9/input2.txt')
  .toString()
  .split('\n');

const ex_n_one = parseInt(input.shift());
const ex_numbers_one = [];
for (let line of input) {
  ex_numbers_one.push(line.split(' ').map(Number));
}

console.log(ex_n_one, ex_numbers_one);
