// 문제 링크: [작업](https://www.acmicpc.net/problem/2056)

// 실행: node jincheol/week30/personal-graph.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
