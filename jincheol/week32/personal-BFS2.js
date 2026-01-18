// 문제 링크: [점프 게임](https://www.acmicpc.net/problem/15558)

// 실행: node jincheol/week32/personal-BFS2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
