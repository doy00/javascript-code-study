// 문제 링크: [N-Queen](https://www.acmicpc.net/problem/9663)
// 실행: node jincheol/etc/bruteForce/bruteForce7.js

/**
 *
 * @param {number} N 체스판의 크기
 */
const solution = (N) => {
  let count = 0;
  const position = new Array(N).fill(0); // position[i]는 i행에 위치한 퀸의 위치

  /**
   * 현재 행에 위치한 퀸이 가능한 위치인지 확인하는 함수
   * @param {number} row 퀸을 놓으려고 하는 행의 인덱스
   */
  const isOK = (row) => {
    for (let i = 0; i < row; i++) {
      const isSameRow = position[row] === position[i]; // 같은 열에 퀸이 위치하는지 확인
      // 현재 행에 위치한 퀸이 이전 행의 퀸과 대각선에 위치하는지 확인
      const isSameDiagonal = Math.abs(position[row] - position[i]) === row - i;
      // 같은 열에 퀸이 있거나 대각선에 위치하면 false
      if (isSameRow || isSameDiagonal) return false;
    }
    return true; // 전부 통과하면 true
  };

  /**
   *
   * @param {number} row 현재 퀸을 배치할 행의 인덱스
   */
  const dfs = (row) => {
    // 종료 조건, row가 최대 행 개수 + 1이 되면 모든 행에 퀸을 배치했다는 것
    if (row === N) {
      count++; // 카운트 증가
      return; // 종료
    }

    for (let i = 0; i < N; i++) {
      position[row] = i; // row행 i열에 퀸 배치 또는 재배치
      // row행 i열에 퀸 배치가 가능하면 다음 행으로 이동
      if (isOK(row)) dfs(row + 1);
    }
  };

  dfs(0); // dfs 탐색

  return count;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = parseInt(input[0]);
console.log(solution(N));
