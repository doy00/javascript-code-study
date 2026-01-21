/*
week32 - BFS2 - 직사각형 탈출 (https://www.acmicpc.net/problem/16973)
*/

function solution(input) {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);  // N×M 격자판

  const grid = [];  // 격자판 (0: 빈칸, 1: 벽)
  for (let i = 1; i <= N; i++) {
    grid.push(lines[i].split(' ').map(Number));
  }

  // H×W 직사각형, 시작(Sr, Sc), 도착(Fr, Fc)
  const [H, W, Sr, Sc, Fr, Fc] = lines[N + 1].split(' ').map(Number);

  // 이동 가능 여부 검증 함수
  function canPlace(r, c) {
    // 격자판 범위를 벗어나는지 체크
    // 직사각형 (r, c) -> (r+H-1, c+W-1)
    if (r < 1 || r+H-1 > N || c < 1 || c+W-1 > M) {
      return false;
    }

    // 직사각형이 차지하는 모든 칸이 빈칸(0)인지 확인
    for (let i = r; i <= r+H-1; i++) {
      for (let j = c; j <= c+W-1; j++) {
        if (grid[i-1][j-1] === 1) {
          return false;
        }
      }
    }
    return true;
  }


  // BFS 초기화
  const queue = [[Sr, Sc, 0]];
  const visited = Array.from({length: N+1}, () => Array(M+1).fill(false));
  visited[Sr][Sc] = true;

  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (queue.length > 0) {
    const [r, c, count] = queue.shift();  // 현재 위치와 이동 횟수

    // 도착지점에 도달
    if (r === Fr && c === Fc) {
      return count;  // 최소이동횟수 반환
    }

    // 4방향으로 이동
    for (const [dr, dc] of directions) {
      const nr = r + dr; // 새로운 행, 열 갱신
      const nc = c + dc; 

      if (!visited[nr]?.[nc] && canPlace(nr, nc)) {
        visited[nr][nc] = true;  
        queue.push([nr, nc, count+1]);  
      }
    }

  }
  return -1;  // 도달할수없으면 -1 반환
}

// 백준 제출용 코드
const fs = require('fs');
const path = require('path');
const filePath = process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input1.txt');
const input = fs.readFileSync(filePath).toString();
console.log(solution(input));