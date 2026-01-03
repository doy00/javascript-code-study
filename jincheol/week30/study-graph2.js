// 문제 링크: [네트워크 연결](https://www.acmicpc.net/problem/1922)

// 실행: node jincheol/week30/study-graph2.js

const solution = () => {};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input2.txt');
const input = fs.readFileSync(filePath).toString('utf8').trim().split('\n');
