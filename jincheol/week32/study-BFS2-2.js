// 문제 링크: [숨바꼭질 2](https://www.acmicpc.net/problem/12851)

// 실행: node jincheol/week32/study-BFS2-2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
