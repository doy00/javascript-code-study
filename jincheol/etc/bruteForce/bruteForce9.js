// 문제 링크: [날짜 계산](https://www.acmicpc.net/problem/1467)
// 실행: node jincheol/etc/bruteForce/bruteForce9.js

const solution = (E, S, M) => {
  let eCount = 1;
  let sCount = 1;
  let mCount = 1;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [E, S, M] = input[0].split(' ').map(Number);
console.log(solution(E, S, M));
