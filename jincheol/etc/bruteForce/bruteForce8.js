// 문제 링크: [알파벳](https://www.acmicpc.net/problem/1987)
// 실행: node jincheol/etc/bruteForce/bruteForce8.js

/**
 *
 * @param {number} R 보드의 행
 * @param {number} C 보드의 열
 * @param {string[][]} board 보드 구성
 */
const solution = (R, C, board) => {
  const move = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]; // 상 우 하 좌
  const visited = new Set(); // 방문한 알파벳 저장
  visited.add(board[0][0]); // 처음 칸의 알파벳 추가
  let max = 0; // 최대 이동 거리

  /**
   *
   * @param {number} r row 좌표 인덱스
   * @param {number} c col 좌표 인덱스
   * @param {number} count 현재 이동한 칸의 개수
   */
  const dfs = (r, c, count) => {
    max = Math.max(max, count); // 최대 이동 거리 갱신

    // 이동
    for (let [dr, dc] of move) {
      const nr = r + dr; // 다음 row 좌표 인덱스
      const nc = c + dc; // 다은 col 좌표 인덱스
      if (nr < 0 || nc < 0 || nr >= R || nc >= C) continue; // 보드 범위 확인

      const curString = board[nr][nc]; // 이동할 칸의 알파벳
      if (visited.has(curString)) continue; // 이미 방문한 알파벳 확인

      visited.add(curString); // 방문 알파벳 추가
      dfs(nr, nc, count + 1); // 재귀 탐색, 카운트 증가
      visited.delete(curString); // 백트래킹
    }
  };

  dfs(0, 0, 1); // 탐색 시작, 첫 칸도 이동한 칸 개수에 포함

  return max;
};

const fs = require('fs');
const path = require('path');
const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, '..', 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [R, C] = input[0].split(' ').map(Number);
const board = input.slice(1).map((v) => v.trim().split(''));
console.log(solution(R, C, board));
