// 문제 링크: [도시 분할 계획](https://www.acmicpc.net/problem/1647)

// 실행: node jincheol/week31/personal-graph.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input3.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
